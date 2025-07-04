// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://lecodeetmoi.github.io/Germain/',
  base: '/Germain/',
  integrations: [
    react(),
    mdx(),
    sitemap()
  ]
});
