// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

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

/**
 * Wraps every Markdown table in a box that scrolls sideways, so a wide table can be read on a
 * phone instead of being cut off at the screen edge. The box takes keyboard focus so it can be
 * scrolled with the arrow keys. Styled as .table-scroll in global.css.
 * @type {import('satteri').HastPluginDefinition}
 */
const scrollableTables = {
  name: 'scrollable-tables',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.wrapNode(node, { raw: '<div class="table-scroll" tabindex="0" role="region" aria-label="Table"></div>' });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alexfinnarn.github.io',
  output: 'static',
  // The sitemap lists every built page; redirects and the 404 page are left out.
  integrations: [styleguide, sitemap()],
  markdown: { processor: satteri({ hastPlugins: [scrollableTables] }) },
  // Old URLs from the previous site, pointed at their closest replacement.
  // While Work is not built (see src/site.ts), its old URLs go to Home. Point them back at
  // '/work' when the page returns.
  redirects: {
    '/projects': '/',
    // Consulting merged into Work (2026-11-01).
    '/consulting': '/',
    '/projects/shipping-container': '/',
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
