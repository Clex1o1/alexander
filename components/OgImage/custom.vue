<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div
    class="bg-slate-950 bg-screen h-full w-full flex flex-col justify-around text-amber-400 p-16 relative"
    style="font-family: IBM Plex Sans"
  >
    <h1
      class="headline font-headline font-bold text-6xl"
      style="font-family: ModeNine"
    >
      {{ title }}
    </h1>
    <p class="text-4xl max-w-3xl">{{ description }}</p>
    <img
      src="/fav.png"
      alt="the-great.dev"
      class="w-64 absolute bottom-0 right-4"
    />
  </div>
</template>
