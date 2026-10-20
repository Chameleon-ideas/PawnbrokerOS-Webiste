// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pawnbrokeros.com',
  compressHTML: true,
  build: { inlineStylesheets: 'auto' },
});
