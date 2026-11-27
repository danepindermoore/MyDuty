#!/usr/bin/env python3
"""Sync the workbook's AOR Positions sheet into data/aircraft/<airfile>.js."""
from __future__ import annotations
import argparse, json, re
from pathlib import Path
import openpyxl

ROOT=Path(__file__).resolve().parents[1]
DEFAULT=Path.home()/"iCloudDrive/Documents/Work/British Airways/5.0 Project Work/WebApps/British Airways Fleet.xlsx"
NA="NA"
def clean(v):
    if v is None: return ""
    return re.sub(r"\bfirst\b", "FIRST", re.sub(r"\s+", " ", str(v)).strip(), flags=re.I)
def split_list(v):
    s=clean(v)
    return [x.strip() for x in s.split(",") if x.strip()] if s and s.upper()!=NA else []
def split_responsibilities(v):
    s=clean(v)
    if not s or s.upper()==NA:return [NA]
    # Semicolons always separate duties. Commas separate list items, while
    # commas introducing a condition/action (", if…", ", check…") stay joined.
    return [x.strip() for x in re.split(r";|,(?!\s*(?:if|check|unless)\b)",s,flags=re.I) if x.strip()] or [NA]

def aor_headers(rows):
    for index, row in enumerate(rows):
        headers = [clean(value) for value in row]
        if {"Airfile", "Position Number"}.issubset(headers):
            if index > 0:
                # Vertically merged headings are stored in the row above.
                headers = [header or clean(above) for header, above in zip(headers, rows[index - 1])]
            if "Area of Responsibility (AOR)" not in headers:
                raise SystemExit("Missing 'Area of Responsibility (AOR)' header in 'AOR Positions'")
            return index, headers
    raise SystemExit("Missing 'Airfile' and 'Position Number' headers in 'AOR Positions'")

def service_summary(row):
    duty_names = {"IFR": "Inflight Retail", "CF/FS": "Community Fund / Flying Start"}
    duties = []
    for part in re.split(r"[,;\r\n]+", str(row.get("IFR, CF / FS") or "")):
        duty = clean(part)
        if duty.upper() not in {"", NA}:
            code = re.sub(r"\s+", "", duty).upper()
            duties.append(duty_names.get(code, duty))
    summary = clean(row.get("Service Delivery"))
    if summary.upper() not in {"", NA}:
        duties.append(summary)
    return ", ".join(duties) or NA

def additional_responsibilities(row):
    duties = split_responsibilities(row.get("Additional Responsibilities"))
    coverage = clean(row.get("Door Coverage on Ground"))
    if coverage.upper() in {"", NA}:
        return duties
    if duties == [NA]:
        duties = []
    return [*duties, f"Door coverage on ground: {coverage}"]

def extra_crew_bullets(value):
    # A full stop separates duties, except in position labels such as No. 9 and in decimals.
    parts = re.split(r"(?<!\bNo)(?:(?<!\d)\.|\.(?!\d))|[\r\n]+", str(value or ""), flags=re.I)
    return [text for part in parts if (text := clean(part)).upper() not in {"", NA}]
def role_title(row):
    a,b=clean(row.get("Role 1")),clean(row.get("Role 2"))
    if a.upper()=="IFM" and b.upper()=="SCCM": parts=["SCCM","IFM"]
    else: parts=[x for x in (a,b) if x]
    return " - ".join(parts) if parts else NA
def cabin_codes(v):
    s=clean(v)
    if not s or s.upper()==NA:return [NA]
    # Keep the short labels already used by the aircraft page and translate
    # the full cabin names commonly entered in the workbook.
    aliases={"CLUB WORLD":"CW","WORLD TRAVELLER PLUS":"WTP","WORLD TRAVELLER":"WT","FIRST":"F"}
    chunks=re.split(r"\s*[,;/]\s*|\s+AND\s+",s,flags=re.I)
    return [aliases.get(x.strip().upper(),x.strip()) for x in chunks if x.strip()] or [NA]
def seating(v):
    s=clean(v)
    if not s or s.upper()==NA: return {"seat":NA,"descriptor":NA,"facing":NA,"full":NA}
    m=re.match(r"^([^:]+):\s*(.*)$",s)
    if not m:return {"seat":NA,"descriptor":NA,"facing":NA,"full":s}
    seat,desc=m.group(1).strip(),m.group(2).strip()
    facing=next((x for x in ("FWD","AFT") if re.search(r"\b"+x+r"\b",desc,re.I)),NA)
    descriptor=next((x.title() for x in ("Inboard","Outboard") if re.search(r"\b"+x+r"\b",desc,re.I)),NA)
    return {"seat":seat or NA,"descriptor":descriptor,"facing":facing,"full":s}
def equipment(v,loc):
    out=[]
    for item in split_list(v):
        m=re.match(r"^(\d+)\s+(.+)$",item)
        qty,code=(int(m.group(1)),m.group(2).strip()) if m else (1,item)
        if re.sub(r"[^a-z]", "", code.casefold()) in {"rk", "restraint", "restraintkit", "restraintkits"}: continue
        out.append({"code":code,"qty":qty,"locationType":loc})
    return out
