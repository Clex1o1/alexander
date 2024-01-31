<script lang="ts" setup>
useHead({
  title: "Alexander",
});
definePageMeta({
  title: "The Great.dev",
});
</script>
<template>
  <div class="home">
    <ContentDoc class="content" />
    <div class="mt-4 p-4">
      <BaseButton to="/about" autofocus>next</BaseButton>
    </div>
  </div>
</template>
<style scoped></style>
