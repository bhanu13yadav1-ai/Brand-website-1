# V1.7 Test Notes

## Static validation
- `node --check app.js`: PASS
- HTML parser: PASS
- Duplicate HTML IDs: none
- 8 unique 512×512 generated angle WebP files (0° to 315°): verified with Pillow
- 360 image paths 01–08: present
- Old macro-close-up frame 09: no longer included/referenced
- Core scripts/styles and angle frame URLs: cache-busted to `v=1.7`
- ZIP CRC/integrity: checked after packaging

## 360 viewer code paths included
- Previous/next buttons
- Slider input
- 8 thumbnail buttons with active-state updates
- Front-view reset button
- Horizontal touch/mouse drag with pointer capture and distance accumulation
- Keyboard arrows, Home and End
- Image preloading and missing-asset fallback messaging
- Matching 45° increments and 0° front wrap-around

## Not claimed as tested
A full automated browser click-through could not run in this environment: Chromium/Playwright navigation returned `ERR_BLOCKED_BY_ADMINISTRATOR` for both local HTTP and file URLs. Therefore actual touch behavior on Android and all other click flows still need a real-device smoke test after GitHub Pages deployment. No live deployment is performed by this package.

## Product and service limitations
- Angle photos are generated concept visuals, not a real manufacturer's synchronized 360° photography.
- The cart is demo-only; no checkout/payment API is connected.
- No AI try-on provider, account backend, live prices or inventory is connected.
- Fit Studio uses a user-supplied transparent garment PNG and manual positioning; it does not extract a garment from a poster.
