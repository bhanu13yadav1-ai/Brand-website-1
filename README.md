# BLACKED Fusion V1 — Asset Handling (Step 3.3)

## Bundled and verified locally
- `blacked-icon.svg` — app icon.
- `supplied/muslim-collection-four-panel-original.png` — the user-supplied four-panel artwork, preserved byte-for-byte.
- `muslim-collection/*.webp` — four individually decoded crops from that artwork, used in the Muslim-Inspired Collection · Noor Edit (Coming Soon).

## Historical image files still pending local bundling
The legacy innerwear, Sanskari, 360-frame, Boyfriend and Wellness image files are listed in `registry/REMOTE-ASSET-REGISTRY.json` and still use their recorded public raw-GitHub URLs. Their filenames were matched to repository listings, but their actual bytes have not been downloaded, SHA-256 checked or decoded in this runtime. Do not say this project has a complete local asset bundle.

When the three original repository ZIPs are uploaded, import the original files—not unrelated replacements—then update `catalog.js`, this registry and `ASSET-IMPORT-MAP.csv` together. Preserve product/campaign distinctions and label concept art honestly.


## Step 3.3 — additional user-supplied collections
- Five new source originals are preserved byte-for-byte under `supplied/collection-additions/`. Their optimized local WebP display versions are stored in `muslim-collection/`, `christian-collection/` and `sanskari-collection/`.
- Muslim-Inspired · Noor Edit: six cards (four original panel crops plus two new images).
- Christian-Inspired Collection: one Coming Soon concept card.
- Sanskari Edit: twelve cards (the ten originals plus two new user-supplied references).
- `1000201195.png` and the four newly re-uploaded WebPs hash-match assets already stored in Step 3.2; they were not duplicated.
