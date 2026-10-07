import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { loadEnv } from 'vite';
import configure from '../vite.config.js';

test('calendar key uses shell override and escapes HTML attributes', (t) => {
  const previous = process.env.GOOGLE_CALENDAR_API_KEY;
  t.after(() => {
    if (previous === undefined) delete process.env.GOOGLE_CALENDAR_API_KEY;
    else process.env.GOOGLE_CALENDAR_API_KEY = previous;
  });
  process.env.GOOGLE_CALENDAR_API_KEY = 'shell&"<>key';
  const config = configure({ mode: 'production' });
  assert.equal(config.plugins.find(plugin => plugin.name === 'calendar-site').transformIndexHtml('<meta content="__CALENDAR_API_KEY__">'),
    '<meta content="shell&amp;&quot;&lt;&gt;key">');

  delete process.env.GOOGLE_CALENDAR_API_KEY;
  const root = new URL('../', import.meta.url).pathname;
  const fileKey = loadEnv('production', root, 'GOOGLE_CALENDAR_API_KEY').GOOGLE_CALENDAR_API_KEY ?? '';
  const fromFile = configure({ mode: 'production' });
  const escaped = fileKey.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  assert.ok(fromFile.plugins.find(plugin => plugin.name === 'calendar-site').transformIndexHtml('__CALENDAR_API_KEY__') === escaped);
});

test('build emits domain and GitHub Pages markers and replaces stale output', () => {
  const config = configure({ mode: 'production' });
  assert.equal(config.build.outDir, '../dist');
  assert.equal(config.build.emptyOutDir, true);
  const assets = [];
  config.plugins.find(plugin => plugin.name === 'calendar-site').generateBundle.call({ emitFile: (asset) => assets.push(asset) });
  assert.deepEqual(assets, [
    { type: 'asset', fileName: 'CNAME', source: readFileSync(new URL('../CNAME', import.meta.url), 'utf8').trim() + '\n' },
    { type: 'asset', fileName: '.nojekyll', source: '' }
  ]);
});
