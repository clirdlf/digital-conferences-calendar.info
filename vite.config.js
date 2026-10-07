import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));
const escapeAttribute = (value) => value.replace(/[&"<>]/g, (character) => ({
  '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;'
})[character]);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, projectRoot, 'GOOGLE_CALENDAR_API_KEY');
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY ?? env.GOOGLE_CALENDAR_API_KEY ?? '';

  return {
    root: 'src',
    base: './',
    envDir: projectRoot,
    publicDir: '../public',
    server: { port: 8080 },
    build: { outDir: '../docs', emptyOutDir: true },
    plugins: [tailwindcss(), {
      name: 'calendar-site',
      transformIndexHtml(html) {
        return html.replace('__CALENDAR_API_KEY__', escapeAttribute(apiKey));
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'CNAME',
          source: readFileSync(new URL('./CNAME', import.meta.url), 'utf8').trim() + '\n'
        });
        this.emitFile({ type: 'asset', fileName: '.nojekyll', source: '' });
      }
    }]
  };
});
