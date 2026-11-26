#!/usr/bin/env python3
"""Build static report-time data from the seasonal PDF guides."""
from __future__ import annotations

import json
import re
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
SCHEDULES = [
    ("Summer 2026", "assets/mydocuments/2026 Summer Season Report Times.pdf", "2026-10-24", None),
    ("Winter 2026/27", "assets/mydocuments/2026 - 2027 Winter Season Report Times.pdf", None, "2026-10-25"),
]
START = re.compile(r"^\s*\S*\s*(\d{1,2}[.,:]\d{2})(?:\s*(AM|PM))?\s+REPORT\s+(BA[A-Z]?\d{3,4})\s+(.+)$", re.I)
DAYS = {
    "MONDAY": 1, "MONDAYS": 1, "TUESDAY": 2, "TUESDAYS": 2,
    "WEDNESDAY": 3, "WEDNESDAYS": 3, "THURSDAY": 4, "THURSDAYS": 4,
    "FRIDAY": 5, "FRIDAYS": 5, "SATURDAY": 6, "SATURDAYS": 6,
    "SUNDAY": 7, "SUNDAYS": 7,
}
DAY_TOKEN = re.compile(r"\b(" + "|".join(DAYS) + r")\b", re.I)
TYPE_TOKEN = re.compile(r"(?<![A-Z0-9])(?:77[HMLST]|78[ENZ]|789|781|351|38[AT]|32[PY]|320)(?![A-Z0-9])", re.I)
TYPE_FAMILY = {
    "B777": re.compile(r"^77[HMLST]$", re.I),
    "B787": re.compile(r"^(?:78[ENZ]|789|781)$", re.I),
    "A350": re.compile(r"^351$", re.I),
    "A380": re.compile(r"^38[AT]$", re.I),
}


def classify_aircraft(raw: str) -> tuple[str, list[str]]:
    """Return the display label and recognized families for source aircraft codes."""
    if not raw.strip():
        return "Shorthaul", ["Shorthaul"]
    codes = [token.upper() for token in TYPE_TOKEN.findall(raw)]
    if not codes:
        return "", []
    families = set()
    for code in codes:
        if code in {"32P", "32Y", "320"}:
            families.add("Shorthaul")
            continue
        for family, pattern in TYPE_FAMILY.items():
            if pattern.fullmatch(code):
                families.add(family)
                break
    if not families:
        return "", []
    family_order = ["Shorthaul", "B777", "B787", "A350", "A380"]
    ordered = [family for family in family_order if family in families]
    if len(ordered) == 1:
        return ordered[0], ordered
    if re.search(r"\bOR\b", raw, re.I):
        alternative_order = [family for family in ["B787", "B777", "A350", "A380", "Shorthaul"] if family in families]
        return " or ".join(alternative_order), alternative_order
    return "", ordered


def report_rows(pdf_path: Path) -> list[dict]:
    with pdfplumber.open(pdf_path) as pdf:
        lines = "\n".join(page.extract_text() or "" for page in pdf.pages).splitlines()

    raw_rows: list[tuple[re.Match, list[str]]] = []
    current = None
    for line in lines:
        match = START.match(line)
        if match:
            if current:
                raw_rows.append(current)
            current = (match, [])
        elif current and line.strip():
            current[1].append(line.strip())
    if current:
        raw_rows.append(current)

    rows = []
    for match, continuation in raw_rows:
        clock, _meridiem, flight, details = match.groups()
        hh, mm = map(int, re.split(r"[.,:]", clock))
        if hh > 23 or mm > 59:
            raise ValueError(f"Invalid report time {clock!r} for {flight}")
        all_text = " ".join([details, *continuation])
        destination = re.split(r"\s*(?:\*|\()", details, maxsplit=1)[0].strip()
        destination = re.sub(r"\s+T3\s*$", "", destination, flags=re.I)
        terminal = "T3" if re.search(r"\bT3\b", all_text, re.I) else "T5"
        aircraft_match = re.search(r"\(([^()]*)\)", details)
        aircraft_code = aircraft_match.group(1).strip() if aircraft_match else ""
        aircraft, families = classify_aircraft(aircraft_code)

        operating_days: set[int] = set()
        segments = re.findall(r"\*+([^*]+?)\*+", all_text)
        if re.search(r"\bOPERATES\b", all_text, re.I):
            segments.extend(re.findall(r"\bOPERATES\b([^*]+)", all_text, re.I))
        for segment in segments:
            if re.search(r"\bTRIP\b", segment, re.I):
                continue
            tokens = [DAYS[token.upper()] for token in DAY_TOKEN.findall(segment)]
            if tokens and ("ONLY" in segment.upper() or "OPERATES" in segment.upper() or not re.search(r"\b(?:CLEARS?|DAY|DAYS)\b", segment, re.I)):
                operating_days.update(tokens)

        rows.append({
            "time": f"{hh:02d}:{mm:02d}",
            "flight": flight.upper(),
            "destination": destination,
            "terminal": terminal,
            "aircraft": aircraft,
            "aircraftCode": aircraft_code,
            "fleetFamilies": families,
            "days": sorted(operating_days) if operating_days else None,
        })

    if not rows:
        raise ValueError(f"No report rows found in {pdf_path}")
    return rows


def main() -> None:
    seasons = []
    for label, relative_path, through, from_date in SCHEDULES:
        path = ROOT / relative_path
        if not path.exists():
            raise FileNotFoundError(path)
        seasons.append({"label": label, "validThrough": through, "validFrom": from_date, "rows": report_rows(path)})
    output = ROOT / "data" / "report-times.js"
    output.write_text("globalThis.REPORT_TIME_SCHEDULES = " + json.dumps(seasons, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")
    print("Generated", output.relative_to(ROOT), "with", ", ".join(f"{s['label']}: {len(s['rows'])}" for s in seasons), "report rows")


if __name__ == "__main__":
    main()
