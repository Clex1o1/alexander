<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
useHead({
  title: "Blog",
});
defineOgImageComponent("custom");

const blog = await queryCollectionNavigation("blog", ["date"])
  .order("date", "DESC")
  .then((pages) => {
    return pages.flatMap((page) => page.children);
  });
</script>

<template>
  <article class="blog-list">
    <nav aria-label="Blog posts">
      <ul>
        <li v-for="blogEntry in blog" :key="blogEntry?.stem">
          <NuxtLink :to="blogEntry?.path">{{ blogEntry?.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </article>
</template>
