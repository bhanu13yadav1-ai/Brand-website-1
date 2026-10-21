# Research Register — sources opened for planning

Last reviewed for this planning pass: 21 October 2026. This register records sources opened, not that every content page has been fully authored or medically reviewed.

## Consent / adult relationship UX
- RAINN, *Consent 101: Respect, Boundaries, and Building Trust*: https://rainn.org/share-the-facts/consent-101-respect-boundaries-and-building-trust
  - Use for voluntary, ongoing communication, boundaries, ability to change one's mind and non-coercive activity design.
  - Do not infer user preferences or generalize from gender.

## Anatomy / body education
- Planned Parenthood, *What are the parts of female sexual anatomy?*: https://www.plannedparenthood.org/learn/health-and-wellness/sexual-and-reproductive-anatomy/what-are-parts-female-sexual-anatomy
  - Use for the distinction between external vulva structures and the internal vagina, correct names and natural anatomical variation.
- Planned Parenthood, *Are My Vulva & Vagina Normal?*: https://www.plannedparenthood.org/learn/teens/puberty/my-vulva-and-vagina-normal
  - Use for clear, respectful language around variation and basic educational context.

## Virginity / hymen myths
- World Health Organization, *Eliminating virginity testing — an interagency statement*: https://www.who.int/publications/i/item/WHO-RHR-18.15
- WHO news statement: https://www.who.int/news/item/17-10-2018-interagency-statement-calls-for-the-elimination-of-virginity-testing
  - Core content principle: virginity is not a medical diagnosis; hymen appearance and physical examination cannot establish sexual history. Do not build self-inspection or insertion instructions for this purpose.

## Accessibility
- W3C, WCAG 2.2 SC 2.5.8 — Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
  - Minimum target criterion is 24 × 24 CSS pixels subject to listed exceptions; for phone usability, aim larger where practical.

## Hosting / publishing / secrets
- GitHub Docs, *Configuring a publishing source for your GitHub Pages site*: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
  - Confirm branch/folder source, project paths, and actual Pages deploy status.
- GitHub Docs, *Secure use reference*: https://docs.github.com/en/actions/reference/security/secure-use
  - Apply least-privilege token permissions and do not put secrets in public client-side JS.
- GitHub Docs, *Secrets reference*: https://docs.github.com/en/actions/reference/security/secrets
  - Use supported secret storage in a controlled workflow/backend, never in published web code.

## Research still needed in Step 2
- Brand-specific bra/brief size charts and measurement methods from the actual BLACKED product owner/supplier. No universal size conversion should be invented.
- India-relevant professional health guidance for symptoms and support resources; the educational page must provide clear scope/disclaimer and not diagnose.
- Any future survey or psychology statistics used for fantasy/romance content must be checked from the original publication and described with limitations. This build should prefer feature usability and consent principles over unsupported claims about what a group “secretly wants.”


## Link verification note — 21 October 2026

The WHO virginity-testing statement, RAINN consent page, W3C target-size explanation, GitHub Pages publishing-source guidance and GitHub Actions security guidance were checked again for this Step 1 planning pass. Planned Parenthood's relevant anatomy result was available in search results, although opening the page directly from this environment returned HTTP 403; therefore, review the page normally in Step 2 before relying on it for authored copy. This is only a source register, not a medical review or a claim that the Wellness section has been implemented.

Key supported constraints for Step 2:
- WHO states that hymen appearance is not a reliable indication of intercourse and that no known examination can prove history of vaginal intercourse: https://www.who.int/publications-detail-redirect/WHO-RHR-18.15
- RAINN describes consent as clear, voluntary, pressure-free and ongoing, and says consent may be withdrawn: https://rainn.org/share-the-facts/consent-101-respect-boundaries-and-building-trust/
- W3C WCAG 2.2 SC 2.5.8 generally sets a 24-by-24 CSS-pixel pointer target minimum, subject to exceptions: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- GitHub Pages can publish from a configured branch/folder or by GitHub Actions; public Pages content must not contain secrets: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GitHub Actions security guidance recommends least-privilege token permissions and safe secret handling: https://docs.github.com/en/actions/reference/security/secure-use
