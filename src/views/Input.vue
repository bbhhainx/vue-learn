<template>
  <div class="w-[500px] m-auto pt-10">
    <!-- <Input
      v-model="value"
      :min="0"
      :max="100"
      class="border rounded p-2 w-full"
    /> -->
    <InputMoney
      v-model="value"
      :min="100000"
      :max="1000000"
      class="border rounded p-2 w-full"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Input from "../components/Input.vue";
import InputMoney from "../components/InputMoney.vue";

const value = ref(0);
</script>
