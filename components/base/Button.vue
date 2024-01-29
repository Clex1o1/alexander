<script lang="ts" setup>
defineProps<{
  to?: string;
  loading?: boolean;
}>();
</script>
<template>
  <NuxtLink class="button" :to="to"
    ><slot></slot
    ><template v-if="loading">
      <ClientOnly
        ><span class="loading">.</span><span class="loading">.</span
        ><span class="loading">.</span>
      </ClientOnly>
    </template>
    <span v-else class="blinker">_</span></NuxtLink
  >
</template>
<style scoped>
.zapp-out-enter-to .button {
  animation: zapp-in 500ms linear forwards;
}

.loading:nth-child(1) {
  animation: dot1 1s steps(1, end) infinite;
}
.loading:nth-child(2) {
  animation: dot2 1s steps(1, end) infinite;
}
.loading:nth-child(3) {
  animation: dot3 1s steps(1, end) infinite;
}
@keyframes dot1 {
  from {
    opacity: 0;
  }
  20% {
    opacity: 100%;
    color: white;
  }
  to {
    opacity: 100%;
    color: #fbbf24;
  }
}
@keyframes dot2 {
  from {
    opacity: 0;
  }
  40% {
    opacity: 100%;
    color: white;
  }
  to {
    opacity: 100%;
    color: #fbbf24;
  }
}
@keyframes dot3 {
  from {
    opacity: 0;
  }
  60% {
    opacity: 100%;
    color: white;
  }
  to {
    opacity: 100%;
    color: #fbbf24;
  }
}
</style>
