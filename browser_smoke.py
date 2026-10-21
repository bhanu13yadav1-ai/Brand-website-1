#!/usr/bin/env python3
"""Chromium smoke tests using the exact local HTML/CSS/JS sources in an inline page.
The environment blocks navigation to localhost/file URLs, so this checks in-memory interactions only.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json, re, sys
ROOT = Path(__file__).resolve().parents[1]
html=(ROOT/'index.html').read_text(encoding='utf-8')
css=(ROOT/'css'/'styles.css').read_text(encoding='utf-8')
js=(ROOT/'js'/'app.js').read_text(encoding='utf-8')
html=re.sub(r'<link rel="stylesheet" href="css/styles\.css">', '<style>'+css+'</style>', html, count=1)
html=re.sub(r'<script src="js/app\.js" defer></script>', '', html, count=1)
html=html.replace('</body>', '<script>'+js+'</script>\n</body>', 1)
report = {'test_scope':'Chromium in-memory page with the exact current HTML/CSS/JS embedded. Navigation to localhost/file URLs is blocked by this runtime; this does NOT verify GitHub Pages, physical Android, cache service worker, or deployed resource headers.', 'viewport_results':[], 'interaction_results':{}, 'console_errors':[], 'page_errors':[], 'failed_requests':[]}
try:
  with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox','--disable-dev-shm-usage'])
    for width,height in [(320,760),(360,800),(390,844),(430,900),(1440,1000)]:
      page=browser.new_page(viewport={'width':width,'height':height},device_scale_factor=1)
      page.on('console', lambda msg: report['console_errors'].append(msg.text) if msg.type=='error' else None)
      page.on('pageerror', lambda exc: report['page_errors'].append(str(exc)))
      page.on('requestfailed', lambda req: report['failed_requests'].append({'url':req.url,'failure':req.failure}))
      page.set_content(html,wait_until='load')
      assert page.title() == 'BLACKED Fusion V1 — Foundation'
      assert page.locator('[data-page="home"]').is_visible()
      width_info=page.evaluate('''() => ({viewport: innerWidth, docWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth, active: document.querySelector("[data-page]:not([hidden])")?.dataset.page})''')
      width_info['width']=width
      width_info['no_horizontal_overflow']=width_info['docWidth'] <= width + 1 and width_info['bodyWidth'] <= width + 1
      report['viewport_results'].append(width_info)
      if width == 390:
        page.locator('#menuToggle').click()
        page.get_by_role('button',name='Innerwear',exact=True).click()
        assert page.locator('[data-page="innerwear"]').is_visible()
        assert page.locator('[data-page="home"]').is_hidden()
        report['interaction_results']['nav_to_innerwear']='PASS'
        page.locator('#menuToggle').click()
        page.get_by_role('button',name='Sanskari Edit',exact=True).click()
        assert page.locator('[data-page="sanskari"]').is_visible()
        assert page.get_by_text('Muslim-Inspired Collection',exact=True).is_visible()
        assert page.get_by_text('Christian-Inspired Collection',exact=True).is_visible()
        report['interaction_results']['sanskari_and_coming_soon']='PASS'
        page.locator('#menuToggle').click()
        page.get_by_role('button',name='Wellness',exact=True).click()
        assert page.locator('[data-page="wellness"]').is_visible()
        assert page.get_by_text('Virginity is not a medical diagnosis.',exact=False).count() >= 1
        report['interaction_results']['wellness_content']='PASS'
        page.locator('#menuToggle').click()
        page.get_by_role('button',name='More',exact=True).click()
        assert page.locator('[data-page="more"]').is_visible()
        assert page.locator('#checkpointText').is_visible()
        page.locator('#copyCheckpoint').click()
        assert page.locator('#copyStatus').inner_text().strip() != ''
        report['interaction_results']['notes_navigation_and_copy_fallback']='PASS'

        # Exercise all six navigation destinations and their hash/deep-link behavior.
        for target in ['home','innerwear','sanskari','boyfriend','wellness','more']:
          if page.locator('[data-page="'+target+'"]').is_hidden():
            page.locator('#menuToggle').click()
            page.locator('[data-view="'+target+'"]').click()
          assert page.locator('[data-page="'+target+'"]').is_visible(), f'navigation failed: {target}'
          assert page.locator('[data-view="'+target+'"]').get_attribute('aria-current') == 'page', f'active state failed: {target}'
        report['all_six_views_and_active_states']='PASS'
        page.evaluate("location.hash = '#boyfriend'")
        page.wait_for_function("document.querySelector('[data-page=\"boyfriend\"]')?.hidden === false")
        assert page.locator('[data-page="boyfriend"]').is_visible()
        report['hash_deep_link_navigation']='PASS'
        page.screenshot(path=str(ROOT/'qa'/'preview-mobile-390.png'),full_page=True)
      if width == 320:
        toggle=page.locator('#menuToggle')
        toggle.click()
        assert toggle.get_attribute('aria-expanded')=='true'
        assert page.locator('#primaryNav').evaluate('(el)=>getComputedStyle(el).display')!='none'
        toggle.click()
        assert toggle.get_attribute('aria-expanded')=='false'
        report['interaction_results']['mobile_menu_open_close']='PASS'
      page.close()
    browser.close()
except Exception as e:
  report['runtime_error']=f'{type(e).__name__}: {e!r}'

bad_widths=[v['width'] for v in report['viewport_results'] if not v['no_horizontal_overflow']]
report['horizontal_overflow_widths']=bad_widths
report['overall']='PASS' if not report.get('runtime_error') and len(report['viewport_results'])==5 and not bad_widths and not report['console_errors'] and not report['page_errors'] and not report['failed_requests'] and all(v=='PASS' for v in report['interaction_results'].values()) else 'FAIL'
print(json.dumps(report,indent=2))
(ROOT/'qa'/'BROWSER-SMOKE-RESULTS.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
if report['overall']!='PASS': sys.exit(1)
