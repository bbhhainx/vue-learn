<template>
  <div class="p-[400px]">
    <div class="w-40">
      <Select
        :default_value="default_value"
        :options="filter_options"
        :name="'id'"
        :by="'id'"
        :get-value="(data:any) => data?.id"
        :get-label="(data:any) => data?.label"
        :get-show="(data:any) => data?.label ? data?.label + ' custom' : ''"
        :update="(data:any) => {}"
        :onSearch="
          () => {
            filter_options = options.filter((item) =>
              item?.label?.includes(search)
            );
          }
        "
        v-model:show="value"
        v-model:search="search"
        :is_watch_value="true"
      >
        <!-- <template 
          v-for="option in options" 
          #[option.id]
        >
          <span>{{ option?.label }} 111</span>
        </template> -->
      </Select>
    </div>
    <button
      @click="
        () => {
          default_value = { id: 'banana' };
        }
      "
    >
      change default
    </button>
  </div>
  <!-- <ResizeImage/> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "./components/Select.vue";

const value = ref("");

const default_value = ref({
  id: "apple",
});

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
