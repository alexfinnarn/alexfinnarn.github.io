// Queries shared by pages. Drafts show in dev and are left out of production builds.
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'writing'>;
export type CaseStudyEntry = CollectionEntry<'work'>;

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

/** Articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('writing', visible);
  return articles.sort((a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime());
}

export async function getCaseStudies(): Promise<CaseStudyEntry[]> {
  return getCollection('work', visible);
}

/** Where an article's list item links: its page here, or Medium. */
export const articleHref = (article: Article) => article.data.externalUrl ?? `/writing/${article.id}/`;

export const topicSlug = (topic: string) => topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** Every topic used by an article, sorted, with its slug. */
export function getTopics(articles: Article[]) {
  const names = [...new Set(articles.flatMap((a) => a.data.topics))].sort((a, b) => a.localeCompare(b));
  return names.map((name) => ({ name, slug: topicSlug(name) }));
}

/** Minutes to read, at about 230 words a minute. */
export function readingMinutes(body = ''): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
