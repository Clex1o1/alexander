<template>
  <div class="bg-slate-950 bg-screen flex flex-col flex-1">
    <div class="bg-screen-animation" role="presentation"></div>
    <div class="relative z-10 flex flex-col flex-1">
      <header v-if="$slots.header">
        <slot name="header"></slot>
      </header>
      <main class="container mx-auto flex flex-1 flex-col" v-if="$slots.default">
        <slot />
      </main>
      <footer class="mt-auto container p-4">
        <slot name="footer">
          <div class="border-t-2 border-amber-400 flex justify-between">
            <span class="font-headline font-bold">made with Tauri, Vue, Nuxt and with love</span>
            <span class="font-headline font-bold ml-auto">by Alexander Classen</span>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>
