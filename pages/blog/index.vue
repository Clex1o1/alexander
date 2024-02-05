<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
useHead({
  title: "Blog",
});
defineOgImageComponent("custom");
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation(queryContent("blog"))
);
</script>

<template>
  <div class="blog-list">
    <ul>
      <li v-for="blogEntry in navigation?.at(0)?.children" :key="blogEntry._id">
        <NuxtLink :to="blogEntry._path">{{ blogEntry.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
