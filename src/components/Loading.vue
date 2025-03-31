<template>
  <transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <p>Loading ...</p>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  message?: string;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>