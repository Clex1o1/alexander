<script lang="ts" setup>
const { progress, isLoading, start, finish, clear } = useLoadingIndicator();
</script>
<template>
  <div v-if="isLoading">
    <div
      class="loading w-full border-2 border-amber-400 grid h-4 overflow-hidden"
    >
      <div
        class="loader bg-amber-400 h-full w-full"
        :style="`transform: translateX(-${progress * -1}%)`"
      ></div>
    </div>
    <p class="text-center">{{ progress }}%</p>
  </div>
</template>
<style scoped></style>
