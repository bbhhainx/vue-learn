<template>
  <!-- <LexicalEditor /> -->
  <!-- <Print /> -->

  <!-- <button v-for="item in TEST" @click="loadTemplate(item)">{{ item }}</button>

  <div v-html="template_html"></div> -->
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
  <!-- <div class="h-dvh w-dvw overflow-hidden"> -->
    <!-- <div class="h-full w-full overflow-auto"> -->
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
  <!-- :teleport="'body'" -->
  <!-- </div>
  </div> -->
  <!-- <div class="h-dvh">
    <VirtualList :items="listItems" :item_height="30" :overscan_count="5">
      <template #item="{ item }">
        {{ (item as (typeof listItems)[0]).content }}
      </template>
    </VirtualList>
  </div> -->
  <!-- <DynamicVirtualList :items="listItems" :estimated-height="50">
    <template #default="{ item }">
      <div class="border" :style="`height: ${item.height}px`">{{ item.content }}</div>
    </template>
  </DynamicVirtualList> -->
  <!-- <div style="height: 100dvh;overflow: hidden; display: flex; flex-direction: column;"> -->
      <!-- <DynamicScroller :items="listItems" :min-item-size="54">
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          :data-active="active"
        >
          <div class="border" :style="`height: ${item.height}px;min-height: 50px`">
            {{ item.content }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller> -->
    <!-- <VirtualScroll /> -->
  <!-- </div> -->
</template>

<!-- <script setup lang="ts">
import DynamicVirtualList from "./components/DynamicVirtualList.vue";
import VirtualScroll from "./components/VirtualScroll.vue";
// import VirtualList from "./components/VirtualList.vue";
interface ListItem {
  id: number;
  content: string;
  height: number;
}

const listItems: ListItem[] = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  content: `Item ${i + 1}`,
  height: Math.random() * 100,
}));
</script> -->

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
