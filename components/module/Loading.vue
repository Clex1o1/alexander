<script lang="ts" setup>
const { progress, isLoading } = useLoadingIndicator();
// before unmounte make all white effect

const computedProgress = computed(() => {
  if (isLoading.value) {
    return Math.ceil(progress.value);
  }
  return 100;
});
</script>
<template>
  <div v-if="isLoading">
    <div
      class="loading w-full border-2 border-amber-400 grid h-4 overflow-hidden"
    >
      <div
        class="loader bg-amber-400 h-full w-full transition-transform duration-300 ease-in-out"
        :style="`transform: translateX(-${100 - computedProgress}%)`"
      ></div>
    </div>
    <p class="text-center">{{ computedProgress }}%</p>
  </div>
</template>
<style scoped></style>
