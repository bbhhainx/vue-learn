<template>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { USER_SERVICE } from '../repository-api/user';

onMounted(() => {
  /** call api lấy danh sách các user */
  USER_SERVICE.getAll()
});
</script>
