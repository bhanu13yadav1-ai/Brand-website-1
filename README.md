# BLACKED Big Update V1.9

## What changed
- Rebuilt image strategy: hero and 360 frames load from a real local `assets/` folder included in this ZIP, rather than a huge embedded data map. Upload the whole folder.
- Separate clickable tabs: Home, Intimates, Boyfriend, After Dark 18+, Women’s Wellness.
- Kept the storefront feature set: search, category filtering, wishlist, compare, demo bag, boyfriend planner, size guide, local photo Fit Studio, private comfort quiz, 360 frame viewer.
- Added eight BLACKED editorial reference images from the supplied assets as individual local files (editorial inspiration, not confirmed inventory).
- Missing images should degrade to fallback rather than being treated as real stock.

## Android/GitHub deployment
1. Back up the current repository first.
2. Extract this ZIP.
3. Upload `index.html`, `styles.css`, `app.js`, `VERSION.txt`, and the full `assets/` folder to the repository root; preserve the folder names.
4. Keep existing `ref-*`, `design-*` and `syrn-*.svg` files in the repo if you still need the older catalog cards.
5. Commit, wait for GitHub Pages, then refresh the site with a full reload.

## Honest limitations
- 360° viewer switches among eight generated concept frames; these are not a verified supplier turntable or true 3D model.
- Adult product entries are design concepts until supplier, price, dimensions, materials, stock and relevant usage/safety details are verified.
- Fit Studio is manual overlay, not automatic AI try-on.
- The checkout/cart is demo-only; no real payment, order submission or backend.
- Static checks passed (JS syntax, duplicate IDs, local asset paths, ZIP integrity). Automated browser navigation was blocked by the environment administrator policy, so test on deployed GitHub Pages before public launch.
