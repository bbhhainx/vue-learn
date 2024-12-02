<template>
  <input type="file" accept="image/*" @change="handleImageUpload($event)" />
	<img :src="image_preview" class="w-96">
	<img :src="image_preview_2" class="w-96">
</template>

<script setup lang="ts">
import imageCompression from "browser-image-compression";
import { ref } from "vue";

const image_preview = ref('')
const image_preview_2 = ref('')

async function handleImageUpload(event: Event) {
  const TARGET = event.target as HTMLInputElement;
  if (!TARGET || !TARGET.files) return;
  const imageFile = TARGET.files[0];
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
		image_preview.value = URL.createObjectURL(imageFile)
    const compressedFile = await imageCompression(imageFile, options);
		image_preview_2.value = URL.createObjectURL(compressedFile)
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    // await uploadToServer(compressedFile); // write your own logic
  } catch (error) {
    console.log(error);
  }
}
</script>
