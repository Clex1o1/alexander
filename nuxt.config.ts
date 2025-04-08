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
    "nuxt-module-feed",
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
  feed: {
    sources: [
      {
        path: '/feed.xml',
        type: 'rss2',
        cacheTime: 60 * 15 // 15 minutes
      },
      {
        path: '/feed.atom',
        type: 'atom1',
        cacheTime: 60 * 15
      },
      {
        path: '/feed.json',
        type: 'json1',
        cacheTime: 60 * 15
      }
    ]
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