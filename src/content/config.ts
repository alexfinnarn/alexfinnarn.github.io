// content/config.ts
import { defineCollection, z } from 'astro:content';

// Define a schema for your writing collection
const writingCollection = defineCollection({
  type: 'content',
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