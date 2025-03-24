<script lang="ts" setup>
definePageMeta({
  title: "Projects",
});
defineOgImageComponent("custom");
</script>

<template>
  <article class="projects">
    <section>
      <p class="mt-4">
        In addition to my permanent position, I engage in various
        projects, either independently or with a small team, depending on my
        mood.
      </p>

      <h2 class="font-headline font-bold mt-4">FastTrack</h2>
      <p>
        App and Website. FastTrack is an application designed to easily and
        quickly initiate and generate Jira Worklogs with Tempo directly from the
        desktop. The plan is to incorporate a few other "quick" actions into the
        app to enhance productivity when working with Jira. However, the
        complexity of the app is intended to be kept relatively low to avoid
        replicating Jira.
      </p>

      <h2 class="font-headline font-bold mt-4">Catch</h2>
      <p>
        App and Website. Catch is a game best played in a social setting.
        Participants join a lobby with their smartphones equipped with a camera.
        A color is given, and each player must capture a photo of an object in
        the room or wherever they are that closely matches the specified color.
        Points are awarded based on the closest resemblance. There are plans to
        expand the game with additional elements.
      </p>

      <h2 class="font-headline font-bold mt-4">Missing Title CMS</h2>
      <p>
        A CMS based on Nuxt3 and file-based architecture. The idea is to create
        a fast and straightforward CMS for small corporate, agency, or personal
        websites. The CMS will focus on website content, addressing the common
        issue with most CMS platforms that tend to become larger and lose focus
        on their primary purpose. There are several approaches to this idea:
      </p>
      <ul>
        <li>Standard CMS with an admin interface</li>
        <li>Visual editor similar to Webflow or Framer</li>
        <li>
          Frontend First (Favorite) - Programmers create Vue components, and the
          admin interface is automatically generated from them.
        </li>
      </ul>
    </section>
  </article>
</template>
