<script lang="ts" setup>
const errorHappened = useState("errorHappened", () => false);
</script>
<template>
  <div
    class="bg-slate-950 bg-screen flex flex-col flex-1"
    :class="{ error: errorHappened }"
  >
    <div class="bg-screen-animation"></div>

    <div class="relative z-10 flex flex-col flex-1">
      <slot name="header"></slot>
      <div class="container grid place-content-center grid-cols-1 flex-1">
        <slot />
      </div>
      <slot name="footer">
        <!-- <ModuleFooter /> -->
      </slot>
    </div>
  </div>
</template>
