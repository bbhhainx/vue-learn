<template>
  <div>
    <textarea ref="editor" id="editor" :defaultValue="modelValue"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits, watch } from "vue";

// Props và emits
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();

onMounted(() => {
    // Khởi tạo TinyMCE
    tinymce.init({
      selector: 'textarea#editor', // Sử dụng ID của textarea
      base_url: "/tinymce/js/tinymce", // Đường dẫn đến thư mục self-hosted TinyMCE
      license_key: "gpl",
      suffix: ".min", // Sử dụng tệp `.min`
      setup: (editorInstance: any) => {
        // Đồng bộ nội dung với v-model
        editorInstance.on("input", () => {
          emit("update:modelValue", editorInstance.getContent());
        });
      },
      plugins: 'code preview quickbars table image link lists media autoresize help advlist emoticons searchreplace visualchars visualblocks fullscreen accordion anchor codesample charmap insertdatetime wordcount',
			toolbar:'undo redo | blocks | fontsize | fontfamily |bold italic strikethrough forecolor backcolor | image | alignleft aligncenter alignright alignjustify | bullist numlist indent outdent | removeformat | code emoticons preview',
			statusbar: false,
			images_upload_handler: uploadImageHandler,
      
    });
});

onBeforeUnmount(() => {
  // Hủy TinyMCE khi component bị xóa
  if (tinymce.get('editor')) {
    tinymce.get('editor')?.destroy();
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    
    if (tinymce.get('editor') && newValue !== tinymce.get('editor')?.getContent()) {
      tinymce.get('editor')?.setContent(newValue);
    }
  }
);

async function uploadImageHandler(blobInfo:any, progress:any) {
  const formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename()); // Đính kèm file ảnh

	console.log('https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg')
	return 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
}
</script>


<style>
.tox-promotion {
  display: none;
}
</style>
