<template>
  <!-- <LexicalEditor /> -->
  <!-- <Print /> -->


  <!-- <button v-for="item in TEST" @click="loadTemplate(item)">{{ item }}</button>

  <div v-html="template_html"></div> -->
  <CustomSelectV2 />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import Print from "./views/Print.vue";
import LexicalEditor from "./components/LexicalEditor.vue";
import CustomSelectV2 from "./components/CustomSelectV2.vue";

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
</script>
