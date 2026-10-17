# V1.8 Research & Upgrade Plan

## Product direction
The storefront uses three clear shopping destinations: Intimates, After Dark 18+, and Women’s Wellness. The adult catalogue remains separate, with searchable/filterable concept cards, top-pick shortcuts and visible product-information caveats.

## Asset reliability
The previous mobile screenshot showed broken hero, 360 frame, and visual-inspiration images. In V1.8 these core images are embedded as data URIs in the HTML/JavaScript, and the corresponding local `assets/` folder is retained in the ZIP. That makes the key areas more resistant to an incomplete GitHub upload.

## 360 viewer
Eight 512×512 generated product angles are used at 45-degree increments. The slider, thumbnail, arrow and pointer-drag controls share the same angle index. This is a framed image-sequence demo rather than a true 3D object, and the generated angles are not manufacturer-authorized photography. Replace them with supplier-approved 360-degree photography or a 3D model once the actual product is confirmed.

## Commerce & wellness claims
No prices, reviews, stock status, discount levels or supplier specifications are invented. Adult wellness product listings remain concept/reference entries until verified. For anal toys, the site calls out secure flared bases and maker-specific cleaning instructions. The size questionnaire is optional and is not stored.

## Next production steps
1. Confirm rights for original and cropped campaign/product photos.
2. Add a real product catalogue with verified dimensions/materials, SKU, price, availability and care instructions.
3. If realistic try-on is desired, use separate person and transparent/product-only garment inputs with a secure backend AI integration; do not put API keys in browser JavaScript.
4. Add real checkout/payment only after a backend, inventory source, privacy policy and fulfillment workflow are ready.
