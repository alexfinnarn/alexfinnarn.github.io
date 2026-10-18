// @ts-check
import { defineConfig } from 'astro/config';

/**
 * Adds /styleguide while running `npm run dev`. It is never part of a production build.
 * @type {import('astro').AstroIntegration}
 */
const styleguide = {
  name: 'styleguide',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') {
        injectRoute({ pattern: '/styleguide', entrypoint: './src/styleguide/Styleguide.astro' });
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alexfinnarn.github.io',
  output: 'static',
  integrations: [styleguide],
  // Old URLs from the previous site, pointed at their closest replacement.
  redirects: {
    '/projects': '/work',
    '/projects/shipping-container': '/work',
    '/tags': '/writing',
    '/fractal': '/',
  },
});
