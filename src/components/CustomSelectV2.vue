<template>
  <div ref="dropdown_ref" class="relative w-64">
    <div
      class="flex justify-between items-center border rounded-lg cursor-pointer"
      @click="clearSearch"
      @keydown.esc="is_open = false"
      @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev"
      @keydown.enter.prevent="selectHighlighted"
      tabindex="0"
    >
      <input
        type="text"
        class="w-full border-none outline-none cursor-pointer p-2"
        v-model="search"
        :placeholder="selected_label || 'Select option'"
        @input="is_open = true"
      />
      <div class="flex items-center">
        <XMarkIcon
          v-if="clearable && value"
          class="w-5 h-5 mr-2"
          @click.stop="clearSelection"
        />
        <ChevronDownIcon v-else class="w-5 h-5 mr-2" />
      </div>
    </div>
    <transition name="fade-slide">
      <div
        v-if="is_open"
        class="absolute w-full bg-white border rounded-lg mt-2 p-2 shadow-lg"
        @click.stop
      >
        <ul ref="dropdown_list_ref" class="max-h-40 overflow-y-auto mt-2">
          <li
            v-for="(option, index) in filteredOptions"
            :key="customValue(option)"
            class="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-gray-200': index === highlighted_index }"
            @click="selectOption(option)"
            @mouseover="highlighted_index = index"
          >
            {{ customLabel(option) }}
            <CheckIcon
              v-if="value && value === customValue(option)"
              class="w-4 h-4 text-blue-500"
            />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import CheckIcon from "./icons/CheckIcon.vue";
import XMarkIcon from "./icons/XMarkIcon.vue";

type Option = any;

const props = defineProps({
  options: {
    type: Array as () => Option[],
    required: true,
  },
  customLabel: {
    type: Function,
    required: true,
  },
  customValue: {
    type: Function,
    required: true,
  },
  clearable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

/** giá trị đã chọn của select */
const value = defineModel<string | null>({
  default: null,
});

/** từ khóa tìm kiếm */
const search = defineModel<string>("search", {
  default: "",
});

/** đóng mở dropbox */
const is_open = ref<boolean>(false);

/** index của option đang focus */
const highlighted_index = ref<number>(-1);

/** ref đến dropdown */
const dropdown_ref = ref<HTMLElement | null>(null);

/** ref đến list trong dropdown */
const dropdown_list_ref = ref<HTMLElement | null>(null);

/** danh sách option được lọc */
const filteredOptions = computed<Option[]>(() => {
  return props.options.filter((opt) =>
    props.customLabel(opt).toLowerCase().includes(search.value.toLowerCase())
  );
});

/** label của option đã chọn */
const selected_label = computed<string>(() => {
  return props.customLabel(
    props.options.find((opt) => props.customValue(opt) === value.value)
  );
});

onMounted(() => {
  document.addEventListener("click", closeOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", closeOnClickOutside);
});

/** chọn option */
function selectOption(option: Option): void {
  // lưu giá trị của option đã chọn
  value.value = props.customValue(option);

  // lưu hiển thị của giá trị tìm kiếm vào input
  search.value = props.customLabel(option);

  // đóng dropbox
  is_open.value = false;

  // reset vị trí option được focus
  highlighted_index.value = -1;
}

/** xóa tìm kiếm */
function clearSearch(): void {
  search.value = "";
  is_open.value = true;
}

/** xóa option đã chọn */
function clearSelection(): void {
  value.value = null;
  search.value = "";
}

/** scroll đến option đang focus */

function scrollToHighlighted(): void {
  nextTick(() => {
    // nếu không có list thì thôi
    if (!dropdown_list_ref.value) return;
    /** tất cả các options đang chưa trong list */
    const ITEMS = dropdown_list_ref.value.querySelectorAll("li");

    /** option đang focus */
    const HIGHLIGHTED_ITEM = ITEMS[highlighted_index.value];

    // nếu không có thì thôi
    if (!HIGHLIGHTED_ITEM) return;

    // scroll tới thẻ đang được focus đó
    HIGHLIGHTED_ITEM.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  });
}

/** focus tới option tiếp theo */
function highlightNext(): void {
  // nếu index của option đang focus là cuối cùng thì thôi
  if (highlighted_index.value >= filteredOptions.value.length - 1) return;

  // tăng index lên 1
  highlighted_index.value++;

  // scroll tới option được focus
  scrollToHighlighted();
}

/** focus tới option phía trước */
function highlightPrev(): void {
  // nếu là option đầu danh sách thì thôi
  if (highlighted_index.value <= 0) return;

  // giảm index đi 1
  highlighted_index.value--;

  // scroll tới option được focus
  scrollToHighlighted();
}

/** chọn option đang focus */
function selectHighlighted(e: KeyboardEvent): void {
  // nếu là không focus option nào thì thôi
  if (highlighted_index.value < 0) return;

  // chọn option dựa vào index của option đang được focus
  selectOption(filteredOptions.value[highlighted_index.value]);

  // out focus input search
  const INPUT = e.target as HTMLInputElement;
  INPUT.blur();
}

/** hàm click bên ngoài select thì tắt */
function closeOnClickOutside(event: Event): void {
  // nếu click không phải bên trong select thì tắt
  if (
    dropdown_ref.value &&
    !dropdown_ref.value.contains(event.target as Node)
  ) {
    is_open.value = false;
  }
}
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
