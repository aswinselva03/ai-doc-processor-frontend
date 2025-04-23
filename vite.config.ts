import { defineConfig, normalizePath  } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path';
import { createRequire } from 'node:module';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);
const cMapsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
);
const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'),
);



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),  viteStaticCopy({
    targets: [
      { src: cMapsDir, dest: '' },
      { src: standardFontsDir, dest: '' },
    ],
  }),],
})
