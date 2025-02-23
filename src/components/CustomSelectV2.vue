<template>
  <div ref="dropdownRef" class="relative w-64">
    <div
      class="flex justify-between items-center border rounded-lg cursor-pointer"
      @click="clearSearch"
      @keydown.esc="isOpen = false"
      @keydown.down.prevent="highlightNext"
      @keydown.up.prevent="highlightPrev"
      @keydown.enter.prevent="selectHighlighted"
      tabindex="0"
    >
      <!-- @keydown.enter.stop="toggleDropdown" -->
      <input
        type="text"
        class="w-full border-none outline-none cursor-pointer p-2"
        v-model="search"
        :placeholder="selected ? getOptionLabel(selected) : 'Select option'"
        @input="isOpen = true"
      />
      <ChevronDownIcon class="w-5 h-5 mr-2" />
    </div>
    <transition name="fade-slide">
      <div
        v-if="isOpen"
        class="absolute w-full bg-white border rounded-lg mt-2 p-2 shadow-lg"
        @click.stop
      >
        <ul ref="dropdownListRef" class="max-h-40 overflow-y-auto mt-2">
          <li
            v-for="(option, index) in filteredOptions"
            :key="getOptionValue(option)"
            class="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
            :class="{ 'bg-gray-200': index === highlightedIndex }"
            @click="selectOption(option)"
            @mouseover="highlightedIndex = index"
          >
            {{ getOptionLabel(option) }}
            <CheckIcon
              v-if="
                selected && getOptionValue(selected) === getOptionValue(option)
              "
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

type Option = string | { label: string; value: number };

const options = ref<Option[]>([
  "Option 1",
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  "Option 4",
  { label: "Option 5", value: 5 },
]);
const selected = ref<Option | null>(null);
const isOpen = ref<boolean>(false);
const search = ref<string>("");
const highlightedIndex = ref<number>(-1);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownListRef = ref<HTMLElement | null>(null);

const getOptionLabel = (option: Option): string => {
  return typeof option === "string" ? option : option.label;
};

const getOptionValue = (option: Option): string | number => {
  return typeof option === "string" ? option : option.value;
};

const filteredOptions = computed<Option[]>(() => {
  return options.value.filter((opt) =>
    getOptionLabel(opt).toLowerCase().includes(search.value.toLowerCase())
  );
});

const selectOption = (option: Option): void => {
  selected.value = option;
  search.value = getOptionLabel(option);
  isOpen.value = false;
  highlightedIndex.value = -1;
};

const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value;
  highlightedIndex.value = -1;
};

const clearSearch = (): void => {
  search.value = "";
  isOpen.value = true;
};

const scrollToHighlighted = (): void => {
  nextTick(() => {
    if (dropdownListRef.value) {
      const items = dropdownListRef.value.querySelectorAll("li");
      const highlightedItem = items[highlightedIndex.value];
      if (highlightedItem) {
        highlightedItem.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  });
};

const highlightNext = (): void => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
    scrollToHighlighted();
  }
};

const highlightPrev = (): void => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
    scrollToHighlighted();
  }
};

const selectHighlighted = (e: KeyboardEvent): void => {
  if (highlightedIndex.value >= 0) {
    selectOption(filteredOptions.value[highlightedIndex.value]);
    const inputElement = e.target as HTMLInputElement;
    inputElement.blur();
  }
};

const closeOnClickOutside = (event: Event): void => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", closeOnClickOutside);
});
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
