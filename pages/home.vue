<script lang="ts" setup>
definePageMeta({
  title: "Home",
});
defineOgImageComponent("custom");

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});
</script>
<template>
  <article class="home">
    <ContentRenderer class="content" :value="page" v-if="page" />
    <div class="mt-4 p-4">
      <BaseButton to="/about" autofocus>next</BaseButton>
    </div>
    <nav class="navigation mt-4 p-4">
      <BaseButton to="/about" autofocus>next</BaseButton>
    </nav>
  </article>
</template>
