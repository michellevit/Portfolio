#!/usr/bin/env python3
import re
import json
from pathlib import Path

INPUT_FILE  = Path(__file__).parent / "My Clippings.txt"
OUTPUT_FILE = Path(__file__).parent / "KindleQuotes.json"

# regexes to pull out page and date
PAGE_RE = re.compile(r"page (\d+)", re.IGNORECASE)
DATE_RE = re.compile(r"Added on (.+)$", re.IGNORECASE)

def parse_clippings(text):
    entries = []
    # split on the delimiter line
    chunks = text.split("==========")
    for chunk in chunks:
        lines = [l.strip() for l in chunk.strip().splitlines() if l.strip()]
        if len(lines) < 3:
            continue

        # 1) Title & author line: "A Little Life (Yanagihara, Hanya)"
        m = re.match(r"^(.*)\s+\((.*)\)$", lines[0])
        if not m:
            continue
        book, author = m.group(1), m.group(2)

        # 2) Metadata line: "- Your Highlight on page 35 | Location ... | Added on Tuesday, December 17, 2019 7:01:12 PM"
        meta = lines[1]
        page_match = PAGE_RE.search(meta)
        date_match = DATE_RE.search(meta)
        page = page_match.group(1) if page_match else None
        date_added = date_match.group(1) if date_match else None

        # 3) The actual quote is the last non-meta line
        quote = lines[-1]

        entries.append({
            "book":       book,
            "author":     author,
            "page":       page,
            "date_added": date_added,
            "quote":      quote
        })
    return entries

def main():
    if not INPUT_FILE.exists():
        print(f"❌ Couldn’t find {INPUT_FILE}")
        return

    raw = INPUT_FILE.read_text(encoding="utf-8-sig")
    quotes = parse_clippings(raw)
    with OUTPUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(quotes, f, ensure_ascii=False, indent=2)
    print(f"✅ Parsed {len(quotes)} highlights → {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
