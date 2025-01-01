<template>
  <div>
    <textarea ref="editor" id="editor" :defaultValue="modelValue"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from "vue";

// Props và emits
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

const editor = ref<HTMLTextAreaElement | null>(null); // Tham chiếu đến textarea

onMounted(() => {
  if (editor.value) {
    // Khởi tạo TinyMCE
    tinymce.init({
      selector: `#${editor.value.id}`, // Sử dụng ID của textarea
      base_url: "/tinymce/js/tinymce", // Đường dẫn đến thư mục self-hosted TinyMCE
      license_key: "gpl",
      suffix: ".min", // Sử dụng tệp `.min`
      setup: (editorInstance: any) => {
        // Đồng bộ nội dung với v-model
        editorInstance.on("input", () => {
          emit("update:modelValue", editorInstance.getContent());
        });
      },
      plugins: 'code preview quickbars table image link lists media autoresize help advlist emoticons searchreplace visualchars visualblocks fullscreen accordion anchor advtemplate codesample charmap tableofcontents insertdatetime wordcount',
			toolbar:'undo redo | blocks | fontsize | fontfamily |bold italic strikethrough forecolor backcolor | image | alignleft aligncenter alignright alignjustify | bullist numlist indent outdent | removeformat | code emoticons preview',
			statusbar: false,
			images_upload_handler: uploadImageHandler,
      
    });
  }
});

onBeforeUnmount(() => {
  // Hủy TinyMCE khi component bị xóa
  if (editor.value && tinymce.get(editor.value.id)) {
    tinymce.get(editor.value.id)?.destroy();
  }
});

async function uploadImageHandler(blobInfo:any, success:any) {
  const formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename()); // Đính kèm file ảnh

	console.log(blobInfo);
	return 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
}
</script>


<style>
.tox-promotion {
  display: none;
}
</style>
