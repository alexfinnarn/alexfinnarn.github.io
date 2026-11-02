// Content collections. Fields follow docs/ia/README.md ("Content types").
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// File names may start with a number prefix ("003-title.md"); the URL slug drops it.
const slugFromFile = ({ entry }: { entry: string }) =>
  entry.replace(/\.mdx?$/, '').replace(/^\d+-/, '');

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}', generateId: slugFromFile }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      topics: z.array(z.string()).default([]),
      // Published elsewhere (Medium): the index links out instead of to a page here.
      externalUrl: z.url().optional(),
      cta: z
        .object({
          heading: z.string(),
          text: z.string(),
          href: z.string(),
          action: z.string(),
        })
        .optional(),
      draft: z.boolean(),
    }),
});

// Work examples. A case study has its own page (problem, solution, result). The other kinds
// link elsewhere: an article to its page here, a project or talk to `href`. An article example
// takes its title and summary from the article unless they're given here.
const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}', generateId: slugFromFile }),
  schema: ({ image }) =>
    z.object({
      kind: z.enum(['case study', 'article', 'project', 'talk']).default('case study'),
      article: reference('writing').optional(),
      title: z.string().optional(),
      summary: z.string().optional(),
      href: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      project: z.string().optional(),
      problem: z.string().optional(),
      solution: z.string().optional(),
      result: z.string().optional(),
      // Names from src/data/skills.ts. They drive the Work filters and Home's "What I do" accordion.
      skills: z.array(z.string()).default([]),
      draft: z.boolean(),
    }),
});

export const collections = { writing, work };
