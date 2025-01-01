<template>
  <Editor
    api-key="3cjzfm341is43v5qp66rkd0ywogt4d33k63tmzcp76bs6kc8"
    :init="{
      plugins: 'code preview quickbars table image link lists media autoresize help advlist emoticons searchreplace visualchars visualblocks fullscreen accordion anchor advtemplate codesample charmap tableofcontents insertdatetime wordcount',
			toolbar:'undo redo | blocks | fontsize | fontfamily |bold italic strikethrough forecolor backcolor | image | alignleft aligncenter alignright alignjustify | bullist numlist indent outdent | removeformat | code emoticons preview',
			statusbar: false,
			images_upload_handler:uploadImageHandler
		}"
		:initialValue="content"
  />
</template>

<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
async function uploadImageHandler(blobInfo:any, success:any) {
  const formData = new FormData();
  formData.append("file", blobInfo.blob(), blobInfo.filename()); // Đính kèm file ảnh

	console.log(blobInfo);
	return 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
}

const content = `
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
</table>`;
</script>
