<script lang="ts" setup>
definePageMeta({
  title: "Login",
  layout: "auth",
});
useHead({
  title: "Login",
  meta: [
    {
      name: "description",
      content: "Login to your account",
    },
  ],
});
defineOgImageComponent("custom");
</script>
<template>
  <main class="login">
    <ModuleLogin />
  </main>
</template>
