<template>
  <div class="bg-slate-950 bg-screen flex flex-col flex-1">
    <div class="bg-screen-animation" role="presentation"></div>
    <div class="relative z-10 flex flex-col flex-1">
      <header v-if="$slots.header">
        <slot name="header"></slot>
      </header>
      <main v-if="$slots.default">
        <slot />
      </main>
      <footer v-if="$slots.footer">
        <slot name="footer"></slot>
      </footer>
      <ClientOnly>
        <ModuleTerminal class="fixed bottom-0 inset-x-0" aria-label="Terminal interface"></ModuleTerminal>
      </ClientOnly>
    </div>
  </div>
</template>
