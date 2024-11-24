<template>
  <div class="p-80">
  <Select 
    :options="options"
    :get-value="(data:any) => data?.id"
    :get-label="(data:any) => data?.label"
    :update="(data:any) => value = data?.label + ' custom'"
    v-model="value"
  />
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Select from './components/Select.vue';

const value = ref("");

const options: any[] = [
  {
    id: "apple",
    label: "Táo",
  },
  {
    id: "banana",
    label: "Chuối",
  },
  {
    id: "strawberry",
    label: "Dâu tây",
  },
  {
    id: "pineapple",
    label: "Dứa",
  },
];
</script>


