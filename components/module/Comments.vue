<script lang="ts" setup>
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

const user = useSupabaseUser();
const route = useRoute();
const api = useSupabaseClient();
const comment = ref("");
const loading = ref(false);
const writeError = ref("");
const name = ref("");

watch(
  () => user.value?.user_metadata.name,
  (value) => {
    if (value) {
      name.value = value;
    }
  },
  { immediate: true }
);

const {
  data: post,
  error: PostError,
  refresh,
} = await useAsyncData("comments", async () => {
  const { data } = await api
    .from("posts")
    .select("id, comments(id,comment,name,created_at)")
    .eq("url", route.path)
    .order("created_at", { referencedTable: "comments", ascending: false })
    .single();
  return data;
});

async function addComment() {
  if (!comment.value) return;
  loading.value = true;
  try {
    if (!user.value?.user_metadata.name && name.value) {
      await api.auth.updateUser({
        data: {
          name: name.value,
        },
      });
    }
    await api.from("comments").upsert({
      comment: comment.value,
      user_id: user.value.id,
      post_id: post.value?.id,
      name: name.value,
    });
  } catch (error) {
    writeError.value = error.message;
  }
  comment.value = "";
  editor.value?.commands.clearContent();
  loading.value = false;
  refresh();
}

//#region Editor
const editor = ref<Editor | null>(null);
onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit, Highlight, Typography],
    content: "",
    onUpdate: () => {
      comment.value = editor.value?.getHTML() || "";
    },
  });
});
onBeforeUnmount(() => {
  editor.value?.destroy();
});
//#endregion
</script>
<template>
  <div class="comments grid gap-8">
    <slot name="header">
      <h3 class="headline">Comments</h3>
    </slot>
    <div v-if="!user">
      <p>Login to add a comment</p>
      <BaseButton :to="`/login?referrer=${route.fullPath}`" class="mt-4"
        >Login</BaseButton
      >
    </div>
    <form v-else @submit.prevent="addComment" class="">
      <BaseInput v-model="name" placeholder="Name" required />
      <editor-content :editor="editor" class="content mt-4" />
      <BaseButton type="submit" :loading="loading" class="mt-4"
        >Add Comment</BaseButton
      >
      <p v-if="writeError" class="text-red-600">writeError</p>
    </form>
    <div class="list grid gap-10">
      <template v-if="PostError">
        <p>{{ PostError.message }}</p>
      </template>
      <template v-else>
        <div v-for="comment in post?.comments">
          <MDC
            :value="comment.comment"
            class="content border-l-2 border-amber-400 p-4"
          />
          <p class="text-xs md:text-right mt-2">
            {{ comment.name }} -
            {{
              new Date(comment.created_at).toLocaleTimeString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
            }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>
