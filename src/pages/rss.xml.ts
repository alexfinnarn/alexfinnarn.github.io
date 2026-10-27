import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getArticles, articleHref } from '../lib/content';
import { site } from '../site';

export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: `${site.name}: Writing`,
    description: `Articles by ${site.name}, ${site.role}.`,
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedDate,
      link: articleHref(article),
      categories: article.data.topics,
    })),
  });
}
