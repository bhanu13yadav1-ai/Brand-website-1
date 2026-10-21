#!/usr/bin/env python3
"""Dependency-free static checks for the BLACKED V1 Step 1 foundation."""
from pathlib import Path
from html.parser import HTMLParser
import re, sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILE = ROOT / 'index.html'
CSS_FILE = ROOT / 'css' / 'styles.css'
JS_FILE = ROOT / 'js' / 'app.js'

class Checker(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.nav_views = []
        self.page_views = []
        self.go_views = []
        self.local_resources = []
        self.anchor_hrefs = []
        self.has_main = False
        self.buttons_without_type = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'main': self.has_main = True
        if 'data-view' in a: self.nav_views.append(a['data-view'])
        if 'data-page' in a: self.page_views.append(a['data-page'])
        if 'data-go' in a: self.go_views.append(a['data-go'])
        for key in ('src', 'href'):
            value = a.get(key)
            if value and not re.match(r'^(?:https?:|mailto:|tel:|data:|blob:|#|//)', value, re.I):
                clean = value.split('#',1)[0].split('?',1)[0]
                if clean: self.local_resources.append((tag,key,clean))
        if tag == 'button' and 'type' not in a:
            self.buttons_without_type.append(a.get('id') or a.get('data-view') or '(unnamed button)')

errors=[]
if not HTML_FILE.exists(): errors.append('index.html missing')
if not CSS_FILE.exists(): errors.append('css/styles.css missing')
if not JS_FILE.exists(): errors.append('js/app.js missing')

parser=Checker()
try:
    parser.feed(HTML_FILE.read_text(encoding='utf-8'))
    parser.close()
except Exception as exc:
    errors.append(f'HTML parse failed: {exc}')

if len(parser.ids) != len(set(parser.ids)):
    dup=sorted({x for x in parser.ids if parser.ids.count(x)>1})
    errors.append('duplicate HTML IDs: '+', '.join(dup))
if not parser.has_main: errors.append('semantic main element missing')
if len(parser.page_views) != len(set(parser.page_views)): errors.append('duplicate data-page names')
missing_nav=set(parser.nav_views)-set(parser.page_views)
if missing_nav: errors.append('nav has targets with no page: '+', '.join(sorted(missing_nav)))
missing_go=set(parser.go_views)-set(parser.page_views)
if missing_go: errors.append('data-go targets with no page: '+', '.join(sorted(missing_go)))
for tag,key,path in parser.local_resources:
    # Ignore in-page anchors and empty hrefs already filtered by parser.
    file=(ROOT / path).resolve()
    try: file.relative_to(ROOT.resolve())
    except ValueError:
        errors.append(f'local resource escapes package root: {path}')
        continue
    # HTML fragments point to doc files; image/file paths not yet included must never be referenced in HTML.
    if not file.exists(): errors.append(f'broken local {key} path in <{tag}>: {path}')
if parser.buttons_without_type: errors.append('buttons without type= attribute: '+', '.join(parser.buttons_without_type))
css=CSS_FILE.read_text(encoding='utf-8') if CSS_FILE.exists() else ''
js=JS_FILE.read_text(encoding='utf-8') if JS_FILE.exists() else ''
master=(ROOT/'docs'/'MASTER-MEMORY-NOTES.md').read_text(encoding='utf-8') if (ROOT/'docs'/'MASTER-MEMORY-NOTES.md').exists() else ''
for expected in ('@media(max-width:640px)','prefers-reduced-motion','focus-visible'):
    if expected not in css: errors.append(f'CSS accessibility/responsive hook missing: {expected}')
for expected in ('activateView','hashchange','copyCheckpoint','menuToggle'):
    if expected not in js: errors.append(f'Expected interaction handler absent: {expected}')
for rule in range(1,15):
    if f'RULE {rule} ' not in master: errors.append(f'master memory note is missing RULE {rule}')

print('BLACKED V1 STEP 1 — STATIC CHECK')
print(f'HTML: parsed | IDs: {len(parser.ids)} | nav views: {len(parser.nav_views)} | page views: {len(parser.page_views)}')
print(f'Local resources checked: {len(parser.local_resources)}')
print('CSS: responsive breakpoint, reduced-motion, visible focus checks included')
print('JS: navigation, hash routing and checkpoint-copy control presence checked')
if errors:
    print(f'RESULT: FAIL ({len(errors)} issue(s))')
    for error in errors: print('- '+error)
    sys.exit(1)
print('RESULT: PASS — package static consistency checks only; not a browser/device or feature-integration test.')
