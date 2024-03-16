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
    <ContentDoc class="content" />
    <h3 class="headline mt-8">One more thing</h3>
    <p class="">
      Your opinions matter! I welcome any feedback you may have. Let me know
      your thoughts; I'm eager to hear from you!
    </p>
    <div class="mt-4 p-4">
      <BaseButton
        @click="
          () => {
            openTerminal = true;
            openTerminalCommand = 'contact';
          }
        "
        >Send Message</BaseButton
      >
    </div>
    <!-- in the comments -->
  </div>
</template>
