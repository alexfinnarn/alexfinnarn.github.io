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
    // 2025 posts: the ones copied over keep their content at a new address; the rest go to /writing.
    '/writing/003-cms-first-principles': '/writing/cms-first-principles/',
    '/writing/006-prompts-are-tickets': '/writing/prompts-are-tickets/',
    '/writing/011-cms-intent-over-implementation': '/writing/cms-intent-over-implementation/',
    '/writing/012-cms-content-complexity': '/writing/cms-content-complexity/',
    '/writing/001-container-windows': '/writing/',
    '/writing/008-ai-drupal-not': '/writing/',
    '/writing/009-ai-will-take-your-job': '/writing/',
    '/writing/010-cms-can-fail-you-succeed': '/writing/',
    '/writing/013-limit-playwright-tokens': '/writing/',
    '/writing/014-workflow-to-code': '/writing/',
  },
});
