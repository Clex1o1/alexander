<script lang="ts" setup>
definePageMeta({
  layout: "hero",
  layoutTransition: {
    name: "fly",
    mode: "out-in",
  },
});
useHead({
  title: "Welcome",
});
</script>
<template>
  <div class="index grid place-content-center container">
    <section class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl md:text-9xl text-amber-400 headline">Welcome</h1>
      <div class="flex gap-4">
        <BaseButton to="/home" class="mt-8 text-center">Enter</BaseButton>
      </div>
    </section>
  </div>
</template>
