<template>
  <NodeViewWrapper class="inline-block">
    <div
      class="inline-flex items-center justify-center w-10 h-10 rounded bg-gray-200"
    >
      <div
        class="w-5 h-5 border-2 border-t-transparent border-gray-600 rounded-full animate-spin"
      />
    </div>
  </NodeViewWrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper } from "@tiptap/vue-3";
import type { NodeViewProps } from "@tiptap/vue-3";

defineProps<NodeViewProps>();
</script>
