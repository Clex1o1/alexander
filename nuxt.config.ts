// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === "development" },
  debug: process.env.NODE_ENV === "development",

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/seo",
    "@nuxt/content",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "nuxt-gtag",
    "@nuxt/image",
    "nuxt-icons",
    "@nuxtjs/supabase",
    "@stefanobartoletti/nuxt-social-share",
    "@nuxtjs/mdc",
    "nuxt-tiptap-editor",
    "nuxt-feedme",
  ],

  runtimeConfig: {
    // private
    public: {
      // public
    },
  },

  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: "github-dark",
        },
      },
    },
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  feedme: {
    feeds: {
      '/feed.xml': {}, // Simple RSS feed
      '/feed.atom': {}, // Simple Atom feed
    },
    defaults: {
      rss: {
        title: "the-great.dev",
        link: "https://www.the-great.dev",
        favicon: "https://www.the-great.dev/favicon.ico",
        image: "https://www.the-great.dev/__og-image__/image/og.png",
        description: "Hi! I'm Alexander, a passionate full-stack developer from Germany, and this is my journey.",
        author: {
          email: "alexander@the-great.dev",
          name: "Alexander Classen"
        }
      },
      content: {
        collections: ['blog'], // This matches your content.config.ts collection
        mapping: [
          ['link', '_path'],
          ['title', 'title'],
          ['date', 'date']
        ]
      }
    }
  },
  app: {
    head: {
      // meta: [{ name: "robots", content: "noindex, nofollow" }],
      titleTemplate: "%s - The Great",
      htmlAttrs: {
        lang: "en",
      },
      title: "the-great.dev",
    },

    pageTransition: { name: "zapp-out", mode: "out-in" },
    layoutTransition: { name: "zapp-out", mode: "out-in" },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },

  site: {
    // production URL
    url: "https://www.the-great.dev",
    name: "Alexander - The Great",
  },

  ogImage: {
    fonts: [
      {
        name: "IBM Plex Sans",
        weight: 400,
        // path must point to a public font file
        path: "/fonts/IBMPlexSans-Medium.ttf",
      },
      {
        name: "Modenine",
        weight: 400,
        // path must point to a public font file
        path: "/fonts/ModeNine.ttf",
      },
    ],
  },

  gtag: {
    enabled: false,
  },

  supabase: {
    redirect: false,
  },
  routeRules: {
    "/blog/2025-04-04-lets-leadership-as-a-feeling": {
      redirect: {
        to: "/blog/2025-04-04-leadership-as-a-feeling",
        statusCode: 301,
      },
    },
  },

  compatibilityDate: "2025-04-06",
});