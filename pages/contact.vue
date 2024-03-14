<script lang="ts" setup>
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
        }
      "
      >Contact</BaseButton
    >
  </div>
</template>
