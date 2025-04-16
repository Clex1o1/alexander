import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'
import { asOgImageCollection } from 'nuxt-og-image/content'

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
    content: defineCollection(asSitemapCollection({
      type: 'page',
      source: '**/*.md',
    })),
    ogImage: defineCollection(
      asOgImageCollection({
        type: 'page',
        source: '**/*.md',
      }),
    ),
  }
})
