// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define a schema for your writing collection
const writingCollection = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedDate: z.string().optional(),
    startDate: z.string().optional(),
    updatedDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

// Export collections to register them
export const collections = {
  'writing': writingCollection,
};
