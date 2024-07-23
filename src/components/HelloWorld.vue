<template>
  <QuillEditor
    theme="snow"
    toolbar="full"
    contentType="html"
    v-model:content="content"
    :modules="modules"
  />
</template>
<script setup lang="ts">
import MagicUrl from 'quill-magic-url'
import ImageUploader from 'quill-image-uploader'
import { ref, watch } from 'vue'

const modules = [
  {
    name: 'magicUrl',
    module: MagicUrl,

    options: {
      /* options */
    },
  },
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: (file: any) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData()
          formData.append('image', file)
          setTimeout(() => {
            resolve('https://httpbin.org/image/png')
          }, 1000)
        })
      },
    },
  },
]

const content = ref<string>('Hello World!')

watch(
  () => content.value,
  (value: string) => {
    console.log('content changed', value)
  }
)
</script>
