<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
defineOgImageComponent("custom");
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first()
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
  <article class="blog">
    <header v-if="data" class="blog-head flex justify-between content-baseline">
      <time v-if="data?.date" class="text-xs" :datetime="data?.date">
        {{ formatDate(data?.date) }}
      </time>
      <nav
        class="social-share flex gap-2 text-xs ml-auto"
        aria-label="Share article"
      >
        <SocialShare network="bluesky" :label="false" />
        <SocialShare network="linkedin" :label="false" />
        <SocialShare network="reddit" :label="false" />
      </nav>
    </header>

    <ContentRenderer class="content mt-4" :value="data" v-if="data">
      <template #not-found>
        <p>The article you were looking for was not found.</p>
        <p>Take a look at the <nuxt-link to="/blog">Blog</nuxt-link></p>
      </template>
    </ContentRenderer>
    <footer v-if="data">
      <section
        class="likes mt-8 flex items-center gap-4"
        aria-label="Like this article"
      >
        <h2 class="headline ml-auto">Like it?</h2>
        <ModuleLike></ModuleLike>
      </section>

      <section class="feedback mt-8" aria-label="Feedback">
        <h2 class="headline">One more thing</h2>
        <p>
          Your opinions matter! I welcome any feedback you may have. Let me know
          your thoughts in the comments; I'm eager to hear from you!
        </p>
      </section>

      <section class="comments mt-8" aria-label="Comments">
        <ModuleComments :slug="route.path">
          <template #header>
            <h2 class="text-2xl mt-4 headline border-b-2 border-amber-400">
              Comments
            </h2>
          </template>
        </ModuleComments>
      </section>
    </footer>
  </article>
</template>
