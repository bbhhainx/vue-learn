<template>
  <TiptapEditor
    :uploadImage="uploadImage"
    v-model="content"
    :type_content="'markdown'"
  />
  <br />
  <br />
  <TiptapEditor
    :mode-value="content"
    :type_editor="'view'"
  />
  <br />
  <br />
  <strong>Preview</strong>
  <ViewEditor :content="content" :type_content="'markdown'" />
  <br />
  <br />
  <strong>Nội dung raw</strong>
  <p>{{ content }}</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ViewEditor from '../components/tiptap/ViewEditor.vue'
import TiptapEditor from '../components/tiptap/TiptapEditor.vue'

/** nội dung */
const content = ref(`Hello\n\n**Xin chào**`)

watch(
  () => content.value,
  (newContent) => {
    console.log('Nội dung đã thay đổi:', newContent)
  }
)

// 👉 Hàm upload giả lập
function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeed = Math.random() > 0.2 // 80% success
      if (succeed)
        // resolve(URL.createObjectURL(file)); // demo thôi, thay bằng link thật
        resolve(
          'https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp'
        )
      else reject(new Error('Upload failed'))
    }, 1500)
  })
}
</script>
