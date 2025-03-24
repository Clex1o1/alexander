<script lang="ts" setup>
definePageMeta({
  title: "About",
});
defineOgImageComponent("custom");
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
</script>

<template>
  <div class="about">
    <ContentRenderer class="content" :value="page" v-if="page" />
  </div>
</template>
