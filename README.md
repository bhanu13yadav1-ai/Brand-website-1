# BLACKED — Intimates + After Dark Wellness (Big Update V1.7)

V1.7 fixes the angle mapping and touch interaction in the 360° concept viewer while preserving the separate Intimates, After Dark 18+, and Women’s Wellness experiences.

## What changed in V1.7
- Rebuilt the angle sequence from eight clean product-view crops at 0°, 45°, 90°, 135°, 180°, 225°, 270° and 315°. The incorrect ninth macro close-up is no longer used as a rotation angle.
- Corrected angle math to match each image’s 45° step. The eight views wrap back to the front to complete a full rotation.
- Added tap-able angle thumbnails, a reset-to-front button, and clearer angle status.
- Improved touch drag with pointer capture, accumulated drag distance, `touch-action: none` on the viewer only, keyboard support, and fallback messaging when an image is missing.
- Added cache-busting `?v=1.7` to the main JS/CSS and angle frames to reduce stale-file issues on mobile browsers.
- Kept product truth clear: this is a generated concept angle study, not a real manufacturer-supplied 360° spin of a confirmed item.

## Important limitations
The massager portrait and angle images are generated concept imagery. Angles are not guaranteed to be geometrically exact photographs of a real stock SKU. Actual supplier, price, stock, material, size, charging, water resistance and product rights must be verified before commercial listing.

The cart remains a demo. There is no live inventory, checkout/payment integration, account backend, or AI virtual try-on provider. Fit Studio requires a user photo plus a separately supplied transparent garment PNG; placement is manual, not automatic garment fitting. Wellness-questionnaire answers remain in page memory only (not saved or sent). The 18+ gate is a front-end confirmation, not formal age verification.

## Deploy from Android / GitHub Pages
1. Download and extract this ZIP.
2. Open the extracted `Brand-website-1-Big-Update-v1.7` folder. Upload the **contents of that folder** into the existing repository root, not the outer folder itself.
3. Replace `index.html`, `styles.css`, `app.js`, `VERSION.txt`, `README.md`, `RESEARCH-AND-UPGRADE-PLAN.md`, and `TEST-NOTES.md`.
4. Upload the **entire `assets/` folder contents**, including `wand-massager-studio.webp` and `wand-360-frame-01.webp` through `wand-360-frame-08.webp`. Do not upload only the HTML files.
5. Preserve the repository’s legacy `ref-*`, `design-*`, and `syrn-*.svg` images because Intimates and Fit Studio still use them. Merge/copy new assets into the existing `assets/` folder rather than deleting legacy images.
6. Commit and wait for GitHub Pages to publish. On Android, close the old tab, reopen the URL, and hard refresh if cached content persists. The JS/CSS/frame query strings changed to `v=1.7`; if the site still shows V1.6, the new files were not uploaded to the site’s root.

## Check after publishing
Test age gate; mobile nav; Intimates filters; After Dark search/filter/sort; the 360 viewer’s drag, eight thumbnails, arrow buttons, slider, reset and keyboard keys; product details; wishlist; compare; demo bag; Wellness questions; photo plus transparent PNG upload; overlay scale/position/rotation; and PNG export.

## Research starting points
- Baymard Institute, Product List UX: https://baymard.com/research-articles/current-state-product-list-and-filtering
- Baymard Institute, Mobile E-Commerce Usability: https://baymard.com/research/mcommerce-usability
- Google web.dev, Core Web Vitals: https://web.dev/articles/vitals
- ASCI Code for Self-Regulation in Advertising: https://www.ascionline.in/the-asci-code/
- Planned Parenthood, Sex Toys and Safety: https://www.plannedparenthood.org/learn/sex-pleasure-and-sexual-dysfunction/sex-and-pleasure/sex-toys
- FASHN, Virtual Try-On API docs: https://docs.fashn.ai/api-reference/tryon-v1-6
