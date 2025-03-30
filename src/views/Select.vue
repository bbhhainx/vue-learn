<template>
  <!-- <div class="h-[4000px] flex items-center">
  <CustomSelectV2
    :options="list"
    :clearable="true"
    :custom-label="(option:any) => option?.address_name"
    :custom-value="(option:any) => ''"
    :custom-selected-label="abc"
    :on-search="onSearch"
    :onSelect="(option:any) => {
      console.log(option?.address);
      
      value = option?.address
    }"
    :onClear="() => {
      value = '';
      list= []
    }"
  >
    <template v-for="option, index in list" #[index]>
      <span>{{ option?.address_name + ' custome' }}</span>
    </template>
  </CustomSelectV2>
</div> -->
  <div class="ml-2 h-[1000px] flex items-center justify-center">
    <CustomSelectV2
      :options="LIST"
      :custom-label="(option:any) => option?.label"
      :custom-value="(option:any) => option?.value"
      :searchable="true"
      :teleport="'body'"
    >
    </CustomSelectV2>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import CustomSelectV2 from "./components/CustomSelectV2.vue";
import { debounce } from "lodash";

const LIST = [
  {
    label: "option 1",
    value: "1",
  },
  {
    label: "option 2",
    value: "2",
  },
  {
    label: "option 3",
    value: "3",
  },
  {
    label: "option 4",
    value: "4",
  },
  {
    label: "option 5",
    value: "5",
  },
  {
    label: "option 6",
    value: "6",
  },
  {
    label: "option 7",
    value: "7",
  },
  {
    label: "option 8",
    value: "8",
  },
  {
    label: "option 9",
    value: "9",
  },
  {
    label: "option 10",
    value: "10",
  },
  {
    label: "option 11",
    value: "11",
  },
  {
    label: "option 12",
    value: "12",
  },
  {
    label: "option 13",
    value: "13",
  },
  {
    label: "option 14",
    value: "14",
  },
  {
    label: "option 15",
    value: "15",
  },
  {
    label: "option 16",
    value: "16",
  },
  {
    label: "option 17",
    value: "17",
  },
  {
    label: "option 18",
    value: "18",
  },
  {
    label: "option 19",
    value: "19",
  },
  {
    label: "option 20",
    value: "20",
  },
  {
    label: "option 21",
    value: "21",
  },
  {
    label: "option 22",
    value: "22",
  },
  {
    label: "option 23",
    value: "23",
  },
  {
    label: "option 24",
    value: "24",
  },
  {
    label: "option 25",
    value: "25",
  },
  {
    label: "option 26",
    value: "26",
  },
  {
    label: "option 27",
    value: "27",
  },
  {
    label: "option 28",
    value: "28",
  },
  {
    label: "option 29",
    value: "29",
  },
  {
    label: "option 30",
    value: "30",
  },
  {
    label: "option 31",
    value: "31",
  },
  {
    label: "option 32",
    value: "32",
  },
  {
    label: "option 33",
    value: "33",
  },
  {
    label: "option 34",
    value: "34",
  },
];

const value = ref("");

const list = ref<any[]>([]);

const start_search = debounce(() => {
  search();
}, 1000);

function abc(option: any) {
  console.log(value.value);

  return value.value;
}

async function search() {
  try {
    const res = await fetch(
      "https://api-product.merchant.vn/locations/detect_address_v2",
      {
        method: "POST",
        body: JSON.stringify({
          address: value.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (data?.length) list.value = data;
  } catch (error) {}
}

function onSearch(search: string) {
  value.value = search;
  console.log("search", search);
  start_search();
}
</script>
