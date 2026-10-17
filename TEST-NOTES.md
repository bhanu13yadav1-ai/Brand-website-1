# V1.5 test notes

## Static checks completed for this package
- `node --check app.js` passed (no JavaScript syntax errors).
- Python HTML parser completed successfully.
- 103 HTML IDs found; no duplicate IDs.
- All 90 literal JavaScript `$('#id')` selectors resolve to matching HTML IDs.
- New homepage hero and all bundled `assets/*` paths exist.
- Legacy Intimates image names not copied into this update package are referenced through the existing public GitHub Pages asset base (`https://bhanu13yadav1-ai.github.io/Brand-website-1/`). Keep the original `ref-*`, `design-*`, and `syrn-*.svg` files in the existing repo.
- After Dark navigation, category filters, search, sort, product grid, comfort questionnaire and Fit Studio controls are present in HTML/JS.
- ZIP integrity is checked separately after the archive is created.

## Functional paths to test after publishing
1. Accept/decline age gate.
2. Homepage banner renders; “Enter After Dark” opens the separate adult section; “Shop Intimates” opens the lingerie catalog.
3. Mobile menu links route to Intimates, After Dark, Women's Wellness, and Fit Studio.
4. Intimates default shows lingerie/style references only; Design concepts and External inspiration filter the intended items.
5. After Dark default shows toys and care entries only; all category filters, search clear, A–Z sort, product dialog, save, compare, and demo bag work.
6. Home category shortcut tiles and Wellness Studio browse buttons open the After Dark section rather than mixing adult products into Intimates.
7. Wellness Studio's prior-use questions remain optional; dimensions validate; “pain/too much” answers avoid recommending larger size; answers are not stored.
8. Fit Studio can upload a person photo and transparent garment PNG separately, then manually resize/rotate/move/export; uploading a campaign poster is not presented as a real cut-out.

## Browser testing status
- A full browser click-through was attempted in the available runtime, but browser navigation did not complete. No complete end-to-end browser test is claimed.
- Confirm the listed paths on an Android browser after GitHub Pages deployment.

## Important limitations
- Adult wellness and lingerie stock, pricing, material claims, dimensions and supplier info are not confirmed. Do not present the concepts as available inventory until those facts are verified.
- Screenshot crops are reference-only pending any relevant usage rights.
- Fit Studio is manual overlay, not AI virtual try-on.
- Wishlist and demo bag are browser-local frontend features; no account sync or real checkout exists.
- 18+ screen is client-side confirmation, not official age verification.
