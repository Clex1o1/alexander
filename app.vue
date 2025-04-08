<script lang="ts" setup>
import ErrorPage from './error.vue'
const { gtag, disableAnalytics, enableAnalytics, initialize } = useGtag();
const cookies = useCookie("consent", { maxAge: 60 * 60 * 24 * 30 });
onMounted(() => {
  if (cookies.value && cookies.value !== "rejected") {
    initialize();
    enableAnalytics();
  }
});

const modalOpen = useState("modalOpen", () => false);
const error = useState("error", () => null);
const handleError = (error: any) => {
  modalOpen.value = true;
  error.value = error;
  console.error("Global error:", error);

};

const resetError = () => clearError({ redirect: "/" });
</script>
<template>
  <NuxtLayout>
    <NuxtErrorBoundary @error="handleError">
      <NuxtPage />
      <template #error="{ error }">
        <dialog :open="modalOpen" class="fixed inset-0 bg-black/50">
          <NuxtErrorBoundary>
            <ErrorPage :error="error" @reset="resetError" class="fixed inset-0" />
          </NuxtErrorBoundary>
        </dialog>
      </template>
    </NuxtErrorBoundary>
  </NuxtLayout>
</template>
