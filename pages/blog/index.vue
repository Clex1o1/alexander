<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
useHead({
  title: "Blog",
});
defineOgImageComponent("custom");

const blog = await queryCollectionNavigation("blog").then((pages) => {
  return pages.find((page) => page.path === "/blog")?.children;
});
</script>

<template>
  <div class="blog-list">
    <nav>
      <ul>
        <li v-for="blogEntry in blog" :key="blogEntry.stem">
          <NuxtLink :to="blogEntry.path">{{ blogEntry.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
