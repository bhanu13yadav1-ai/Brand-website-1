# Step 1 Decisions — BLACKED Fusion V1

**Recorded:** 21 October 2026
**Checkpoint:** Step 1 foundation package verified locally; not deployed.

## Decisions made from the accessible audit

1. **No source repository will be overwritten in Step 1.** The connected GitHub integration reports read-only access. All changes in this package are local-only.
2. **The current package is a development foundation, not a replacement production site.** Its project-navigation UI is a planning shell for Step 2 integration; it must not be uploaded over the current site as a complete website.
3. **Use a conservative migration strategy.** Brand-website-3 is the candidate feature-rich implementation source; Brand-website-4f is a source for the compact UI and three original wheel flows; Brand-website-full-finally- is a delta/patch source whose target and file preconditions must be verified.
4. **Do not blindly merge the three repositories.** First map each unique feature, image, script, style and storage key; then select one implementation for duplicate behavior. Preserve unique features.
5. **Original photos take priority.** Do not create substitute assets for missing owner-supplied images. Import the original individual binaries, hash them and verify the correct section/card before marking assets ready.
6. **An image fallback must not misrepresent a product.** Use a clearly labelled unavailable state or a verified correct asset. Do not use an unrelated garment/preview image as though it were the selected item.
7. **Catalogue truth matters.** Campaign/reference/concept assets must be labelled separately from confirmed product inventory. No unverified price, stock, material, size, customer rating, or supplier claim.
8. **Fit Studio must remain honest.** It is a local photo/reference preview and manual overlay tool, not AI try-on or a guarantee of fit. Keep the selected product identity synchronized across card, image, gallery, title, overlay and export.
9. **Three original wheels are preservation requirements:** Wellness > Dildo sizing (`dildoPreference`, `dildoExperience`); Wellness > Butt Plug sizing (`plugPreference`, `plugExperience`); Boyfriend > size/deal (`boyPreference`, `boyResult`). They are mapped, not runtime-tested yet.
10. **Dirty/Wild Wheel is additional.** It must not replace the three original wheels, and must offer category choice, clear result, spin-again, reset and skip/stop choices.
11. **Medical education stays separate from promotional content.** Use credible references, content review dates, correct terms, no virginity-check guidance, and clear advice to seek professional evaluation for concerning symptoms. Do not invent BLACKED size charts.
12. **Privacy statements must match implementation.** Browser-local content, private storage, encryption, anonymity, publishing, analytics and booking must not be claimed unless actually implemented and tested.
13. **Use the simplest maintainable architecture suitable for the hosting environment.** The current foundation separates HTML, CSS and JS; no framework migration is justified by Step 1 alone.
14. **All tests must carry a scope.** In-memory Chromium tests do not prove GitHub Pages delivery, service-worker caching, physical Android operation or feature migration.

## Phase boundaries

- **Step 1 — Foundation:** navigation shell, section map, 14-rule master note, static repository audit, feature/source inventory, asset import map, research register, bug/rule tracking, checkpoint templates and local foundation tests.
- **Step 2 — Feature integration:** requires accessible source archive/assets. Integrate the preserved app behaviors, correct source paths, original images, three original wheels, new Dirty/Wild Wheel, Boyfriend/Couples, Sanskari/Coming Soon and Wellness/Size Guide. Test each migrated feature as it is added.
- **Step 3 — QA/release:** automated and functional regression, source-to-final asset audit, responsive checks, accessibility/security review, service-worker/cache checks, final ZIP and honest release report. Deployment only if authorized access is actually available.

## Open blockers carried forward

- Full original binary asset import is not included in this foundation ZIP.
- The exact deployed root cause of image failures remains unconfirmed because a live browser/network waterfall was not available. Static path mismatches are verified source findings, not complete runtime proof.
- Live GitHub Pages and physical Android checks are NOT TESTED.
- GitHub connector reports `push: false`; no source repository commit or deployment was performed.
- Original features and local storage migration are not yet integrated or regression-tested.
