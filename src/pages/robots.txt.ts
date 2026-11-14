import type { APIContext } from 'astro';

// Every crawler, AI crawlers included, may read the whole site. The sitemap line tells them
// where the list of pages is.
export function GET({ site }: APIContext) {
  const sitemap = new URL('/sitemap-index.xml', site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
