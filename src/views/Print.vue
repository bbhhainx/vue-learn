<template>
  <!-- <div class="p-[400px]">
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
        <template 
          v-for="option in options" 
          #[option.id]
        >
          <span>{{ option?.label }} 111</span>
        </template>
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
  </div> -->
  <!-- <ResizeImage/> -->
  <div class="p-4 flex flex-col gap-2">
    <div class="flex gap-2">
      <select v-model="content" class="border">
        <option v-for="option in OPTIONS" :value="option.value">
          {{ option.title }}
        </option>
      </select>
      <select v-model="style" class="border">
        <option v-for="option in SIZES" :value="option.value">
          {{ option.title }}
        </option>
      </select>
      <button @click="print1()">Print</button>
    </div>
    <TinyEditorComponent v-model="content" />
    <!-- <Tiny v-model="content"/> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "./components/Select.vue";
import TinyEditorComponent from "./components/TinyEditorComponent.vue";
import Tiny from "./components/Tiny.vue";

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

// * in
import {
  PRINT_FORM_DEFAULT1,
  PRINT_FORM_DEFAULT2,
  PRINT_FORM_DEFAULT3,
  PRINT_FORM_DEFAULT4,
  RETURN_FORM,
  OFFLINE_FORM,
  GHTK_A5_PORTRAIT,
  GHTK_A5_LANDSCAPE,
  GHN_A5,
  GHN_80x80,
} from "../constant";

import print from 'print-js'

const OPTIONS = [
  {
    title: "Mặc định 1",
    value: PRINT_FORM_DEFAULT1,
  },
  {
    title: "Mặc định 2",
    value: PRINT_FORM_DEFAULT2,
  },
  {
    title: "Mặc định 3",
    value: PRINT_FORM_DEFAULT3,
  },
  {
    title: "Mặc định 4",
    value: PRINT_FORM_DEFAULT4,
  },
  {
    title: "Trả hàng",
    value: RETURN_FORM,
  },
  {
    title: "Bán tại quầy",
    value: OFFLINE_FORM,
  },
  {
    title: "GHTK A5 đứng",
    value: GHTK_A5_PORTRAIT,
  },
  {
    title: "GHTK A5 ngang",
    value: GHTK_A5_LANDSCAPE,
  },
  {
    title: "GHN A5",
    value: GHN_A5,
  },
  {
    title: "GHN 80x80",
    value: GHN_80x80,
  },
];

const SIZES = [
  {
    title: "1- Đơn/35x22mm",
    value: "22mm",
  },
  {
    title: "1- Đơn/8x8cm",
    value: "80mm",
  },
  {
    title: "1- Đơn/7x5cm",
    value: "50mm",
  },
];

const content = ref("");
const style = ref("");

// Hàm thay thế placeholder trong template
function replacePlaceholders(template: string, data: any) {
  return template.replace(/\{(.*?)\}/g, (_, key) => data[key] || "");
}

function print1() {
  let text = `<div style="page-break-inside:avoid;width:calc(100% - 2mm);min-height:calc(${style.value} - 0mm - 0mm - 2mm);padding-top:0mm;padding-bottom:0mm;margin:0 auto"><div style="border:1px dashed #000">${content.value}</div></div>`;

  let abc = `<div style="column-width:100%">
            <div style="page-break-inside:avoid;width:calc(100% - 2mm);min-height:calc(${style.value} - 1mm - 1mm - 2mm);padding-top:1mm;padding-bottom:1mm;margin:0 auto" class="fr-view print-label">
              <div style="border:1px dashed #000">${content.value}</div>
            </div>`;
  print({ printable: abc, type: "raw-html" });
}
</script>
