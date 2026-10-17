# V1.8 Test Notes

## Static checks performed
- Standalone HTML generated with inline CSS and inline application JavaScript.
- Critical local project assets are represented as data URLs in the standalone HTML, including the campaign hero and all eight `wand-360-frame-*.webp` images.
- Main view panel IDs and tab controls use unique IDs and explicit `data-view` values.
- The viewer uses eight frames (0°, 45°, 90°, 135°, 180°, 225°, 270°, 315°) with wrapped previous/next state, range updates and active thumbnail state.
- Boyfriend planner uses client-side static suggestions; it does not transmit or persist form answers.
- Product price/availability remains clearly labelled as unconfirmed; demo bag is not checkout.

## Known limitations
- A full real-device browser click-through could not be performed in this build environment. The package should be tested on GitHub Pages after upload.
- The legacy user-supplied `ref-*`, `design-*` and `syrn-*.svg` images are not redistributed in this package; Intimates image cards rely on the existing root-level files on the user's repository. The new hero/360/wellness assets are embedded.
- Generated 360 images are concept angles, not supplier-verified product photography.
