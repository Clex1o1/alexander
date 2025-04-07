<script lang="ts" setup>
definePageMeta({
  title: "About",
});
defineOgImageComponent("custom");
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("pages").path(route.path).first();
});
</script>

<template>
  <article class="about">
    <ContentRenderer class="content" :value="page" v-if="page" />
  </article>
</template>
