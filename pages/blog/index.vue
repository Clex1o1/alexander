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
  <article class="blog-list">
    <nav aria-label="Blog posts">
      <ContentNavigation v-slot="{ navigation }" :query="blog">
        <ul>
          <li v-for="blogEntry in navigation?.at(0)?.children?.sort((a, b) => b._path.localeCompare(a._path))"
            :key="blogEntry._id">
            <NuxtLink :to="blogEntry._path">{{ blogEntry.title }}</NuxtLink>
          </li>
        </ul>
      </ContentNavigation>
    </nav>
  </article>
</template>
