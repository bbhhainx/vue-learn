<template>
  <!-- <TiptapEditor
    :uploadImage="uploadImage"
    v-model="content"
    :type_content="'markdown'"
  />
  <br />
  <br /> -->

  <button class="bg-red-100 h-dvh w-dvw overflow-auto p-4 flex flex-col">
    <div
      class="overflow-hidden flex justify-center items-center bg-white flex-shrink-0 w-full"
    >
      <div
        class="w-full"
        id="gesture-area"
        ref="gesture_area"
      >
        <div
          id="scale-element"
          ref="scale_element"
          class="bg-slate-100 w-full"
        >
          <TiptapEditor :model-value="content" :type_editor="'view'" />
        </div>
      </div>
    </div>
    <div class="bg-blue-700 min-h-[500px] w-full"></div>
  </button>
  <!-- <div id="gesture-area">
    <div class="w-[50dvw] h-[50dvh] rounded-full bg-red-500" id="scale-element"></div>
  </div> -->

  <!-- <br />
  <br />
  <strong>Preview</strong>
  <ViewEditor :content="content" :type_content="'markdown'" />
  <br />
  <br />
  <strong>Nội dung raw</strong>
  <p>{{ content }}</p> -->
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import ViewEditor from "../components/tiptap/ViewEditor.vue";
import TiptapEditor from "../components/tiptap/TiptapEditor.vue";

import interact from "interactjs";

/** fake data nội dung */
const getHello = () => {
  let hello = `Hello\n\n**Xin chào`;
  for (let i = 0; i < 30; i++) {
    hello += `\n\n**Xin chào** ${i}`;
  }
  return hello;
};

/** nội dung */
const content = ref(getHello());

watch(
  () => content.value,
  (newContent) => {
    console.log("Nội dung đã thay đổi:", newContent);
  }
);

// 👉 Hàm upload giả lập
function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeed = Math.random() > 0.2; // 80% success
      if (succeed)
        // resolve(URL.createObjectURL(file)); // demo thôi, thay bằng link thật
        resolve(
          "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp"
        );
      else reject(new Error("Upload failed"));
    }, 1500);
  });
}

/** khu vực thao tác */
const gesture_area = ref<HTMLDivElement | null>(null);
/** phần tử đuợc zoom */
const scale_element = ref<HTMLDivElement | null>(null);
/** tỉ lệ zoom */
const scale = ref(1);
/** địa chỉ timeout */
let reset_timeout: number | undefined;

onMounted(async () => {
  // đợi chờ DOM cập nhật
  await nextTick();

  // nếu không có gesture_area thì không thôi
  if (!gesture_area.value || !scale_element.value) return;

  interact(gesture_area.value)
    .gesturable({
      listeners: {
        start(event) {
          // xoá timeout nếu có
          clearTimeout(reset_timeout);

          // xoá class reset nếu có
          scale_element.value?.classList.remove("reset");
        },
        move(event) {
          // nếu không có phần tử cần zoom thì không làm gì
          if (!scale_element.value) return;

          /** tỉ lệ scale hiện tại */
          const CURRENT_SCALE = event.scale * scale.value;

          // cập nhật tỉ lệ zoom
          scale_element.value.style.transform =
            "scale(" + Math.max(CURRENT_SCALE, 1) + ")";

          // cập nhật vị trí của phần tử đang zoom
          dragMoveListener(event);
        },
        end(event) {
          // nếu không có phần tử cần zoom thì không làm gì
          if (!scale_element.value) return;

          // cập nhật tỉ lệ zoom
          scale.value = scale.value * event.scale;

          // sau 300ms thì reset vị trí và tỉ lệ zoom
          // reset_timeout = setTimeout(reset, 300);

          // thêm class reset để có hiệu ứng
          scale_element.value.classList.add("reset");

          setTimeout(() => {
            scale_element.value?.blur();
          }, 300);
        },
      },
    })
    .draggable({
      listeners: {
        start(event) {},
        move: dragMoveListener,
        end(event) {
          setTimeout(() => {
            scale_element.value?.blur();
          }, 300);
        },
      },
    });
});

/** hàm reset tỉ lệ zoom */
function reset() {
  // nếu không có phần tử cần zoom thì không làm gì
  if (!scale_element.value) return;

  // đặt lại tỉ lệ zoom về 1
  scale_element.value.style.transform = "scale(1)";

  // đặt lại giá trị về 1
  scale.value = 1;
}

/** hàm cập nhật vị trí của phần tử cần zoom */
function dragMoveListener(event: any) {
  const TARGET_ELEMENT = event.target;

  // nếu không có phần tử cần zoom thì không làm gì
  if (!TARGET_ELEMENT) return;

  // nếu scale === 1 thì không cần cập nhật vị trí
  if (scale.value <= 1) {
    TARGET_ELEMENT.style.transform = "translate(0px, 0px)";
    TARGET_ELEMENT.setAttribute("data-x", "0");
    TARGET_ELEMENT.setAttribute("data-y", "0");
    return;
  }

  /** vị trí theo trục hoàng */
  const POSITION_X =
    parseFloat(TARGET_ELEMENT.getAttribute("data-x") || "0") + event.dx;
  /** vị trí theo trục tung */
  const POSITION_Y =
    parseFloat(TARGET_ELEMENT.getAttribute("data-y") || "0") + event.dy;

  // cập nhật vị trí của phần tử cần zoom
  TARGET_ELEMENT.style.transform =
    "translate(" + POSITION_X + "px, " + POSITION_Y + "px)";
  // cập nhật thuộc tính data-x và data-y
  TARGET_ELEMENT.setAttribute("data-x", POSITION_X);
  TARGET_ELEMENT.setAttribute("data-y", POSITION_Y);
}
</script>

<style>
#scale-element {
  display: block;
  max-width: 100%;
  margin: 1rem auto;
  touch-action: none;
}

#scale-element.reset {
  transition: transform 0.3s ease-in-out;
}
</style>
