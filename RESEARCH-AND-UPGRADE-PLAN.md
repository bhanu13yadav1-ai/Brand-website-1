# BLACKED Big Update V1.7 — Research & Upgrade Plan

## Primary fix: the 360° viewer
The V1.6 viewer used nine frames for which the last tile was a macro close-up, not a product angle. It also calculated degrees as `index × 360 / 9` (40° increments), while the generated views were arranged at 45° intervals. This caused the displayed angle, slider and frames not to match.

V1.7 uses eight distinct product-angle crops: 0°, 45°, 90°, 135°, 180°, 225°, 270° and 315°. It cycles through all eight views; after the 315° view, the next step wraps to the front image, which completes the full turn. A separate ninth macro shot is excluded from the viewer.

## Interaction and mobile fixes
- Left/right buttons, slider, keyboard arrows, Home/End, thumbnail selection, and reset all call the same `showSpinFrame()` function so the image, slider, angle output, thumbnails and status text remain synchronized.
- Touch dragging uses accumulated horizontal movement, pointer capture and an explicit touch interaction zone. The rest of the page remains scrollable.
- The product images are preloaded and have an explicit fallback/error message.
- JS/CSS and frames use a `v=1.7` URL query to help prevent stale mobile browser caches.

## Other existing features preserved
The build keeps the branded homepage, separate After Dark 18+ catalogue, Intimates collection, Women's Wellness questionnaire, local wishlist, comparison, demo bag, size guide, and manual garment-cutout Fit Studio. This build does not silently replace the manual garment overlay with generic shapes.

## Product truth
The product views are generated concept images, not true supplier photography. No stock, brand-specific materials, product dimensions, water resistance, charging details, ratings, prices or availability should be claimed until supported by the actual supplier. The viewer is interactive UI using sequential images; it is not a 3D model or AI renderer.

## Next high-value upgrade after V1.7
1. Acquire supplier-approved product-only photos and a real 24–36-frame spin or a verified 3D model.
2. Add supplier-confirmed product specs and real pricing/availability.
3. Only then connect live inventory and a secure checkout backend.
4. For AI try-on, connect a compatible provider through a server-side endpoint, protect API secrets, obtain explicit consent and implement retention/deletion controls.

## QA caveat
Static checks (syntax, HTML structure, ID uniqueness, image dimensions and file presence) can be performed here. Automated browser navigation was blocked by the runtime administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`), so we do not claim full click-through or Android device validation. Real-device checks after deployment remain required.
