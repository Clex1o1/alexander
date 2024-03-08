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
  app: {
    head: {
      // meta: [{ name: "robots", content: "noindex, nofollow" }],
      titleTemplate: "%s - The Great",
      htmlAttrs: {
        lang: "en",
      },
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
});
