<template>
  <div class="bg-slate-950 bg-screen flex flex-col flex-1">
    <div class="bg-screen-animation"></div>

    <div class="relative z-10 flex flex-col flex-1">
      <slot name="header"></slot>
      <div class="container mx-auto flex flex-1 flex-col">
        <slot />
      </div>
      <slot name="footer">
        <footer class="mt-auto container p-4">
          <div class="border-t-2 border-amber-400 flex justify-between">
            <span class="font-headline font-bold"
              >made with Tauri, Vue, Nuxt and with love</span
            >
            <span class="font-headline font-bold ml-auto"
              >by Alexander Classen</span
            >
          </div>
        </footer>
      </slot>
    </div>
  </div>
</template>
