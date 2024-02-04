// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/content",
    "@nuxthq/studio",
    "nuxt-icon",
    "@vueuse/nuxt",
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
  nitro: {
    storage: {
      keys: {
        driver: "fs",
        base: "./.data/keys",
      },
      list: {
        driver: "fs",
        base: "./.data/list",
      },
    },
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
});
