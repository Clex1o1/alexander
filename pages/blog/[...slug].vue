<script lang="ts" setup>
definePageMeta({
  title: "Blog",
});
defineOgImageComponent("custom");
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

const openTerminal = useState("terminal-open");
const openTerminalCommand = useState("terminal-open-command");
</script>

<template>
  <div class="blog">
    <div class="blog-head flex justify-between content-baseline">
      <p v-if="data?.date" class="text-xs">
        {{ formatDate(data?.date) }}
      </p>
      <div class="social-share flex gap-2 text-xs">
        <SocialShare network="twitter" :label="false" />
        <SocialShare network="linkedin" :label="false" />
        <SocialShare network="reddit" :label="false" />
      </div>
    </div>
    <ContentDoc class="content mt-4" />
    <div class="likes mt-8 flex items-center gap-4">
      <h3 class="headline ml-auto">Like it?</h3>
      <ModuleLike class=""></ModuleLike>
    </div>
    <h3 class="headline mt-8">One more thing</h3>
    <p class="">
      Your opinions matter! I welcome any feedback you may have. Let me know
      your thoughts in the comments; I'm eager to hear from you!
    </p>

    <div class="comments mt-8">
      <div class="comments-list">
        <ModuleComments :slug="route.path">
          <template #header>
            <h3 class="text-2xl mt-4 headline border-b-2 border-amber-400">
              Comments
            </h3>
          </template>
        </ModuleComments>
      </div>
    </div>
  </div>
</template>
