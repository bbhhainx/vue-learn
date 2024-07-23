<template>
  <!-- <HelloWorld /> -->
  <div class="h-[150vh] w-screen flex justify-center items-center bg-custom">
    <DropBox
      v-model="is_open"
      :close="() => (is_open = false)"
    >
      <template v-slot:trigger>
        <button
          @pointerdown="is_open = true"
          class="bg-white font-medium text-black px-4 py-2 rounded-xl shadow-lg shadow-slate-200 border border-fuchsia-600"
        >
          {{ value ? value : '-- Chọn người dùng --' }}
        </button>
      </template>
      <template v-slot:content>
        <ul
          class="p-2 bg-white flex flex-col gap-2 max-h-40 rounded-xl overflow-auto shadow-lg shadow-slate-200 border border-fuchsia-600"
        >
          <li
            class="hover:bg-fuchsia-200 px-6 py-2 cursor-pointer rounded-xl font-medium"
            v-for="i in 10"
            @click=";(is_open = false), (value = `Learn about vue ${i}`)"
          >
            Learn about vue {{ i }}
          </li>
        </ul>
      </template>
    </DropBox>
  </div>
</template>
<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
import DropBox from './components/DropBox.vue'

const value = ref('')
const is_open = ref(false)
</script>

<style lang="css">
.bg-custom {
  background: #c33764; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #1d2671,
    #c33764
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
