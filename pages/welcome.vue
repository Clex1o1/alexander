<script lang="ts" setup>
definePageMeta({
  title: "Login",
  layout: "auth",
});
defineOgImageComponent("custom");
const user = useSupabaseUser();
</script>
<template>
  <div class="welcome">
    <h1>Welcome {{ user?.email }}</h1>
  </div>
</template>
