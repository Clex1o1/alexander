<script lang="ts" setup>
const { gtag, disableAnalytics, enableAnalytics, initialize } = useGtag();
const cookies = useCookie("consent", { maxAge: 60 * 60 * 24 * 30 });
onMounted(() => {
  if (cookies.value && cookies.value !== "rejected") {
    initialize();
    enableAnalytics();
  }
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
