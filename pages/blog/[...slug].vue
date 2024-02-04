<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
const route = useRoute();
const { data, pending, status } = await useAsyncData("home", () =>
  queryContent(route.fullPath).findOne()
);

function formatDate(date: string) {
  if (!date) return;
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
</script>

<template>
  <div class="blog">
    <h4 v-if="data?.date" class="text-xs">{{ formatDate(data?.date) }}</h4>
    <ContentDoc class="content" />
  </div>
</template>
