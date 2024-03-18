<script lang="ts" setup>
const { grantConsent } = useGtag();
const cookies = useCookie("_ga", { maxAge: 60 * 60 * 24 * 30 });
if (cookies.value && cookies.value !== "rejected") {
  grantConsent();
}
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
