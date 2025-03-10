<template>
  <div>{{ index }} - {{ source.content }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  index: number;
  source: any;
}>();
</script>