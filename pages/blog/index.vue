<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
useHead({
  title: "Blog",
});
defineOgImageComponent("custom");

const blog = queryContent("blog");
</script>

<template>
  <div class="blog-list">
    <ContentNavigation v-slot="{ navigation }" :query="blog">
      <ul>
        <li
          v-for="blogEntry in navigation?.at(0)?.children"
          :key="blogEntry._id"
        >
          <NuxtLink :to="blogEntry._path">{{ blogEntry.title }}</NuxtLink>
        </li>
      </ul></ContentNavigation
    >
  </div>
</template>
