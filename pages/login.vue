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
  <div class="login">
    <ModuleLogin />
  </div>
</template>
