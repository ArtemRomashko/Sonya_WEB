#!/usr/bin/env python3
"""
Auto-generate missing guide images via Replicate FLUX 1.1 Pro.
Saves directly to assets/img/category_img/
Usage: python3 generate_images.py
       python3 generate_images.py --start 10  (skip first N images)
       python3 generate_images.py --only finance_savings_1.png
"""

import json
import time
import urllib.request
import urllib.error
import ssl
import os
import sys
import argparse

# ── Config ──────────────────────────────────────────────────────────────────
API_KEY    = "YOUR_REPLICATE_API_KEY_HERE"
MODEL_URL  = "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions"
POLL_URL   = "https://api.replicate.com/v1/predictions/{id}"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "assets", "img", "category_img")
JSON_FILE  = os.path.join(os.path.dirname(__file__), "missing_images_prompts.json")

STYLE_WRAP = (
    "NO TEXT, NO WORDS, NO LETTERS, NO NUMBERS, NO LABELS anywhere in the image. "
    "Flat 2D anime-style educational illustration. "
    "{content} "
    "Style: very light periwinkle lavender BRICK WALL TEXTURE background, soft muted "
    "lavender-blue overall color palette, all objects tinted lavender-purple, anime-style "
    "characters in light blue-grey clothing, NOT photorealistic, NOT 3D render, 2D flat "
    "digital illustration, Freepik flat illustration style. "
    "IMPORTANT: absolutely zero text, numbers or writing anywhere in the image."
)

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# Disable SSL verify (macOS cert issue workaround)
CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

# ── Helpers ─────────────────────────────────────────────────────────────────
def api_post(url, body):
    data = json.dumps(body).encode()
    req  = urllib.request.Request(url, data=data, headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, context=CTX, timeout=30) as r:
        return json.loads(r.read())

def api_get(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=CTX, timeout=30) as r:
        return json.loads(r.read())

def download(url, path):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, context=CTX, timeout=60) as r:
        with open(path, "wb") as f:
            f.write(r.read())

def wait_for_result(pred_id, timeout=180):
    url      = POLL_URL.format(id=pred_id)
    deadline = time.time() + timeout
    while time.time() < deadline:
        d      = api_get(url)
        status = d.get("status")
        if status == "succeeded":
            return d["output"]
        if status in ("failed", "canceled"):
            return None
        time.sleep(5)
    return None

# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--start", type=int, default=0, help="Skip first N images")
    parser.add_argument("--only",  type=str, default=None, help="Generate only this filename")
    args = parser.parse_args()

    with open(JSON_FILE) as f:
        data = json.load(f)

    images = data["images"]
    if args.only:
        images = [i for i in images if i["filename"] == args.only]
        if not images:
            print(f"Not found: {args.only}")
            return
    else:
        images = images[args.start:]

    total = len(images)
    print(f"\n🎨 Generating {total} images → {OUTPUT_DIR}\n")

    done = 0
    skip = 0
    fail = 0

    for idx, img in enumerate(images):
        filename = img["filename"]
        out_path = os.path.join(OUTPUT_DIR, filename)

        # Skip if already exists
        if os.path.exists(out_path):
            print(f"[{idx+1}/{total}] SKIP  {filename} (exists)")
            skip += 1
            continue

        # Build full prompt
        full_prompt = STYLE_WRAP.format(content=img["prompt"])

        print(f"[{idx+1}/{total}] GEN   {filename}")
        print(f"       Topic: {img.get('section','')}")

        # Submit
        try:
            resp = api_post(MODEL_URL, {
                "input": {
                    "prompt": full_prompt,
                    "aspect_ratio": "3:2",
                    "output_format": "png",
                    "output_quality": 90,
                    "safety_tolerance": 5,
                }
            })
        except Exception as e:
            # 429 rate limit — wait and retry once
            if "429" in str(e):
                print(f"       ⏳ Rate limited, waiting 30s...")
                time.sleep(30)
                try:
                    resp = api_post(MODEL_URL, {
                        "input": {
                            "prompt": full_prompt,
                            "aspect_ratio": "3:2",
                            "output_format": "png",
                            "output_quality": 90,
                            "safety_tolerance": 5,
                        }
                    })
                except Exception as e2:
                    print(f"       ❌ Submit failed: {e2}")
                    fail += 1
                    continue
            else:
                print(f"       ❌ Submit failed: {e}")
                fail += 1
                continue

        pred_id = resp.get("id")
        if not pred_id:
            print(f"       ❌ No prediction ID: {resp}")
            fail += 1
            continue

        print(f"       ⏳ Waiting (id={pred_id})...")
        output = wait_for_result(pred_id)

        if not output:
            print(f"       ❌ Generation failed or timed out")
            fail += 1
            # small pause before next
            time.sleep(5)
            continue

        # Download
        img_url = output if isinstance(output, str) else output[0]
        try:
            download(img_url, out_path)
            size_kb = os.path.getsize(out_path) // 1024
            print(f"       ✅ Saved ({size_kb} KB)")
            done += 1
        except Exception as e:
            print(f"       ❌ Download failed: {e}")
            fail += 1
            continue

        # Rate limit pause between requests
        if idx < total - 1:
            time.sleep(8)

    print(f"\n{'─'*50}")
    print(f"✅ Done: {done}  |  ⏭ Skipped: {skip}  |  ❌ Failed: {fail}")
    print(f"{'─'*50}\n")

if __name__ == "__main__":
    main()
