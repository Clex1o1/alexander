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
    <p v-if="data?.date" class="text-xs">{{ formatDate(data?.date) }}</p>
    <ContentDoc class="content" />
    <h3 class="headline mt-8">One more thing</h3>
    <p class="">
      Your opinions matter! I welcome any feedback you may have. Let me know
      your thoughts; I'm eager to hear from you!
    </p>
    <!-- in the comments -->
  </div>
</template>