def read_obj(path):
    text=path.read_text(encoding="utf-8")
    m=re.search(r"(globalThis\.AOR_[A-Z0-9]+\s*=\s*)(\{)",text)
    if not m: raise ValueError(f"No AOR object assignment in {path}")
    # Aircraft files are JavaScript object literals (some keys are unquoted
    # and comments are allowed), so normalize that literal into JSON first.
    start=m.start(2); quote=None; escaped=False; line_comment=False; block_comment=False; depth=0; end=None; i=start
    while i<len(text):
        c=text[i]
        if line_comment:
            if c=="\n": line_comment=False
            i+=1; continue
        if block_comment:
            if text.startswith("*/",i): block_comment=False; i+=2; continue
            i+=1; continue
        if quote:
            if escaped: escaped=False
            elif c=="\\": escaped=True
            elif c==quote: quote=None
        elif text.startswith("//",i): line_comment=True; i+=2; continue
        elif text.startswith("/*",i): block_comment=True; i+=2; continue
        elif c in ('"', "'"): quote=c
        elif c=="{": depth+=1
        elif c=="}":
            depth-=1
            if depth==0: end=i+1; break
        i+=1
    if end is None: raise ValueError(f"Unclosed AOR object in {path}")
    literal=text[start:end]
    literal=re.sub(r"/\*[\s\S]*?\*/", "", literal)
    # Remove line comments without touching quoted strings.
    out=[]; quote=None; escaped=False; i=0
    while i<len(literal):
        c=literal[i]
        if quote:
            out.append(c)
            if escaped: escaped=False
            elif c=="\\": escaped=True
            elif c==quote: quote=None
            i+=1; continue
        if c in ('"', "'"): quote=c; out.append('"' if c=="'" else c); i+=1; continue
        if literal.startswith("//",i):
            newline=literal.find("\n",i); i=len(literal) if newline<0 else newline; continue
        out.append(c); i+=1
    literal="".join(out)
    literal=re.sub(r"([{,]\s*)([A-Za-z_$][\w$]*|\d+)(\s*:)",lambda m:m.group(1)+json.dumps(m.group(2))+m.group(3),literal)
    literal=re.sub(r",\s*([}\]])",r"\1",literal)
    literal=re.sub(r"'([^'\\]*(?:\\.[^'\\]*)*)'",lambda m:json.dumps(m.group(1)),literal)
    obj=json.loads(literal)
    return text,m,obj,end

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument("workbook",nargs="?",type=Path,default=DEFAULT);a=ap.parse_args()
    if not a.workbook.is_file():raise SystemExit(f"Workbook not found: {a.workbook}")
    wb=openpyxl.load_workbook(a.workbook,read_only=True,data_only=True)
    if "AOR Positions" not in wb.sheetnames:raise SystemExit("Missing 'AOR Positions' sheet")
    rows = list(wb["AOR Positions"].values)
    wb.close()
    header_idx, heads = aor_headers(rows)
    grouped={}
    for raw in rows[header_idx+1:]:
        d = {header: value for header, value in zip(heads, raw) if header}
        code=clean(d.get("Airfile")); num=d.get("Position Number")
        if not code or not isinstance(num,(int,float)):continue
        grouped.setdefault(code,{})[int(num)]=d
    done=[]
    for code,by_num in grouped.items():
        path=ROOT/"data"/"aircraft"/(code+".js")
        if not path.exists():continue
        text,m,obj,end=read_obj(path)
        position_list = obj.setdefault("positions", [])
        positions = {int(p["number"]): p for p in position_list}
        added_positions = False
        for n,row in by_num.items():
            p=positions.get(n)
            if p is None:
                # The workbook also contains empty templates with only crew roles.
                has_details = any(
                    clean(value).upper() not in {"", NA}
                    for header, value in row.items()
                    if header not in {"Airfile", "Position Number", "Role 1", "Role 2", "Cabin"}
                )
                if not has_details:
                    continue
                p = {"number": n}
                position_list.append(p)
                added_positions = True
            title=role_title(row); p["title"]=title
            p["displayTitle"]=f"No. {n} ({title})" if title!=NA else f"No. {n}"
            p["role"]=clean(row.get("Role 1")) or NA
            role2 = clean(row.get("Role 2"))
            if role2.upper() not in {"", NA}:
                p["role2"] = role2
            else:
                p.pop("role2", None)
            p["seating"]=seating(row.get("Seating Position"))
            p["doorResponsibility"]=clean(row.get("Door Mode Selection") or row.get("Door Mode Seclection")) or NA
            p["rest"]=clean(row.get("Rest")) or NA
            service = {
                "summary": service_summary(row),
                "cabin": cabin_codes(row.get("Cabin")),
            }
            extra_crew = extra_crew_bullets(row.get("Extra Crew"))
            if extra_crew:
                service["extraCrew"] = extra_crew
            p["service"] = service
            p["demo"]={"position":clean(row.get("Position")) or NA,"pointsOut":split_list(row.get("Points Out")) or [NA]}
            area=clean(row.get("Area of Responsibility (AOR)")) or NA
            p["aor"]={"hasAor":area!=NA,"area":area}
            p["additionalResponsibilities"]=additional_responsibilities(row)
            checks=[]
            for col,loc in (("Under Crew Seat","seat"),("In Assigned Area","area"),("In Crew Rest Area","rest")):
                checks.extend(equipment(row.get(col),loc))
            p["equipmentChecks"]=checks or [{"code":NA,"qty":1,"locationType":"area"}]
        if added_positions:
            position_list.sort(key=lambda position: int(position["number"]))
        out=text[:m.start(2)]+json.dumps(obj,ensure_ascii=False,indent=2)+text[end:]
        if out != text:
            path.write_text(out,encoding="utf-8",newline="\n")
        done.append(code)
    print("Synced AOR positions for: "+", ".join(done))
if __name__=="__main__":main()
