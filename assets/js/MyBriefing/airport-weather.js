(function () {
  "use strict";

  const ticker = document.getElementById("mapWeatherTicker");
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC", hourCycle: "h23"
  });
  const forecastCache = new Map();
  const endpoint = "https://api.met.no/weatherapi/locationforecast/2.0/compact";
  const hours = [1, 6, 12];

  const cloud = '<path d="M6 15a3.5 3.5 0 0 1-.4-7 5 5 0 0 1 9.5-1.2A4.1 4.1 0 1 1 18 15Z"/>';
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>';
  const moon = '<path d="M20.8 15.1A8.8 8.8 0 0 1 9 3.2a9 9 0 1 0 11.8 11.9Z"/>';
  const icons = {
    sun, moon, cloud,
    partly: '<path d="M3 6.5l1.5 1.4M8 3v2m5 1.5-1.5 1.4M4.5 12H2"/><path d="M6 12a3.5 3.5 0 1 1 6-3.1"/>' +
      '<path d="M8 19a3 3 0 0 1 0-6 4.4 4.4 0 0 1 8.2-1 3.7 3.7 0 1 1 2.1 7Z"/>',
    partlyNight: '<path d="M10.5 10a4.7 4.7 0 0 1-3.7-6.7 4.9 4.9 0 0 0-2.3 8.5"/>' +
      '<path d="M8 19a3 3 0 0 1 0-6 4.4 4.4 0 0 1 8.2-1 3.7 3.7 0 1 1 2.1 7Z"/>',
    rain: cloud + '<path d="m8 18-1 2m5-2-1 2m5-2-1 2"/>',
    sleet: cloud + '<path d="m8 18-1 2m5-1h2m-1-1v2m4-2-1 2"/>',
    snow: cloud + '<path d="M7 19h2m-1-1v2m3 1h2m-1-1v2m3-3h2m-1-1v2"/>',
    thunder: cloud + '<path d="m13 14-3 4h3l-2 4"/>',
    fog: cloud + '<path d="M4 18h16M7 21h10"/>'
  };

  function describeWeather(code = "") {
    const [type, daylight] = code.split("_");
    const night = daylight === "night";
    if (type.includes("thunder")) return ["thunder", "Thunderstorms"];
    if (type.includes("sleet")) return ["sleet", "Sleet"];
    if (type.includes("snow")) return ["snow", "Snow"];
    if (type.includes("rain")) return ["rain", type.includes("showers") ? "Rain showers" : "Rain"];
    if (type === "fog") return ["fog", "Fog"];
    if (type === "cloudy") return ["cloud", "Cloudy"];
    if (type === "partlycloudy") return [night ? "partlyNight" : "partly", "Partly cloudy"];
    if (type === "fair") return [night ? "partlyNight" : "partly", "Mostly clear"];
    if (type === "clearsky") return [night ? "moon" : "sun", "Clear"];
    return ["", "Conditions unavailable"];
  }

  async function requestForecast(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(url, { credentials: "omit", signal: controller.signal });
      if (!response.ok) throw new Error("Airport forecast request failed");
      const { properties } = await response.json();
      if (!Array.isArray(properties?.timeseries)) throw new Error("Airport forecast is incomplete");
      return {
        timeseries: properties.timeseries,
        expires: Date.parse(response.headers.get("Expires"))
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  function timeseriesFor(airport) {
    const url = `${endpoint}?lat=${airport.lat.toFixed(4)}&lon=${airport.lon.toFixed(4)}`;
    const cached = forecastCache.get(url);
    if (cached?.expires > Date.now()) return cached.promise;

    const entry = { expires: Infinity };
    entry.promise = requestForecast(url).then(({ timeseries, expires }) => {
      entry.expires = Number.isFinite(expires) ? expires : Date.now() + 30 * 60 * 1000;
      return timeseries;
    }).catch(error => {
      forecastCache.delete(url);
      throw error;
    });
    forecastCache.set(url, entry);
    return entry.promise;
  }

  function forecastAt(timeseries, when) {
    const index = timeseries.findIndex(step => Date.parse(step.time) >= when);
    if (index < 0 || when < Date.parse(timeseries[0].time)) return null;

    const end = timeseries[index];
    const exact = Date.parse(end.time) === when;
    const start = exact ? end : timeseries[index - 1];
    const first = start.data?.instant?.details?.air_temperature;
    const last = end.data?.instant?.details?.air_temperature;
    if (!Number.isFinite(first) || !Number.isFinite(last)) return null;

    const fraction = exact ? 0 : (when - Date.parse(start.time)) / (Date.parse(end.time) - Date.parse(start.time));
    const temperature = Math.round(first + (last - first) * fraction);
    const code = hours.map(count => start.data?.[`next_${count}_hours`]?.summary?.symbol_code)
      .find(value => typeof value === "string");
    return { temperature, condition: describeWeather(code) };
  }

  function weatherCard({ label, code, airport, time }) {
    const card = document.createElement("div");
    card.className = "map-weather-card";
    card.innerHTML = `
      <div class="map-weather-heading"><strong></strong><time hidden></time></div>
      <div class="map-weather-reading">
        <span class="map-weather-symbol" aria-hidden="true"></span>
        <div class="map-weather-value" role="status"><strong hidden></strong><span></span></div>
      </div>`;
    const heading = card.querySelector(".map-weather-heading strong");
    const timestamp = card.querySelector("time");
    const symbol = card.querySelector(".map-weather-symbol");
    const temperature = card.querySelector(".map-weather-value strong");
    const status = card.querySelector(".map-weather-value span");

    heading.textContent = code ? `${label} · ${code}` : label;
    const when = time ? Date.parse(`${time}Z`) : NaN;
    if (Number.isFinite(when)) {
      timestamp.dateTime = new Date(when).toISOString();
      timestamp.textContent = `${formatter.format(when)} UTC`;
      timestamp.hidden = false;
    }

    if (!Number.isFinite(airport?.lat) || !Number.isFinite(airport?.lon)) {
      status.textContent = "Airport unavailable";
    } else if (!Number.isFinite(when)) {
      status.textContent = "Forecast time not entered";
    } else {
      status.textContent = "Loading forecast…";
      timeseriesFor(airport).then(timeseries => {
        if (!card.isConnected) return;
        const forecast = forecastAt(timeseries, when);
        if (!forecast) {
          status.textContent = "No forecast for this time";
          return;
        }
        const [glyph, label] = forecast.condition;
        const value = `${forecast.temperature}°C`;
        temperature.textContent = value;
        temperature.hidden = false;
        status.textContent = label;
        if (glyph) {
          symbol.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65"
            stroke-linecap="round" stroke-linejoin="round">${icons[glyph]}</svg>`;
        }
      }).catch(() => {
        if (card.isConnected) status.textContent = "Forecast unavailable";
      });
    }
    return card;
  }

  FBP.renderAirportWeather = (departure, arrival) => {
    ticker.replaceChildren(
      weatherCard({ label: "Departure", ...departure }),
      weatherCard({ label: "Arrival", ...arrival })
    );
  };
})();
