// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Adds /styleguide and the /lab/ pages while running `npm run dev`. They are never part of a
 * production build.
 * @type {import('astro').AstroIntegration}
 */
const styleguide = {
  name: 'styleguide',
  hooks: {
    'astro:config:setup': ({ command, injectRoute }) => {
      if (command === 'dev') {
        injectRoute({ pattern: '/styleguide', entrypoint: './src/styleguide/Styleguide.astro' });
        // Eye-test labs go here while a round runs (src/lab/README.md).
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alexfinnarn.github.io',
  output: 'static',
  // The sitemap lists every built page; redirects and the 404 page are left out.
  integrations: [styleguide, sitemap()],
  // Old URLs from the previous site, pointed at their closest replacement.
  redirects: {
    '/projects': '/work',
    // Consulting merged into Work (2026-11-01).
    '/consulting': '/work',
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
