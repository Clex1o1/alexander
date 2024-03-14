// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxthq/studio",
    "nuxt-icon",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "nuxt-gtag",
    "@nuxt/image",
    "nuxt-feedme",
    "nuxt-icons",
    "@nuxtjs/supabase",
  ],
  runtimeConfig: {
    // private
    public: {
      // public
    },
  },

  content: {
    highlight: {
      theme: "github-dark",
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
            "Hi! I'm Alexander Classen, a passionate full-stack developer from Germany, and this is my journey. The journey starts now. Fasten your seat belts and enjoy the ride!",
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
          ["date", "date"],
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
    initialConsent: false,
  },
  supabase: {
    redirect: false,
  },
});
