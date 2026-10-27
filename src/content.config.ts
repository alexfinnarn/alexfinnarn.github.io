// Content collections. Fields follow docs/ia/README.md ("Content types").
import { defineCollection, z } from 'astro:content';
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

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}', generateId: slugFromFile }),
  schema: z.object({
    title: z.string(),
    project: z.string().optional(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    skills: z.array(z.string()).default([]),
    draft: z.boolean(),
  }),
});

export const collections = { writing, work };
