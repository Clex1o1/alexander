<script lang="ts" setup>
definePageMeta({
  title: "Home",
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
