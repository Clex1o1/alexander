import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      // Load every file inside the `content` directory
      source: 'blog/**',
      // Specify the type of content in this collection
      type: 'page',
      schema: z.object({
        title: z.string(),
        date: z.string(),
      }),
    }),
    pages: defineCollection({
      source: '*',
      type: 'page',
      schema: z.object({
        title: z.string(),
      }),
    }),

  }
})
