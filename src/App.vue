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
  <div>
    <TinyEditorComponent/>
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
const content = ref(`
<table class="table table-bprintLabeled" style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td>{PAGE_NAME}<br />http://facebook.com/{PAGE_USERNAME}</td>
<td>Đơn h&agrave;ng <strong>#{ORDER_ID}</strong><br />Ng&agrave;y tạo:&nbsp;{ORDER_CREATED_DAY}</td>
</tr>
<tr>
<td colspan="2">Người nhận: <strong>{SHIPPING_NAME}</strong><br />
<div style="width: 100%;">
<div style="margin-left: 80px;">
<p style="margin: 0px 0px 0px 0px;">{SHIPPING_ADDRESS}</p>
</div>
</div>
<div style="margin-left: 80px;">{SHIPPING_PHONE}</div>
</td>
</tr>
<tr>
<td colspan="2">{FULL_PRODUCTS}</td>
</tr>
<tr>
<td>{NOTE}</td>
<td>Thu hộ (COD): {TOTAL_COD}</td>
</tr>
</tbody>
</table>`);
</script>
