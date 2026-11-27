/*
=========================================================
MyDuty
Shared Framework
Version: 2.0.0
=========================================================

Responsibilities

✓ FBP namespace
✓ Framework version
✓ Cache busting
✓ Dark appearance
✓ Version badge
✓ Global initialisation

=========================================================
*/

(function () {

    "use strict";

    window.FBP = window.FBP || {};

    //-----------------------------------------------------
    // Framework
    //-----------------------------------------------------

    FBP.version = "2.0.0";

    FBP.cacheVersion = "6";

    //-----------------------------------------------------
    // Cache Busting
    //-----------------------------------------------------

    function bust(url) {

        return url.split("?")[0] +

            "?v=" +

            FBP.cacheVersion;

    }

    FBP.refreshAssets = function () {

        document

            .querySelectorAll('link[href*="fbp-shared.css"]')

            .forEach(link => {

                link.href = bust(link.href);

            });

    };

    //-----------------------------------------------------
    // Initialise
    //-----------------------------------------------------

    FBP.init = function () {

        FBP.refreshAssets();


    };

    //-----------------------------------------------------

    document.addEventListener(

        "DOMContentLoaded",

        FBP.init

    );

})();


(function () {
    "use strict";
    const FBP = window.FBP = window.FBP || {};
    const activeLoads = new Map();
    let nextLoadId = 0;
    let overlay = null;

    function ensureOverlay() {
        if (overlay?.isConnected) return overlay;
        if (!document.body) return null;
        overlay = document.getElementById("fbpLoadingOverlay");
        if (overlay) return overlay;
        overlay = document.createElement("div");
        overlay.id = "fbpLoadingOverlay";
        overlay.className = "fbp-loading-overlay";
        overlay.hidden = true;
        overlay.setAttribute("role", "status");
        overlay.setAttribute("aria-live", "polite");
        overlay.setAttribute("aria-busy", "false");
        overlay.innerHTML = '<div class="fbp-loading-content"><svg class="fbp-loading-plane" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4.5 27 18l13 8v3l-13-3.5L26 38l5 3v2l-7-2-7 2v-2l5-3-1-12.5L8 29v-3l13-8z" fill="currentColor"/></svg><span>Please Wait...</span></div>';
        document.body.appendChild(overlay);
        return overlay;
    }

    function showIfStillLoading(id) {
        const entry = activeLoads.get(id);
        if (!entry) return;
        entry.long = true;
        const node = ensureOverlay();
        if (node) { node.hidden = false; node.setAttribute("aria-busy", "true"); }
    }

    function beginLoading() {
        const id = ++nextLoadId;
        const entry = { long: false, timer: 0 };
        entry.timer = window.setTimeout(() => showIfStillLoading(id), 2000);
        activeLoads.set(id, entry);
        return id;
    }

    function endLoading(id) {
        const entry = activeLoads.get(id);
        if (!entry) return;
        window.clearTimeout(entry.timer);
        activeLoads.delete(id);
        if (![...activeLoads.values()].some(item => item.long)) {
            const node = ensureOverlay();
            if (node) { node.hidden = true; node.setAttribute("aria-busy", "false"); }
        }
    }

    FBP.trackLoading = function (promise) {
        const id = beginLoading();
        return Promise.resolve(promise).finally(() => endLoading(id));
    };

    function watchScript(script) {
        if (!(script instanceof HTMLScriptElement) || !script.src || script.dataset.fbpLoadTracked) return;
        script.dataset.fbpLoadTracked = "true";
        const id = beginLoading();
        const done = () => endLoading(id);
        script.addEventListener("load", done, { once: true });
        script.addEventListener("error", done, { once: true });
    }

    const initialLoadId = beginLoading();
    window.addEventListener("load", () => endLoading(initialLoadId), { once: true });
    document.addEventListener("DOMContentLoaded", ensureOverlay, { once: true });

    if (document.documentElement && "MutationObserver" in window) {
        const observer = new MutationObserver(records => {
            for (const record of records) {
                for (const node of record.addedNodes) {
                    if (node.nodeType !== 1) continue;
                    watchScript(node);
                    node.querySelectorAll?.("script[src]").forEach(watchScript);
                }
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    if (typeof window.fetch === "function") {
        const originalFetch = window.fetch;
        window.fetch = function (...args) {
            const id = beginLoading();
            try { return Promise.resolve(originalFetch.apply(this, args)).finally(() => endLoading(id)); }
            catch (error) { endLoading(id); throw error; }
        };
    }

    if (window.XMLHttpRequest) {
        const originalSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function (...args) {
            const id = beginLoading();
            this.addEventListener("loadend", () => endLoading(id), { once: true });
            try { return originalSend.apply(this, args); }
            catch (error) { endLoading(id); throw error; }
        };
    }
})();
