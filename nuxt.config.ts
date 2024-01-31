// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  runtimeConfig: {
    mailjet: {
      apiKey: process.env.MAILJET_API_KEY,
      apiSecret: process.env.MAILJET_API_SECRET,
    },
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
      mailjetApi: process.env.MAILJET_API,
    },
  },
  content: {},
  app: {
    head: {
      // meta: [{ name: "robots", content: "noindex, nofollow" }],
      titleTemplate: "%s - The Great",
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
