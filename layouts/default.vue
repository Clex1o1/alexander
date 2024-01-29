<script lang="ts" setup>
const router = useRouter();
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
          <h1 class="headline text-4xl" :key="router.currentRoute.value.path">
            {{ router.currentRoute.value.meta.title }}
          </h1>
        </transition>
        <section class="intro grid gap-4 md:grid-cols-4 pt-8">
          <aside class="border-2 border-amber-400 p-4">
            <h2 class="font-headline font-bold">Menu</h2>
            <nav>
              <ul class="flex md:grid gap-y-1 gap-x-8 mt-4">
                <li><NuxtLink to="home">Home</NuxtLink></li>
                <!-- <li><NuxtLink to="blog">Blog</NuxtLink></li> -->
                <li><NuxtLink to="about">About</NuxtLink></li>
                <!-- <li><NuxtLink to="projects">Projects</NuxtLink></li> -->
                <li><NuxtLink to="experience">Experience</NuxtLink></li>
              </ul>
            </nav>
          </aside>
          <main class="border-2 border-amber-400 p-4 md:col-span-3">
            <slot />
          </main>
        </section>
      </div>
      <slot name="footer">
        <footer class="mt-auto container p-4 pt-16">
          <div
            class="border-t-2 border-amber-400 flex justify-between py-2 gap-16"
          >
            <nav class="">
              <ul>
                <li>Imprint</li>
                <li>Privacy</li>
              </ul>
            </nav>
            <div class="text-right">
              <p class="font-headline font-bold balance-text">
                Made with Nuxt, Tailwind and love
              </p>
              <p class="font-headline font-bold ml-auto">
                by Alexander Classen
              </p>
            </div>
          </div>
        </footer>
      </slot>
    </div>
  </div>
</template>
