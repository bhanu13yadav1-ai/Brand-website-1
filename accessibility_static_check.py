#!/usr/bin/env python3
"""Dependency-free semantic/accessibility guardrails for the Step 1 shell."""
from pathlib import Path
from html.parser import HTMLParser
import re, sys
ROOT = Path(__file__).resolve().parents[1]
HTML = ROOT / 'index.html'

class Audit(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=[]; self.title=''; self._in_title=False; self.lang=''
        self.main_count=0; self.nav_labels=[]; self.pages=[]; self.buttons=[]
        self.fragments=[]; self.images=[]; self._button_stack=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang','')
        if 'id' in a: self.ids.append(a['id'])
        if tag=='title': self._in_title=True
        if tag=='main': self.main_count+=1
        if tag=='nav': self.nav_labels.append(a.get('aria-label','').strip())
        if tag=='section' and 'data-page' in a:
            self.pages.append({'page':a['data-page'],'labelledby':a.get('aria-labelledby','')})
        if tag=='button':
            self._button_stack.append({'id':a.get('id',''), 'aria_label':a.get('aria-label','').strip(), 'text':''})
        if tag=='a':
            href=a.get('href','')
            if href.startswith('#') and len(href)>1: self.fragments.append(href[1:])
        if tag=='img': self.images.append({'alt':a.get('alt'), 'src':a.get('src','')})
    def handle_data(self, data):
        if self._in_title: self.title += data
        if self._button_stack: self._button_stack[-1]['text'] += data
    def handle_endtag(self, tag):
        if tag=='title': self._in_title=False
        if tag=='button' and self._button_stack:
            b=self._button_stack.pop(); b['text']=re.sub(r'\s+',' ',b['text']).strip(); self.buttons.append(b)

errors=[]
source=HTML.read_text(encoding='utf-8') if HTML.exists() else ''
a=Audit()
try: a.feed(source); a.close()
except Exception as e: errors.append(f'HTML parser error: {e}')
if not a.lang: errors.append('html lang attribute missing')
if not a.title.strip(): errors.append('document title missing')
if a.main_count != 1: errors.append(f'expected one main landmark, found {a.main_count}')
if not any(x for x in a.nav_labels): errors.append('no navigation landmark has an accessible name')
if len(a.ids)!=len(set(a.ids)): errors.append('duplicate IDs detected')
ids=set(a.ids)
for p in a.pages:
    if not p['labelledby']: errors.append(f"page '{p['page']}' missing aria-labelledby")
    elif p['labelledby'] not in ids: errors.append(f"page '{p['page']}' labels missing ID '{p['labelledby']}'")
for b in a.buttons:
    if not (b['aria_label'] or b['text']): errors.append(f"button '{b['id'] or '(no id)'}' lacks an accessible name")
for frag in a.fragments:
    if frag not in ids: errors.append(f"fragment link '#{frag}' has no matching ID")
for img in a.images:
    if img['alt'] is None: errors.append(f"image '{img['src']}' missing alt attribute")
print('BLACKED V1 — STATIC ACCESSIBILITY GUARDRAILS')
print(f'Language: {a.lang or "MISSING"} | title: {a.title.strip()!r} | main landmarks: {a.main_count}')
print(f'Named navs: {sum(bool(x) for x in a.nav_labels)} | pages labelled: {sum(bool(p["labelledby"]) for p in a.pages)}/{len(a.pages)} | buttons reviewed: {len(a.buttons)} | images: {len(a.images)}')
if errors:
    print(f'RESULT: FAIL ({len(errors)} issue(s))')
    for e in errors: print('- '+e)
    sys.exit(1)
print('RESULT: PASS — static semantic checks only; not a full WCAG audit or screen-reader/device test.')
