# V1.8 Research & Upgrade Plan

## Interface structure
- **Home**: BLACKED-branded violet/magenta campaign hero, quick categories, and top-picks cards similar to the reference storefront layout.
- **Intimates**: existing lingerie references, search/filter, compare, size guide, manual garment-cutout studio.
- **Boyfriend**: gift and relationship planning ideas for him, her and couples, with an interactive mood/budget planner.
- **After Dark 18+**: a separate adult-products section with category filters, search, sorting, saved items, compare, demo bag and 360 concept viewer.
- **Women's Wellness**: comfort-first optional questionnaire and care-focused guidance, separate from the lingerie try-on.

## Why this fixes the previous blank screen issue
The last deployment screenshots showed a broken hero and missing 360 thumbnails. The prior HTML referenced files under `/assets/`, and if those files weren't uploaded with GitHub's file picker, the browser could not find them. V1.8 embeds the hero, 360 frames, product concept SVGs and available cropped product references directly into the single HTML file. That makes the core experience independent of uploading an `assets/` folder.

## Honest product display
Adult listings are concepts until real inventory, pricing, materials, dimensions and usage instructions are verified. The image viewer remains a multi-frame concept preview, not a full 3D model. Fit Studio requires an uploaded transparent garment cutout for the manual overlay; automatic AI fitting is not represented as active.
