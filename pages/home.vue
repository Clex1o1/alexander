<script lang="ts" setup>
definePageMeta({
  title: "Home",
});
defineOgImageComponent("custom");
</script>
<template>
  <article class="home">
    <div class="content">
      <ContentDoc />
    </div>
    <nav class="navigation mt-4 p-4">
      <BaseButton to="/about" autofocus>next</BaseButton>
    </nav>
  </article>
</template>
