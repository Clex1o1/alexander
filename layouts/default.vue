<script lang="ts" setup>
const router = useRouter();

const route = useRoute();
const slug = computed(() => route.fullPath);
const { data, refresh } = await useAsyncData(
  "pages",
  () => queryContent(route.fullPath).findOne(),
  {
    watch: [slug],
  }
);
const errorHappened = useState("errorHappened", () => false);
</script>

<template>
  <div class="bg-slate-950 bg-screen flex flex-col flex-1">
    <!-- TODO: refactor -->
    <div class="bg-screen-animation"></div>
    <!-- <ModuleScreenAnimation /> -->
    <div class="relative z-10 flex flex-col flex-1">
      <slot name="header"></slot>
      <div class="container mx-auto pt-8">
        <transition name="zapp-out" mode="out-in">
          <h1
            class="headline text-4xl text-wrap"
            :key="router.currentRoute.value.path"
          >
            {{
              data?.title || router.currentRoute.value.meta.title || "&nbsp;"
            }}
          </h1>
        </transition>
        <section class="intro grid gap-4 md:grid-cols-4 pt-8">
          <aside class="border-2 border-amber-400 p-4">
            <h2 class="font-headline font-bold">Menu</h2>
            <nav class="flex md:grid gap-y-1 gap-x-8 mt-4">
              <NuxtLink class="nav-item" to="/home"
                ><span class="underline">Home</span></NuxtLink
              >
              <NuxtLink class="nav-item" to="/blog"
                ><span class="underline">Blog</span></NuxtLink
              >
              <NuxtLink class="nav-item" to="/about"
                ><span class="underline">About</span></NuxtLink
              >
            </nav>
          </aside>
          <main class="border-2 border-amber-400 p-4 md:col-span-3 min-w-0">
            <ModuleLoading />
            <slot />
          </main>
        </section>
      </div>
      <ClientOnly>
        <ModuleTerminal class="fixed bottom-0 inset-x-0"></ModuleTerminal>
      </ClientOnly>
      <slot name="footer">
        <ModuleFooter />
      </slot>
    </div>
  </div>
</template>
<style scoped>
.terminal {
  @apply fixed left-0 right-0 bottom-0 bg-slate-950 z-50;
}
</style>
