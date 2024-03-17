<script lang="ts" setup>
const { gtag } = useGtag();
definePageMeta({
  title: "Contact",
});
defineOgImageComponent("custom");
const openTerminal = useState("terminal-open");
const openTerminalCommand = useState("terminal-open-command");
</script>
<template>
  <div class="contact">
    <ContentDoc class="content" />
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
