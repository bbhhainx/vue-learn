<template>
  <div v-html="display_content"></div>
</template>
<script setup lang="ts">
import { marked } from 'marked';
import { computed, PropType } from 'vue';

/** props */
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  type_content: {
    type: String as PropType<"markdown" | "html">,
    default: "html",
  },
});
/** nội dung hiển thị */
const display_content = computed(() => {
  return props.type_content === "markdown" ? marked(props.content) : props.content;
});
</script>