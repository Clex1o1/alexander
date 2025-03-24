<script lang="ts" setup>
const { gtag } = useGtag();
definePageMeta({
  title: "Contact",
});
defineOgImageComponent("custom");
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})
const openTerminal = useState("terminal-open");
const openTerminalCommand = useState("terminal-open-command");
</script>
<template>
  <div class="contact">
    <ContentRenderer class="content" :value="page" v-if="page" />
    <BaseButton
      class="mt-8 ml-4"
      @click="
        () => {
          openTerminal = true;
          openTerminalCommand = 'contact';
          gtag('event', 'contact-clicked');
        }
      "
      >Contact</BaseButton
    >
  </div>
</template>
