#!/usr/bin/env python3
"""Release guard tests for BLACKED V1 Step 3.3 collection expansion."""
from pathlib import Path
import csv, hashlib, json, re, unittest
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]

class Step3ReleaseTests(unittest.TestCase):
    def test_root_resources_are_versioned_and_flat(self):
        html=(ROOT/'index.html').read_text(encoding='utf-8')
        for pattern in [r'href="\./styles\.css\?v=step3-3"',r'src="\./catalog\.js\?v=step3-3"',r'src="\./app\.js\?v=step3-3"']:
            self.assertRegex(html,pattern)
        for path in ['index.html','styles.css','catalog.js','app.js','sw.js','manifest.webmanifest']:
            self.assertTrue((ROOT/path).is_file(),path)

    def test_service_worker_isolated_and_updated(self):
        sw=(ROOT/'sw.js').read_text(encoding='utf-8')
        self.assertIn('blacked-fusion-v1-step3-3',sw)
        self.assertIn('blacked-fusion-v1-step3-2',sw)
        self.assertIn('blacked-fusion-v4.1',sw)
        self.assertIn('cache.match(event.request)',sw)
        for img in ['muslim-tradition-outside-desire-inside.webp','muslim-elegance-begins-within.webp','christian-grace-has-never-looked-so-bold.webp','sanskari-outside-dangerous-new.webp','sanskari-outside-bold-within.webp']:
            self.assertIn(img,sw)

    def test_previous_muslim_original_hash_is_preserved(self):
        img=ROOT/'assets/supplied/muslim-collection-four-panel-original.png'
        report=json.loads((ROOT/'qa/STEP3-ASSET-RESULTS.json').read_text(encoding='utf-8'))
        expected=report['original_source']['sha256']
        self.assertEqual(hashlib.sha256(img.read_bytes()).hexdigest(),expected)
        self.assertTrue(report['original_source']['preserved_byte_for_byte'])

    def test_import_map_has_consistent_csv_shape(self):
        with (ROOT/'assets/ASSET-IMPORT-MAP.csv').open(newline='',encoding='utf-8') as f: rows=list(csv.reader(f))
        self.assertTrue(rows); width=len(rows[0])
        self.assertTrue(all(len(row)==width for row in rows),f'row widths: {sorted(set(map(len,rows)))}')

    def test_all_six_muslim_cards_are_mapped_to_local_assets(self):
        catalog=(ROOT/'catalog.js').read_text(encoding='utf-8')
        names=['muslim-shaam-e-noor.webp','muslim-shaam-ki-roshni.webp','muslim-noor-ka-nasha.webp','muslim-shaam-se-raat-tak.webp','muslim-tradition-outside-desire-inside.webp','muslim-elegance-begins-within.webp']
        for name in names:
            path=ROOT/'assets'/'muslim-collection'/name
            self.assertTrue(path.is_file(),name); self.assertIn(name,catalog)
            with Image.open(path) as im: im.verify()
        self.assertEqual(len(re.findall(r"\{id:'muslim-noor-",catalog)),6)

    def test_christian_and_sanskari_collections_are_wired(self):
        catalog=(ROOT/'catalog.js').read_text(encoding='utf-8')
        app=(ROOT/'app.js').read_text(encoding='utf-8')
        html=(ROOT/'index.html').read_text(encoding='utf-8')
        self.assertIn('christianCollection',catalog)
        self.assertIn("renderGallery(C.christianCollection,'christianGrid'",app)
        self.assertIn("type === 'christian' ? C.christianCollection",app)
        self.assertIn('id="christianGrid"',html)
        sanskari_block=catalog.split('const sanskari = [',1)[1].split('const muslimCollection = [',1)[0]
        self.assertEqual(sanskari_block.count('{id:'),12)
        for rel in ['assets/christian-collection/christian-grace-has-never-looked-so-bold.webp','assets/sanskari-collection/sanskari-outside-dangerous-new.webp','assets/sanskari-collection/sanskari-outside-bold-within.webp']:
            f=ROOT/rel; self.assertTrue(f.is_file(),rel)
            with Image.open(f) as im: im.verify()

    def test_five_uploaded_source_originals_are_hash_recorded_and_preserved(self):
        reg=json.loads((ROOT/'assets/registry/STEP3-3-LOCAL-COLLECTION-ASSETS.json').read_text(encoding='utf-8'))
        self.assertEqual(len(reg['new_assets']),5)
        for rec in reg['new_assets']:
            p=ROOT/rec['original_path']; self.assertTrue(p.is_file(),rec['original_path'])
            self.assertEqual(hashlib.sha256(p.read_bytes()).hexdigest(),rec['original_sha256'])
            self.assertTrue(rec['preserved_original_byte_for_byte'])
            self.assertTrue((ROOT/rec['webp_path']).is_file())

    def test_reuploaded_muslim_sources_are_marked_as_duplicates(self):
        reg=json.loads((ROOT/'assets/registry/STEP3-3-LOCAL-COLLECTION-ASSETS.json').read_text(encoding='utf-8'))
        dup=reg['input_duplicate_analysis']
        self.assertEqual(len(dup),5)
        self.assertIn('byte-for-byte',dup['1000201195.png'])

if __name__=='__main__': unittest.main(verbosity=2)
