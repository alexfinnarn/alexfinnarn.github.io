// Queries shared by pages. Drafts show in dev and are left out of production builds.
import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { skills } from '../data/skills';

export type Article = CollectionEntry<'writing'>;
export type CaseStudyEntry = CollectionEntry<'work'>;

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

/** Articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('writing', visible);
  return articles.sort((a, b) => b.data.publishedDate.getTime() - a.data.publishedDate.getTime());
}

/** Case studies only: the work entries that get their own page. */
export async function getCaseStudies(): Promise<CaseStudyEntry[]> {
  return getCollection('work', (entry) => visible(entry) && entry.data.kind === 'case study');
}

/** A work entry of any kind, with an article's title, summary and link filled in. */
export interface WorkExample {
  id: string;
  kind: CaseStudyEntry['data']['kind'];
  title: string;
  summary: string;
  href: string;
  image?: ImageMetadata;
  imageAlt?: string;
  skills: string[];
}

/** Every work example, case studies first, then newest article first. */
export async function getWorkExamples(): Promise<WorkExample[]> {
  const entries = await getCollection('work', visible);
  const articles = await getArticles();
  const examples = entries.map(({ id, data }): WorkExample => {
    const article = data.article && articles.find((a) => a.id === data.article?.id);
    if (data.article && !article) throw new Error(`Work entry "${id}" points at a missing article.`);
    const unknown = data.skills.filter((name) => !skills.some((skill) => skill.title === name));
    if (unknown.length) throw new Error(`Work entry "${id}" has skills not in src/data/skills.ts: ${unknown.join(', ')}`);
    return {
      id,
      kind: data.kind,
      title: data.title ?? article?.data.title ?? id,
      summary: data.summary ?? article?.data.description ?? '',
      href: data.kind === 'case study' ? `/work/${id}/` : (data.href ?? (article ? articleHref(article) : '/work/')),
      image: data.image ?? article?.data.image,
      imageAlt: data.imageAlt ?? article?.data.imageAlt,
      skills: data.skills,
    };
  });
  const rank = (e: WorkExample) =>
    e.kind === 'case study' ? Number.MAX_SAFE_INTEGER : (articles.find((a) => articleHref(a) === e.href)?.data.publishedDate.getTime() ?? 0);
  return examples.sort((a, b) => rank(b) - rank(a));
}

/** Where an article's list item links: its page here, or Medium. */
export const articleHref = (article: Article) => article.data.externalUrl ?? `/writing/${article.id}/`;

export const topicSlug = (topic: string) => topic.toLowerCase().replace(/[^a-z0-9]+/g, '-');

/** The skills that have at least one work example, in the order of src/data/skills.ts. */
export function getSkillsWithWork(examples: WorkExample[]) {
  return skills
    .filter((skill) => examples.some((e) => e.skills.includes(skill.title)))
    .map((skill) => ({ ...skill, name: skill.title, slug: topicSlug(skill.title) }));
}

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

/** A stand-in image at the size a slot needs, until a work example has its own. */
export const placeholderImage = (width: number, height: number) =>
  `https://placehold.co/${width}x${height}/efe3c9/5c5245/webp`;

/** One slide per skill with work, each showing a different example where there are enough. */
export function getSkillSlides(examples: WorkExample[]) {
  const used = new Set<string>();
  return getSkillsWithWork(examples).map((skill) => {
    const tagged = examples.filter((e) => e.skills.includes(skill.title));
    const example = tagged.find((e) => !used.has(e.id)) ?? tagged[0];
    used.add(example.id);
    return { skill: skill.title, href: `/work/skills/${skill.slug}/`, example };
  });
}

/** What a work example's link says, by kind. */
export const workLinkText: Record<WorkExample['kind'], string> = {
  'case study': 'Read the case study',
  article: 'Read the article',
  project: 'See the project',
  talk: 'Watch the talk',
};
