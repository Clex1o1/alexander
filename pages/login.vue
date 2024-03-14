<script lang="ts" setup>
definePageMeta({
  title: "Login",
  layout: "auth",
});
defineOgImageComponent("custom");
const user = useSupabaseUser();
</script>
<template>
  <div class="login">
    <ModuleLogin />
  </div>
</template>
