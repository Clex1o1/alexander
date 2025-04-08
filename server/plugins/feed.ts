import type { Feed } from "feed"
import { queryCollection } from '#imports'
import { createEvent } from 'h3'

export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook("feed:generate", async ({ feed, options }) => {
        // Set feed options
        feed.options = {
            id: "https://www.the-great.dev",
            title: "the-great.dev",
            link: "https://www.the-great.dev",
            description: "Hi! I'm Alexander, a passionate full-stack developer from Germany, and this is my journey.",
            copyright: "© 2025 Alexander Classen",
            image: "https://www.the-great.dev/__og-image__/image/og.png",
            favicon: "https://www.the-great.dev/favicon.ico",
            author: {
                name: "Alexander Classen",
                email: "alexander@the-great.dev",
                link: "https://www.the-great.dev"
            },
            updated: new Date(),
            feedLinks: {
                json: "https://www.the-great.dev/feed.json",
                atom: "https://www.the-great.dev/feed.atom",
                rss: "https://www.the-great.dev/feed.xml"
            },
            language: "en",
            generator: "Feed for Node.js"
        }

        // Fetch blog posts
        const event = createEvent({} as any, {} as any)
        const posts = await queryCollection(event, 'blog').all()

        // Add posts to feed
        posts.forEach((post: any) => {
            feed.addItem({
                title: post.title || 'Untitled',
                id: `https://www.the-great.dev${post.path}`,
                link: `https://www.the-great.dev${post.path}`,
                description: post.description || post.excerpt || '',
                content: post.body || '',
                date: post.date ? new Date(post.date) : new Date(),
                author: [{
                    name: "Alexander Classen",
                    email: "alexander@the-great.dev",
                    link: "https://www.the-great.dev"
                }],
                image: post.image || feed.options.image,
                category: post.tags ? post.tags.map((tag: string) => ({ name: tag })) : [],
                published: post.date ? new Date(post.date) : new Date(),
                guid: `https://www.the-great.dev${post.path}`,
                enclosure: post.image ? {
                    url: post.image,
                    type: 'image/jpeg'
                } : undefined
            })
        })
    })
})