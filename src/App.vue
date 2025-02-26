<template>
  <!-- <LexicalEditor /> -->
  <!-- <Print /> -->

  <!-- <button v-for="item in TEST" @click="loadTemplate(item)">{{ item }}</button>

  <div v-html="template_html"></div> -->
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
      <span>{{ option?.address_name + 'custome' }}</span>
    </template>
  </CustomSelectV2>
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
    if(data?.length) list.value = data;
  } catch (error) {}
}

function onSearch(search: string) {
  value.value = search;
  console.log("search", search);
  start_search();
}
</script>
<!-- <script setup lang="ts">
import { onMounted, ref } from "vue";

import Print from "./views/Print.vue";
import LexicalEditor from "./components/LexicalEditor.vue";


/** các template mẫu sẵn */
const DATAS = import.meta.glob('/src/data/*.html', {
  as: 'raw',
})

const TEST = ["test1", "test2"];

const template_html = ref("");

onMounted(() => {
  loadTemplate(TEST[0]);
});

/** load template động */
async function loadTemplate(name: string) {
  /** đường dẫn tới template */
  const PATH = `/src/data/${name}.html`;

  // nếu có thì lưu lại để hiển thị ra
  if (DATAS[PATH]) {
    template_html.value = await DATAS[PATH]();
    console.log("template_html", template_html.value);

    template_html.value = template_html.value?.replace('#{FULL_ORDER_ID}', '123');
    
  }
  // không có thì báo không thấy
  else {
    template_html.value = "<p>Không tìm thấy template</p>";
    console.error("Không tìm thấy template:", PATH);
  }
}
</script> -->
