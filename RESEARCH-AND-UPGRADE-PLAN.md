# V1.9 Implementation & Upgrade Plan

## What was rebuilt
- Recreated the visual direction as a genuine responsive storefront page instead of embedding the UI mockup screenshot itself.
- Replaced external/runtime image-path assumptions with embedded data URIs for the hero, category tiles, generated concept cards and all eight 360° frames. This addresses the repeated broken-image issue when a GitHub upload omits the `assets/` directory.
- Added distinct shopping destinations: **Intimates**, **After Dark 18+**, and **Women’s Wellness**. Home and Fit Studio are separate navigation destinations too.
- Created a single-file deployment: replace the root `index.html` on GitHub Pages; core UI does not require separate JS/CSS files or an asset directory at runtime.
- Rebuilt product cards, filters, search, details modal, wishlist, comparison, demo bag, local wellness quiz and manual cut-out Fit Studio.

## Product imagery
- Hero/person crop, product-card crops and adult-wellness card imagery are generated visual mockups from the previous design concept. They are labelled concept/reference; they are not proof of inventory or commercial image rights.
- Eight different generated product frames are embedded at 0°, 45°, … 315°. Controls use one state index and wrap at 360°.
- Where a realistic asset is unavailable, a clean illustration or concept placeholder is used rather than blocking the rest of the build.

## Fit Studio behaviour
- The generic demo bra/brief overlay has been removed. User must upload both a person photo and a real transparent PNG garment cut-out.
- The overlay can be moved by drag and arrow controls, scaled, rotated and downloaded. It does not automatically infer body proportions or simulate product fit.
- Uploaded files are decoded as object URLs in the current browser session; they are not sent to a server by this static app.

## Commerce boundaries
The demo bag, wishlist and comparison are client-side. No payment, shipping, live inventory, checkout or supplier pricing is connected. Product descriptions avoid unverified claims about materials, waterproofing, ratings or discounts.

## Recommended production upgrades
1. Replace concept crops with original/permissioned product photography and transparent garment cut-outs.
2. Add a verified product feed containing SKU, size/dimensions, material, care instructions, availability and price.
3. For real AI fitting, send separate person and garment inputs to a compatible model via a secure backend; never expose provider secrets in front-end JavaScript.
4. Add checkout, payment gateway, order/fulfilment, returns and privacy policy only after backend/inventory workflows are built.
5. For real 360°, use a real supplier turntable capture or 3D model rather than generated concept frames.
