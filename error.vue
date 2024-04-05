<script setup lang="ts">
import type { NuxtError } from "#app";
definePageMeta({
  layout: "hero",
  layoutTransition: {
    name: "fly",
    mode: "out-in",
  },
  title: "404 - Not Found",
});
useHead({
  title: "404 - Not Found",
  meta: [
    {
      name: "description",
      content:
        "The page you were looking for was not found. Please check the URL and try again.",
    },
  ],
});
defineOgImageComponent("custom");

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="error">
    <div class="grid place-content-center container relative z-10">
      <section class="flex flex-col items-center justify-center h-screen">
        <h2 class="text-2xl md:text-4xl text-amber-400 headline">Game over</h2>
        <h1 class="text-7xl md:text-9xl text-amber-400 headline">
          {{ error.statusCode }}
        </h1>
        <base-button @click="handleError">restart</base-button>
      </section>
    </div>
  </div>
</template>
