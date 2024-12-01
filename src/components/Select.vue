<template>
  <ComboboxRoot
    class="w-full"
    v-model="selected"
    v-on:update:model-value="select($event)"
    v-slot="{ open }"
  >
    <ComboboxAnchor class="w-full text-sm border px-2 py-1 rounded-lg">
      <ComboboxInput
        v-show="open"
        v-model="search"
        class="w-full text-start focus:outline-none"
        placeholder="Placeholder..."
      />
      <ComboboxTrigger class="w-full text-start" v-show="!open">
        {{ show || "Chọn" }}
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        class="border p-1 rounded-lg popover-content-width-same-as-its-trigger"
        :sideOffset="5"
        :position="'popper'"
      >
        <ComboboxViewport class="p-[5px] w-full">
          <ComboboxEmpty
            class="text-mauve8 text-xs font-medium text-center py-2"
          />

          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, index) in options"
              :key="index"
              class="select-item"
              :value="option"
            >
              <span>
                {{ getLabel(option) }}
              </span>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import { nextTick, onMounted, PropType, ref } from "vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
} from "radix-vue";
import { watch } from "vue";

const anchor = ref<any>();

const v = ref("");

const selected = ref<any>({});

const show = defineModel<string>("show", {
  default: "",
});
const search = defineModel<string>("search", {
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

function abc() {
  console.log(anchor.value, anchor.value?.offsetWidth);
}

function select(data: any) {
  selected.value = data;
  props.update(data);
}
</script>
<style>
.select-item[data-highlighted] {
  background-color: gray;
}

.popover-content-width-same-as-its-trigger {
  width: var(--radix-combobox-trigger-width);
}
</style>
