<script lang="ts" setup>
definePageMeta({
  layout: "hero",
  layoutTransition: { name: "fly", mode: "out-in" },
  title: "Alexander",
});
useHead({
  title: "Alexander",
  meta: [
    {
      name: "description",
      content:
        "Embark on the tech journey with Alexander, a passionate full-stack engineer from Germany. Explore the world of coding, frameworks, and tech adventures through the lens of 'The Great.' Join the ride at the-great.dev and fasten your seat belts for a unique exploration of the development landscape.",
    },
  ],
});
defineOgImageComponent("custom");
</script>
<template>
  <div class="index grid place-content-center container">
    <section
      class="flex flex-col items-center justify-center h-screen"
      aria-labelledby="main-title"
    >
      <h1 id="main-title" class="text-6xl md:text-9xl text-amber-400 headline">
        The Great
      </h1>
      <!-- <transition name="intro" mode="out-in" appear>
        <div v-show="tmp" class="border-t-2 border-amber-400 w-full"></div>
      </transition> -->
      <div
        class="border-t-2 border-amber-400 w-full glow"
        role="presentation"
      ></div>
      <!-- <div class="flex text-center flex-col flicker mt-8">
        <span class="rotate-90 inline-block loading">></span>
        <span class="rotate-90 inline-block -translate-y-2 loading">></span>
        <span class="rotate-90 inline-block -translate-y-4 loading">></span>
      </div> -->

      <!-- <transition name="zapp-out" mode="out-in">
        <article class="home max-w-[50rem] text-center">
          <h2 class="font-headline font-bold">The Great, huh?</h2>
          <p class="mt-4">I know it's a huge title...</p>
          <p class="mt-4">
            Let me explain: If you know my name and the domain and naming
            problem everybody has you might understand why I choose it. I have a
            new email address: alexander@the-great.dev, how cool is that? It
            could mean 'Alexander the great developer' or 'Alexander the great'
            which would imply that I'm the great? Well, I'm not. I'm just
            another developer and tech guy who starts late into the blog game.
            It could also stand for just 'The Great' - singular or plural.
            Depending on the technologies, programming languages, frameworks and
            people I will mention. So it's a win-win-win-win 😉
          </p>
          <h2 class="font-headline font-bold mt-4">
            Sooo... Back to <s>the Future</s> basics
          </h2>
          <p class="mt-4">
            The journey starts now. Fasten your seat belts and enjoy the ride!
          </p>
        </article>
      </transition> -->
      <nav class="flex gap-4 mt-4">
        <BaseButton to="/home" class="mt-8 text-center" autofocus
          >press start</BaseButton
        >
      </nav>
    </section>
  </div>
</template>
<style scoped>
.intro-enter-active,
.intro-leave-active {
  transition:
    width 3s ease-out,
    opacity 0.5s ease-in-out;
}

.intro-enter-from,
.intro-leave-to {
  width: 1%;
}

.intro-enter-to,
.intro-leave-from {
  width: 100%;
}

/* todo: move to global css, ref in button component */
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
    color: #fbbf24;
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
    color: #fbbf24;
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
    color: #fbbf24;
  }

  to {
    opacity: 100%;
    color: #fbbf24;
  }
}
</style>
