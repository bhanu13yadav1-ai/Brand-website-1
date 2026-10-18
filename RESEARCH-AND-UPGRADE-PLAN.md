# V1.9 Research & Upgrade Plan

## Reference comparison
The `Brand-website-full-finally-` reference uses a compact dark storefront layout, distinct adult wellness categories, product cards, local preference controls, a boyfriend planner, and a clear separation between lingerie references and adult products. V1.9 keeps those patterns but uses BLACKED styling and separate tabs.

## Fixes based on recent screenshots
1. Use stable files in `/assets/` rather than the embedded asset map. Every frame now exists as an actual file in the ZIP.
2. Keep Home, Intimates, Boyfriend, After Dark 18+, and Women’s Wellness as separate view panels; tabs must switch panels instead of merely scrolling.
3. Keep campaign/reference imagery clearly labelled. No unverified discount, inventory, review, or product-safety claims should appear as store facts.
4. Fit Studio remains separate; its manual preview requires a transparent cutout and must not show a generic garment overlay as if it were the selected product.
5. The 360 viewer is a multi-frame demo; true product rotation needs a real photographed sequence, video, or actual 3D model.

## Suggested next upgrades
- P0: validate asset paths and the Home / Intimates / Boyfriend / After Dark / Wellness navigation on Android.
- P1: real product gallery per confirmed SKU, with front/back/detail assets and verified dimensions/material/price.
- P2: convert supplier product turntable or 3D file to true drag-to-rotate viewer.
- P3: add backend only when real inventory, accounts, orders, and payment are ready.
