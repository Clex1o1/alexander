<script lang="ts" setup>
const { grantConsent, revokeConsent } = useGtag();
const cookies = useCookie("consent", { maxAge: 60 * 60 * 24 * 30 });
watchEffect(() => {
  if (cookies.value && cookies.value !== "rejected") {
    grantConsent();
  } else revokeConsent();
});
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
