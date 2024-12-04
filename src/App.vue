<template>
  <div class="p-[400px]">
    <div class="w-40">
      <Select
        :options="filter_options"
        :name="'id'"
        :get-value="(data:any) => data?.id"
        :get-label="(data:any) => data?.label"
        :update="(data:any) => value = data?.label ? data?.label + ' custom' : ''"
        :onSearch="() => {
          console.log(search);
          filter_options = options.filter((item) => item?.label?.includes(search))
        }"
        v-model:show="value"
        v-model:search="search"
      >
        <!-- <template 
          v-for="option in options" 
          #[option.id]
        >
          <span>{{ option?.label }} 111</span>
        </template> -->
      </Select>
    </div>
  </div>
  <!-- <ResizeImage/> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "./components/Select.vue";
import ResizeImage from "./components/ResizeImage.vue";

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

const filter_options = ref(options);

const search = ref("");
</script>
