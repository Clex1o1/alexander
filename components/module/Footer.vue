<template>
  <footer class="mt-auto container p-4 pt-16 pb-12">
    <div class="border-t-2 border-amber-400 flex justify-between py-2 gap-16">
      <nav>
        <ul class="grid gap-1 *:flex">
          <li>
            <NuxtLink to="/imprint">Imprint</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/privacy">Privacy</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav>
      <div class="text-right grid gap-1">
        <div class="flex gap-3 justify-end text-lg">
          <NuxtLink to="https://github.com/Clex1o1" external target="_blank" title="GitHub">
            <NuxtIcon name="github" />
          </NuxtLink>
          <NuxtLink to="https://bsky.app/profile/the-great.dev" external target="_blank" title="BlueSky">
            <NuxtIcon name="bluesky" />
          </NuxtLink>
          <NuxtLink to="https://de.linkedin.com/in/clex1o1" external target="_blank" title="LinkedIn">
            <NuxtIcon name="linkedin" />
          </NuxtLink>
        </div>
        <p class="font-headline font-bold balance-text">
          Made with Nuxt, Tailwind and love
        </p>
        <p class="font-headline font-bold ml-auto">by Alexander Classen</p>
      </div>
    </div>
  </footer>
</template>
