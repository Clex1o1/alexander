<script lang="ts" setup>
definePageMeta({
  title: "Home",
});
defineOgImageComponent("custom");

const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("pages").path(route.path).first();
});
</script>
<template>
  <article class="home">
    <ContentRenderer class="content" :value="page" v-if="page" />
    <nav class="navigation mt-4 p-4">
      <BaseButton to="/about" autofocus>next</BaseButton>
    </nav>
  </article>
</template>
