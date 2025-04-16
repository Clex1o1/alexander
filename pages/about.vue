<script lang="ts" setup>
definePageMeta({ title: "About" });
defineOgImageComponent("custom");
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("pages").path(route.path).first();
});
useHead({
  title: page.value?.seo.title,
  meta: [{ name: "description", content: page.value?.seo.description }],
});
</script>

<template>
  <article class="about">
    <ContentRenderer class="content" :value="page" v-if="page" />
  </article>
</template>
