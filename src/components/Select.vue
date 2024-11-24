<template>
  <SelectRoot
    :value="selected"
    v-on:update:model-value="($event) => select($event)"
    class="w-60"
  >
    <SelectTrigger
      class="border w-60 outline-none p-2 rounded-md"
      aria-label="Customise options"
    >
      <SelectValue
        placeholder="Select a fruit..."
        class="w-full block text-start"
      >
        {{ show }}
      </SelectValue>
    </SelectTrigger>

    <SelectPortal>
      <SelectContent
        class="bg-white border rouned-sm relative w-80 p-1 rounded-md"
        position="popper"
        :side-offset="5"
        align="center"
        :collision-padding="{ top: 0, right: 0, bottom: 0, left: 0 }"
      >
        <SelectViewport>
          <SelectItem
            class="select-item outline-none px-2 py-1 rounded-md"
            :class="{
              '!bg-blue-500 !text-white':
                getValue(option) === getValue(selected),
            }"
            v-for="(option, index) in options"
            :key="index"
            :value="option"
          >
            <SelectItemText>
              {{ getLabel(option) }}
            </SelectItemText>
          </SelectItem>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-vue";

const selected = ref<any>({});

const show = defineModel<string>({
  default: "",
});

const props = defineProps({
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },
  defaultValue: {
    type: Object,
    default: () => {},
  },
  update: {
    type: Function,
    required: true,
    default: () => {},
  },
  getValue: {
    type: Function,
    required: true,
    default: () => "",
  },
  getLabel: {
    type: Function,
    required: true,
    default: () => "",
  },
});

function select(data: any) {
  selected.value = data;
  props.update(data);
}
</script>

<style>
.select-item[data-highlighted] {
  background-color: gray;
}
</style>
