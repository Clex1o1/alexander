<script lang="ts" setup>
useHead({
  title: "Alexander",
});
definePageMeta({
  title: "The Great",
});
</script>
<template>
  <article class="home">
    <h2 class="font-headline font-bold">The Great, huh?</h2>
    <p class="mt-4">I know it's a huge title...</p>
    <p class="mt-4">
      Let me explain: If you know my name and the domain and naming problem
      everybody has you might understand why I choose it. I have a new email
      address: alexander@the-great.dev, how cool is that? It could mean
      'Alexander the great developer' or 'Alexander the great' which would imply
      that I'm the great? Well, I'm not. I'm just another developer and tech guy
      who starts late into the blog game. It could also stand for just 'The
      Great' - singular or plural. Depending on the technologies, programming
      languages, frameworks and people I will mention. So it's a win-win-win-win
      😉
    </p>
    <h2 class="font-headline font-bold mt-4">
      Sooo... Back to <s>the Future</s> basics
    </h2>
    <p class="mt-4">
      The journey starts now. Fasten your seat belts and enjoy the ride!
    </p>
    <div class="mt-4 p-4">
      <BaseButton to="/about" autofocus>next</BaseButton>
    </div>
  </article>
</template>
<style scoped></style>
