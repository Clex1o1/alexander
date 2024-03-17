<script setup lang="ts">
const modelValue = defineModel();

const editor = useEditor({
  content: modelValue.value ?? "Add your comment",

  extensions: [TiptapStarterKit],
  onUpdate({ editor }) {
    modelValue.value = editor.getHTML();
  },
});
watch(
  () => modelValue.value,
  (value) => {
    if (!value) {
      editor.value?.commands.clearContent();
    }
  },
  { immediate: true }
);
</script>
<template>
  <TiptapEditorContent :editor="editor" />
</template>
