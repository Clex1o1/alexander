<script lang="ts" setup>
defineProps<{
  placeholder?: string;
  type?: "text" | "password" | "email" | "number";
}>();

const modelValue = defineModel();
</script>
<template>
  <input
    :type="type ?? 'text'"
    class="input"
    v-model="modelValue"
    :placeholder="placeholder"
  />
</template>
<style scoped>
.zapp-out-enter-to .input {
  animation: zapp-in 500ms linear forwards;
}
</style>
