<script lang="ts" setup>
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();
const { gtag } = useGtag();

const loading = ref(false);
const {
  data: likes,
  error,
  refresh,
} = await useAsyncData("likes", async () => {
  const { data } = await client
    .from("posts")
    .select("id, likes(id,user_id,post_id)")
    .eq("url", route.path)
    .order("created_at", { referencedTable: "likes" })
    .single();
  return data;
});
async function toggleLike() {
  loading.value = true;
  try {
    if (!user.value) {
      await client.auth.signInAnonymously();
    }
    if (!user.value) return;
    await client.from("likes").upsert({
      user_id: user.value?.id,
      post_id: likes.value?.id,
    });
    gtag("event", "like");
    refresh();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
const liked = computed(() => {
  return likes.value?.likes?.some((like) => like.user_id === user.value?.id);
});
</script>
<template>
  <div class="like">
    <BaseButton
      v-if="!error"
      aria-label="Like +1"
      @click="toggleLike"
      :disabled="liked"
      :class="{ highlight: liked }"
    >
      (<span :class="{ highlight: liked }">{{ likes?.likes.length }}</span
      >) +1</BaseButton
    >
  </div>
</template>
<style scoped>
.button.highlight {
  @apply opacity-100 border-opacity-50;
}
.button.highlight .highlight {
  @apply text-white;
}
</style>
