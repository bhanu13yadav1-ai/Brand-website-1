#!/usr/bin/env python3
"""Serve the exact Step 3.3 package locally and verify root-entry/asset URLs."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.request import urlopen
import json
ROOT = Path(__file__).resolve().parents[1]
PATHS = [
    'index.html',
    'styles.css?v=step3-3',
    'catalog.js?v=step3-3',
    'app.js?v=step3-3',
    'sw.js',
    'manifest.webmanifest',
    'assets/blacked-icon.svg',
    'assets/supplied/muslim-collection-four-panel-original.png',
    'assets/muslim-collection/muslim-shaam-e-noor.webp',
    'assets/muslim-collection/muslim-shaam-ki-roshni.webp',
    'assets/muslim-collection/muslim-noor-ka-nasha.webp',
    'assets/muslim-collection/muslim-shaam-se-raat-tak.webp',
    'assets/muslim-collection/muslim-tradition-outside-desire-inside.webp',
    'assets/muslim-collection/muslim-elegance-begins-within.webp',
    'assets/christian-collection/christian-grace-has-never-looked-so-bold.webp',
    'assets/sanskari-collection/sanskari-outside-dangerous-new.webp',
    'assets/sanskari-collection/sanskari-outside-bold-within.webp',
    'assets/supplied/collection-additions/1000200454(2).jpg',
    'assets/supplied/collection-additions/1000200455(3).jpg',
    'assets/supplied/collection-additions/1000200453(2).png',
    'assets/supplied/collection-additions/1000200456(2).jpg',
    'assets/supplied/collection-additions/1000200479.png',
]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
server.daemon_threads = True
thread = Thread(target=server.serve_forever, daemon=True)
thread.start()
base = f'http://127.0.0.1:{server.server_address[1]}/'
results = []
try:
    for path in PATHS:
        try:
            with urlopen(base + path, timeout=5) as r:
                body = r.read()
                results.append({'path': path, 'status': r.status, 'bytes': len(body), 'content_type': r.headers.get('Content-Type','')})
        except Exception as e:
            results.append({'path': path, 'status': 'ERROR', 'error': str(e)})
finally:
    # Daemon test server is short-lived; closing the listening socket avoids shutdown
    # deadlocks in locked-down notebook runners. The child server thread is daemonized.
    server.server_close()
report = {
    'scope': 'Local Python HTTP server; validates package-root routing and bundled user images only. Does not test public GitHub Pages or remote historical image URLs.',
    'base': base,
    'results': results,
    'expected_count': len(PATHS),
    'passed_count': sum(x.get('status') == 200 for x in results),
    'overall': 'PASS' if all(x.get('status') == 200 for x in results) else 'FAIL'
}
(ROOT/'qa'/'STEP3-LOCAL-HTTP-RESULTS.json').write_text(json.dumps(report, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')
(ROOT/'qa'/'STEP3-LOCAL-HTTP-RUN.txt').write_text(f"Local Python HTTP server: {report['overall']}\n{report['passed_count']}/{report['expected_count']} root entry files, original uploaded collection images and optimized gallery assets returned HTTP 200. This does not test GitHub Pages or remote historical image URLs.\nSee STEP3-LOCAL-HTTP-RESULTS.json.\n", encoding='utf-8')
print(json.dumps({'overall':report['overall'],'passed':report['passed_count'],'expected':report['expected_count'],'results':results}, indent=2, ensure_ascii=False))
raise SystemExit(0 if report['overall']=='PASS' else 1)
