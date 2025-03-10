<template>
  <div ref="dropdown_ref" class="relative w-64">
    <div
      class="flex justify-between items-center border rounded-lg cursor-pointer outline-none"
      @click="clearSearch"
      @keydown.esc="is_open = false"
      @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev"
      @keydown.enter.prevent="selectHighlighted"
      tabindex="0"
      ref="dropdown_trigger_ref"
    >
      <p v-show="!is_open || !searchable" class="w-full p-2">
        {{ selected_label || props.placeholder }}
      </p>
      <input
        v-if="searchable"
        ref="input_ref"
        :class="{
          '!w-0': !is_open,
        }"
        type="text"
        class="w-full border-none outline-none cursor-pointer p-2 rounded-lg"
        :value="search"
        :placeholder="selected_label || props.placeholder"
        @input="(e) => {
          const TARGET = e.target as HTMLInputElement
          search = TARGET.value
          onSearch?.(search)
        }"
      />
      <div class="flex items-center">
        <XMarkIcon
          v-if="clearable && (value || selected_label)"
          class="w-5 h-5 mr-2"
          @click.stop="clearSelection"
        />
        <ChevronDownIcon v-else class="w-5 h-5 mr-2" />
      </div>
    </div>

    <transition name="fade-slide">
      <Teleport :to="teleport || 'body'" :disabled="!teleport">
        <ul
          v-if="is_open"
          ref="dropdown_list_ref"
          class="absolute w-full bg-white border rounded-lg shadow-lg p-2 max-h-40 overflow-y-auto"
          :style="dropdown_style"
        >
          <li
            v-for="(option, index) in filtered_options"
            :key="customValue(option)"
            class="hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-gray-200': index === highlighted_index }"
            @click="selectOption(option)"
            @mouseover="highlighted_index = index"
          >
            <slot name="item" :item="option">
              <div class="flex justify-between items-center p-2">
                {{ customLabel(option) }}
                <CheckIcon
                  v-if="value && value === customValue(option)"
                  class="w-4 h-4 text-blue-500"
                />
              </div>
            </slot>
          </li>
        </ul>
      </Teleport>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import CheckIcon from "./icons/CheckIcon.vue";
import XMarkIcon from "./icons/XMarkIcon.vue";

const props = defineProps({
  options: {
    type: Array as () => unknown[],
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Chọn",
  },
  customLabel: {
    type: Function,
    required: true,
  },
  customValue: {
    type: Function,
    required: true,
  },
  customSelectedLabel: {
    type: Function,
    required: false,
  },
  teleport: {
    type: String,
    required: false,
    default: "",
  },
  clearable: {
    type: Boolean,
    required: false,
    default: false,
  },
  searchable: {
    type: Boolean,
    required: false,
    default: true,
  },
  onSearch: {
    type: Function,
    required: false,
  },
  onSelect: {
    type: Function,
    required: false,
    default: () => {},
  },
  onClear: {
    type: Function,
    required: false,
    default: () => {},
  },
});

/** giá trị đã chọn của select */
const value = defineModel<string>({
  default: "",
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

/** ref đến trigger trong dropdown */
const dropdown_trigger_ref = ref<HTMLElement | null>(null);

/** ref đến input */
const input_ref = ref<HTMLElement | null>(null);

/** style của dropdown */
const dropdown_style = ref({});

/** danh sách option được lọc */
const filtered_options = computed<unknown[]>(() => {
  if (props.onSearch) return props.options;

  return props.options.filter((opt) =>
    props.customLabel(opt)?.toLowerCase().includes(search.value?.toLowerCase())
  );
});

/** label của option đã chọn */
const selected_label = computed<string>(() => {
  if (props.customSelectedLabel) {
    return props.customSelectedLabel();
  }

  return props.customLabel(
    props.options.find((opt) => props.customValue(opt) === value.value)
  );
});

onMounted(() => {
  document.addEventListener("click", closeOnClickOutside);
  window.addEventListener("scroll", updateDropdownPosition, {
    passive: true,
    capture: true,
  });
  window.addEventListener("resize", updateDropdownPosition);
});

onUnmounted(() => {
  document.removeEventListener("click", closeOnClickOutside);
  window.removeEventListener("scroll", updateDropdownPosition);
  window.removeEventListener("resize", updateDropdownPosition);
});

/** chọn option */
function selectOption(option: unknown): void {
  // lưu giá trị của option đã chọn
  value.value = props.customValue(option);

  // đóng dropbox
  is_open.value = false;

  // reset vị trí option được focus
  highlighted_index.value = -1;

  props.onSelect(option);
}

/** xóa tìm kiếm */
function clearSearch(): void {
  search.value = "";
  is_open.value = true;
  input_ref.value?.focus();
  updateDropdownPosition();
}

/** xóa option đã chọn */
function clearSelection(): void {
  value.value = "";
  search.value = "";
  props.onClear();
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
  if (highlighted_index.value >= filtered_options.value.length - 1) return;

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
  selectOption(filtered_options.value[highlighted_index.value]);

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

/** hàm tính toán vị trí của dropdown */
function updateDropdownPosition() {
  nextTick(() => {
    if (!dropdown_trigger_ref.value || !dropdown_list_ref.value) return;

    /** rect của trigger */
    const RECT = dropdown_trigger_ref.value.getBoundingClientRect();

    /** chiều cao của dropbox */
    const DROPDOWN_HEIGHT = dropdown_list_ref.value.offsetHeight;

    /** khoảng cách giữa option với trigger */
    const SPACE = 8

    /** vị trí top */
    let top_position: number = 0;

    /** vị trí left */
    let left_position: number = 0;

    /** khoảng cách với lề trên */
    const SPACE_ABOVE = RECT.top;

    /** khoảng cách với lề dưới */
    const SPACE_BELOW = window.innerHeight - RECT.bottom;
    
    // nếu có teleport
    if (props.teleport) {
      if (SPACE_BELOW >= DROPDOWN_HEIGHT || SPACE_BELOW > SPACE_ABOVE) {
        // Hiển thị phía dưới
        top_position = RECT.bottom + window.scrollY + SPACE;
      } else {
        // Hiển thị phía trên
        top_position = RECT.top + window.scrollY - DROPDOWN_HEIGHT - SPACE;
      }

      left_position = RECT.left + window.scrollX;
    } else {
      if (SPACE_BELOW >= DROPDOWN_HEIGHT || SPACE_BELOW > SPACE_ABOVE) {
        // Hiển thị phía dưới
        top_position = RECT.height + SPACE;
      } else {
        // Hiển thị phía trên
        top_position = -DROPDOWN_HEIGHT - SPACE;
      }
    }

    // Cập nhật style
    dropdown_style.value = {
      top: `${top_position}px`,
      left: `${left_position}px`,
      width: `${RECT.width}px`,
      position: "absolute",
    };
  });
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
