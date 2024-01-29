<template>
  <div class="bg-slate-950 bg-screen flex flex-col flex-1">
    <div class="bg-screen-animation"></div>
    <div class="relative z-10 flex flex-col flex-1">
      <slot name="header"></slot>
      <slot />
      <slot name="footer"> </slot>
    </div>
  </div>
</template>
