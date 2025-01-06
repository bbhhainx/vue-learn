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
    <TinyEditorComponent />
    <!-- <Tiny v-model="content"/> -->
    <button @click="print">Print</button>
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

const data = {
  PAGE_NAME: "Shop ABC",
  PAGE_USERNAME: "shopabc",
  ORDER_ID: "12345",
  ORDER_CREATED_DAY: "06/01/2025",
  SHIPPING_NAME: "Nguyễn Văn A",
  SHIPPING_ADDRESS: "123 Đường ABC, Quận 1, TP.HCM",
  SHIPPING_PHONE: "0901234567",
  FULL_PRODUCTS: `
        <ul>
          <li>Sản phẩm 1 - 100,000 VND</li>
          <li>Sản phẩm 2 - 200,000 VND</li>
        </ul>
      `,
  NOTE: "Giao hàng trong giờ hành chính",
  TOTAL_COD: "300,000 VND",
};

// Hàm thay thế placeholder trong template
function replacePlaceholders(template: string, data: any) {
  return template.replace(/\{(.*?)\}/g, (_, key) => data[key] || "");
}

function print() {
  const TEXT = replacePlaceholders(content.value, data);
  const style = `@page {
    size: auto;
    margin: 0;
  }
    .page {
    width: 100%; 
    min-height: 22mm;
    margin: 0 auto;
    page-break-after: avoid; /* Ngắt trang sau mỗi đơn hàng */
  }`;
  let text = "";
  for (let i = 0; i < 10; i++) {
    text += `<div class="page">${TEXT}</div>`;
  }

  text = `<div id="eec8-1df4-6026-9173-d65c-42d7-e9d0" class="print-div"><div style="column-width:100%"><div style="page-break-inside:avoid;width:calc(100% - 2mm);min-height:calc(35mm - 0mm - 0mm - 2mm);padding-top:0mm;padding-bottom:0mm;margin:0 auto" class="fr-view print-label"><div style="border:1px dashed #000"><p style="text-align: center;"><span style="font-family: Arial, Helvetica, sans-serif;"><strong>Tên shop - Slogan</strong></span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Địa chỉ: 20A Thanh Xuân, Hà Nội</span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif;">Hotline: 0986868686</span></p>
<p style="text-align: center;"><span style="font-family: Arial,Helvetica,sans-serif; text-transform: uppercase;"><strong>Đơn hàng</strong></span></p>
<table style="width: 100%;" class="fr-hide-border">
<tbody>
<tr>
<td style="width: 50.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 14px;">Số: 42</span></span></td>
<td style="width: 50.0000%;">
<div data-empty="true" style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="font-size: 12px;">Ngày: 21/11/2024</span></span></div>
</td>
</tr>
</tbody>
</table>
<p><span style="font-family: Arial,Helvetica,sans-serif;">Khách hàng: Nguyễn Lê Minh</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">Địa chỉ: 19 thái hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội</span></p>
<p><span style="font-family: Arial,Helvetica,sans-serif;">SĐT: 0963259382</span></p>
<table style="width: 100%;">
<tbody>
<tr>
<td style="width: 100.0000%;"><span style="font-family: Arial,Helvetica,sans-serif;"><div style="width:100%; border-collapse: collapse; display: table">
        <div style="display: table-row">
          
          <div style="text-align: left; display: table-cell;  white-space: nowrap; padding: 2px 2px;">Sản phẩm</div>
              <div style="text-align: left; display: table-cell; white-space: nowrap; padding: 2px 2px;">Số lượng</div>
          
          <div style="text-align: right; display: table-cell; white-space: nowrap; padding-left: 2px;">Đơn giá</div>
          <div style="text-align: right; display: table-cell; white-space: nowrap; padding-left: 2px;">Chiết khấu</div>
          <div style="text-align: right; display: table-cell; white-space: nowrap; padding-left: 2px; font-weight: bold">Thành tiền</div>
        </div>
        <div style="display: table-row">
          
          <div style="text-align: left; display: table-cell; padding: 2px 2px;">gạo </div>
              <div style="text-align: left;display: table-cell; padding: 2px 2px;">2</div>
          
          <div style="text-align: right;display: table-cell; padding-left: 2px;">20.000 ₫</div>
          <div style="text-align: right;display: table-cell; padding-left: 2px;">1.000 ₫</div>
          <div style="text-align: right;display: table-cell; padding-left: 2px;">38.000 ₫</div>
        </div><div style="display: table-row">
          
          <div style="text-align: left; display: table-cell; padding: 2px 2px;">gạo </div>
              <div style="text-align: left;display: table-cell; padding: 2px 2px;">2</div>
          
          <div style="text-align: right;display: table-cell; padding-left: 2px;">20.000 ₫</div>
          <div style="text-align: right;display: table-cell; padding-left: 2px;">4.000 ₫</div>
          <div style="text-align: right;display: table-cell; padding-left: 2px;">32.000 ₫</div>
        </div><div style="display: table-row">
          
          <div style="text-align: left; display: table-cell; padding: 2px 2px;">gạo </div>
              <div style="text-align: left;display: table-cell; padding: 2px 2px;">2</div>
          
          <div style="text-align: right;display: table-cell; padding-left: 2px;">20.000 ₫</div>
          <div style="text-align: right;display: table-cell; padding-left: 2px;">0 ₫</div>
          <div style="text-align: right;display: table-cell; padding-left: 2px;">40.000 ₫</div>
        </div>
    </div></span></td>
</tr>
</tbody>
</table>
<table style="width: 100%; height: 163.734px;" class="fr-hide-border">
<tbody>
<tr style="height: 23.3906px;">
<td style="width: 50%; height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif;">Tổng số lượng:</span></td>
<td style="width: 50%; height: 23.3906px;">
<div data-empty="true" style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">6</span></div>
</td>
</tr>
<tr style="height: 23.3906px;">
<td style="width: 50%; height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif;">Tổng tiền hàng:</span></td>
<td style="width: 50%; height: 23.3906px;">
<div data-empty="true" style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">120.000 ₫</span></div>
</td>
</tr>
<tr style="height: 23.3906px;">
<td style="width: 50%; height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif;">Chiết khấu:</span></td>
<td style="width: 50%; height: 23.3906px;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">10.000 ₫</span></div>
</td>
</tr>
<tr style="height: 23.3906px;">
<td style="width: 50%; height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif;">Phí vận chuyển:</span></td>
<td style="width: 50%; height: 23.3906px;">
<div data-empty="true" style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">0 ₫</span></div>
</td>
</tr>
<tr style="height: 23.3906px;">
<td style="width: 50%; height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">Khách phải trả:</span></td>
<td style="width: 50%; height: 23.3906px;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif; font-weight: bold;">50.000 ₫</span></div>
</td>
</tr>
<tr style="height: 23.3906px;">
<td style="height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif;">Số điểm tích:</span></td>
<td style="height: 23.3906px;">
<div style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;">0</span></div>
</td>
</tr>
<tr style="height: 23.3906px;">
<td style="height: 23.3906px;"><span style="font-family: Arial,Helvetica,sans-serif;">Ghi chú:</span></td>
<td style="height: 23.3906px;">
<div data-empty="true" style="text-align: right;"><span style="font-family: Arial,Helvetica,sans-serif;"><span style="white-space: pre-line"><span><br></span></span></span></div>
</td>
</tr>
</tbody>
</table></div></div></div></div>`;

  printJS({ printable: text, type: "raw-html", style: style });
}
</script>
