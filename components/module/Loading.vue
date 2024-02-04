<script lang="ts" setup>
const { progress, isLoading, start, finish, clear } = useLoadingIndicator();
// before unmounte make all white effect
</script>
<template>
  <div v-if="isLoading">
    <div
      class="loading w-full border-2 border-amber-400 grid h-4 overflow-hidden"
    >
      <div
        class="loader bg-amber-400 h-full w-full transition-transform duration-300 ease-in-out"
        :style="`transform: translateX(-${progress * -1}%)`"
      ></div>
    </div>
    <p class="text-center">{{ progress }}%</p>
  </div>
</template>
<style scoped></style>
