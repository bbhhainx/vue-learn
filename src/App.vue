<template>
  <!-- <LexicalEditor />
  <Print /> -->
  <!-- <Input /> -->
  <!-- <Builder /> -->
  <!-- <ExampleBuilder /> -->
  <!-- <ExampleBuilder2 /> -->
  <!-- <TiptapEditor /> -->
  <div v-if="show">
    <TiptapEditorLib />
  </div>
  <button @click="() => (show = true)">Open</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Builder from './views/Builder.vue'
import ExampleBuilder from './views/ExampleBuilder.vue'
import ExampleBuilder2 from './views/ExampleBuilder2.vue'
import Input from './views/Input.vue'
import TiptapEditor from './views/TiptapEditor.vue'
import TiptapEditorLib from './views/TiptapEditorLib.vue'

const show = ref(false)
</script>
