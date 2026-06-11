#!/usr/bin/env python3
"""
Edit an existing image via Replicate FLUX Kontext Max (instruction-based edit).
API key read from env REPLICATE_API_TOKEN (never hard-coded).
Usage: REPLICATE_API_TOKEN=xxx python3 kontext_edit.py --input in.png --output out.png --prompt "..."
"""
import json, time, base64, os, ssl, argparse, urllib.request, urllib.error

API_KEY = os.environ["REPLICATE_API_TOKEN"]
MODEL_URL = "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-max/predictions"
POLL_URL = "https://api.replicate.com/v1/predictions/{id}"

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}


def api_post(url, body):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=HEADERS, method="POST")
    with urllib.request.urlopen(req, context=CTX, timeout=60) as r:
        return json.loads(r.read())


def api_get(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, context=CTX, timeout=60) as r:
        return json.loads(r.read())


def download(url, path):
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req, context=CTX, timeout=120) as r:
        open(path, "wb").write(r.read())


def wait(pred_id, timeout=240):
    url = POLL_URL.format(id=pred_id)
    deadline = time.time() + timeout
    while time.time() < deadline:
        d = api_get(url)
        s = d.get("status")
        if s == "succeeded":
            return d["output"]
        if s in ("failed", "canceled"):
            print("   ERROR:", d.get("error"))
            return None
        time.sleep(4)
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True)
    ap.add_argument("--output", required=True)
    ap.add_argument("--prompt", required=True)
    a = ap.parse_args()

    with open(a.input, "rb") as f:
        data_uri = "data:image/png;base64," + base64.b64encode(f.read()).decode()

    print(f"GEN -> {a.output}")
    resp = api_post(MODEL_URL, {"input": {
        "prompt": a.prompt,
        "input_image": data_uri,
        "aspect_ratio": "match_input_image",
        "output_format": "png",
        "safety_tolerance": 2,
        "prompt_upsampling": False,
    }})
    pid = resp.get("id")
    if not pid:
        print("No id:", resp)
        return
    print("  waiting", pid)
    out = wait(pid)
    if not out:
        print("  FAILED")
        return
    url = out if isinstance(out, str) else out[0]
    download(url, a.output)
    print(f"  SAVED {os.path.getsize(a.output)//1024} KB")


if __name__ == "__main__":
    main()
