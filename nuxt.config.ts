// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === "development" },
  debug: process.env.NODE_ENV === "development",

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxthq/studio",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "nuxt-og-image",
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
    content: {
      feed: {
        defaults: {
          author: {
            email: "alexander@the-great.dev",
            name: "Alexander Classen",
          },
          title: "the-graet.dev",
          link: "https://www.the-great.dev",
          favicon: "https://www.the-great.dev/favicon.ico",
          image: "https://www.the-great.dev/__og-image__/image/og.png",
          description:
            "Hi! I'm Alexander, a passionate full-stack developer from Germany, and this is my journey. The journey starts now. Fasten your seat belts and enjoy the ride!",
        },
      },
      item: {
        templateRoots: ["content", "blog"],

        defaults: {
          author: [
            {
              email: "alexander@the-great.dev",
              name: "Alexander Classen",
            },
          ],
        },
        mapping: [
          ["link", "_path"],
          ["date", "date", (value) => (value ? new Date(value) : value)],
          ["image", "https://www.the-great.dev/__og-image__/image/og.png"],
        ],
      },
    },
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

  compatibilityDate: "2025-03-23",
  routeRules: {
    "/blog/2025-04-04-lets-leadership-as-a-feeling": {
      redirect: {
        to: "/blog/2025-04-04-leadership-as-a-feeling",
        statusCode: 301,
      },
    },
  },
});
