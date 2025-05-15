// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro.build',
  base: '/',
  output: 'static',
  srcDir: './src',
  publicDir: './public',
  compressHTML: false,
  scopedStyleStrategy: 'where',
  integrations: [mdx(),
    react({
      experimentalReactChildren: true,
    })
  ],
});