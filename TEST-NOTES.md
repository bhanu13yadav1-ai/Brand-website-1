# V1.9 Test Notes

## Checks completed
- JavaScript syntax: `node --check app.js` passed.
- HTML parsed with BeautifulSoup; 130 stable IDs detected, no duplicate IDs.
- Five separate page panels exist: Home, Intimates, Boyfriend, After Dark 18+, Women's Wellness.
- Navigation buttons target those panels; active tab handling is present in the app script.
- Eight 360 angle image files are included as actual local files; thumbnail code uses `./assets/wand-360-frame-01.webp` through `08.webp`.
- All asset files from V1.8 embedded map were materialized as local files, and current user-supplied editorial references are saved as separate optimized WebP files.
- ZIP integrity verified after packaging.

## Browser-test limitation
The browser automation runtime returned `ERR_BLOCKED_BY_ADMINISTRATOR` for both file and localhost navigation. Therefore this build does **not** claim a complete automated click-through pass. Please verify the deployed GitHub Pages site on Android. The 360 controls are wired to update a single frame index used by arrows, slider, thumbnails, drag, and reset.

## Known product limitations
- 360° uses generated concept frames, not official supplier photography or a true 3D model.
- Original supplied campaign images are references, not proof of sellable stock, material, dimensions, price, or reviews.
- Fit Studio manual mode still needs a transparent garment cutout; it is not AI virtual try-on.
- Demo bag is not a real checkout/payment flow.
