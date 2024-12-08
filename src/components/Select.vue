<template>
  <ComboboxRoot
    class="w-full"
    v-model="selected"
    v-on:update:model-value="select($event)"
    v-slot="{ open }"
  >
    <ComboboxAnchor
      class="w-full flex items-center text-sm border px-2 py-1 rounded-lg group"
    >
      <ComboboxInput
        v-show="open && is_search"
        @input="(e:Event)=>{
          const TARGET = e.target as HTMLInputElement;
          search = TARGET.value
          start_search()
        }"
        class="w-full text-start focus:outline-none"
        placeholder="Placeholder..."
      />
      <ComboboxTrigger class="w-full text-start" v-show="!open || !is_search">
        {{ show || getShow(selected) || getLabel(selected) || placeholder }}
      </ComboboxTrigger>
      <ChevronDownIcon v-if="isEmpty(selected)" class="w-4 h-4" />
      <XMarkIcon
        v-if="!isEmpty(selected) && !open"
        class="w-4 h-4 cursor-pointer group-hover:text-red-600"
        @click="clearSelect"
      />
    </ComboboxAnchor>

    <ComboboxPortal>
      <ComboboxContent
        class="border p-1 rounded-lg bg-white popover-content-width-same-as-its-trigger"
        :sideOffset="5"
        :position="'popper'"
      >
        <ComboboxViewport class="p-[5px] w-full">
          <ComboboxEmpty class="text-xs font-medium text-center py-2" />

          <ComboboxGroup>
            <ComboboxItem
              v-for="(option, index) in options"
              :key="index"
              class="select-item"
              :value="option"
            >
              <slot :name="option[name] || index">
                <span>
                  {{ getLabel(option) }}
                </span>
              </slot>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>
      </ComboboxContent>
    </ComboboxPortal>
  </ComboboxRoot>
</template>

<script setup lang="ts">
import {
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
  WatchStopHandle,
} from "vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "radix-vue";
import { debounce, filter, isEmpty } from "lodash";
import XMarkIcon from "./icons/XMarkIcon.vue";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import { fa } from "@faker-js/faker";

let stop_watch: WatchStopHandle | null = null;

const props = defineProps({
  /** danh sách các option */
  options: {
    type: Array as PropType<any[]>,
    default: () => [],
    required: true,
  },
  /** giá trị khởi tạo */
  default_value: {
    type: Object,
    default: {},
  },
  /** cập nhật */
  update: {
    type: Function,
    required: true,
    default: () => {},
  },
  /** lấy giá trị */
  getValue: {
    type: Function,
    required: true,
    default: () => "",
  },
  /** lấy hiển thị */
  getLabel: {
    type: Function,
    required: true,
    default: () => "",
  },
  /** hiển thị giá trị đã chọn */
  getShow: {
    type: Function,
    required: false,
    default: () => "",
  },
  /** bật/tắt tìm kiếm */
  is_search: {
    type: Boolean,
    required: false,
    default: true,
  },
  /** hàm tìm kiếm */
  filter: {
    type: Function,
    required: false,
    default: () => true,
  },
  /** tên của slot */
  name: {
    type: String,
    required: false,
    default: "",
  },
  /** placeholder */
  placeholder: {
    type: String,
    required: false,
    default: "Chọn",
  },
  /** hàm tìm kiếm */
  onSearch: {
    type: Function,
    required: false,
    default: () => {},
  },
  /** hàm xóa */
  onClear: {
    type: Function,
    required: false,
    default: () => {},
  },
  /** key để so sánh giá trị */
  by: {
    type: String,
    required: false,
    default: "",
  },
  /** lắng nghe sự thay đổi giá trị */
  is_watch_value: {
    type: Boolean,
    required: false,
    default: false,
  },
});

/** giá trị đã chọn */
const selected = ref<any>(getDefault());

/** giá trị hiển thị */
const show = defineModel<string>("show", {
  default: "",
});

/** giá trị tìm kiếm */
const search = defineModel<string>("search", {
  default: "",
});

/** bắt đầu tìm kiếm */
const start_search = debounce(() => {
  props.onSearch?.();
}, 500);

onMounted(() => {
  if (props.is_watch_value) startWatching();
});

onUnmounted(() => {
  stopWatching();
});

/** bắt đầu lắng nghe sự thay đổi của giá trị */
function startWatching() {
  stop_watch = watch(() =>props.default_value, (newValue, oldValue) => {
    selected.value = getDefault();
  });
}

/** ngừng lắng nghe thay đổi giá trị */
function stopWatching() {
  if (stop_watch) {
    stop_watch(); // Dừng watcher
    stop_watch = null;
  }
}

/** chọn giá trị */
function select(data: any) {
  selected.value = data;
  props.update(data);
}

/** lấy giá trị mặc định */
function getDefault() {
  if (!props.by) return;
  return props.options.find(
    (option) => option[props.by] == props.default_value[props.by]
  );
}

/** xóa giá trị đã chọn */
function clearSelect() {
  selected.value = {};
  props.update({});
  props.onClear?.();
}
</script>
<style>
.select-item[data-highlighted] {
  background-color: gray;
}

.select-item[data-state="checked"] {
  background-color: blue;
  color: white;
}

.popover-content-width-same-as-its-trigger {
  width: var(--radix-combobox-trigger-width);
}
</style>
