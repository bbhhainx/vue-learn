<template>
<TiptapEditorNew v-model="content" :upload-image="uploadImage" />
<TiptapEditorNew v-model="content" :type_editor="'view'"/>
</template>
<script setup lang="ts">

import { ref } from "vue";
import TiptapEditorNew from "../components/tiptap/TiptapEditorNew.vue";

const content = ref(`
|  |  |
| --- | --- |
|  |  |
`)

// 👉 Hàm upload giả lập
function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeed = Math.random() > 0.2; // 80% success
      if (succeed)
        // resolve(URL.createObjectURL(file)); // demo thôi, thay bằng link thật
        resolve(
          "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        );
      else reject(new Error("Upload failed"));
    }, 1500);
  });
}

</script>