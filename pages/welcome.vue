<script lang="ts" setup>
definePageMeta({
  title: "Login",
  layout: "auth",
});
defineOgImageComponent("custom");

useHead({
  title: "Welcome",
  meta: [
    {
      name: "description",
      content: "Welcome to my site",
    },
  ],
});
const user = useSupabaseUser();
</script>
<template>
  <main class="welcome">
    <h1>Welcome {{ user?.email }}</h1>
  </main>
</template>
