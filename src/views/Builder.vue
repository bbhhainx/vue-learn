<template>
  <Loading :isLoading="is_loading" />
  <button @click="fetchData">Fetch Data</button>
</template>
<script setup lang="ts">
import Loading from "../components/Loading.vue";
import { useApiLoading } from "./useApiLoading";

/** composable loading api */
const { is_loading, apiLoading } = useApiLoading();

/** hàm gọi dữ liệu */
const fetchData = async () => {
  const result = await apiLoading
    .onLoading() // bật loading
    .callAPI(fakeApiLoading); // gọi api

  console.log('Result:', result);
};

/** hàm famse call api */
const fakeApiLoading = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Fake data loaded!');
    }, 2000);
  });
};
</script>
