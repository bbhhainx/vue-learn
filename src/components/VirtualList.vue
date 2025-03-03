<template>
  <div
    ref="container"
    class="virtual-list-container"
    @scroll="handleScroll"
  >
    <div
      class="virtual-list-phantom"
      :style="{ height: totalHeight + 'px' }"
    ></div>
    <div
      class="virtual-list"
      :style="{ transform: `translateY(${startOffset}px)` }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        class="virtual-list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Định nghĩa props với TypeScript
interface Props {
  items: string[]; // Mảng các mục trong danh sách
  itemHeight: number; // Chiều cao của mỗi mục (pixel)
}

// Thiết lập props với giá trị mặc định
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  itemHeight: 30,
});

// State
const container = ref<HTMLElement | null>(null); // Ref tới container DOM
const scrollTop = ref(0); // Vị trí cuộn hiện tại
const viewportHeight = ref(0); // Chiều cao của viewport

// Số mục render thêm bên trên và bên dưới viewport (overscanning)
const overscanCount = 5;

// Computed properties
const totalHeight = computed(() => props.items.length * props.itemHeight);

const startIndex = computed(() => {
  const index = Math.floor(scrollTop.value / props.itemHeight);
  return Math.max(0, index - overscanCount);
});

const endIndex = computed(() => {
  const index = Math.ceil((scrollTop.value + viewportHeight.value) / props.itemHeight);
  return Math.min(props.items.length, index + overscanCount);
});

const startOffset = computed(() => startIndex.value * props.itemHeight);

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value);
});

// Xử lý sự kiện cuộn
const handleScroll = () => {
  if (container.value) {
    scrollTop.value = container.value.scrollTop;
  }
};

// Khởi tạo chiều cao viewport khi component được mount
onMounted(() => {
  if (container.value) {
    viewportHeight.value = container.value.clientHeight;
  }
});
</script>

<style scoped>
.virtual-list-container {
  height: 400px; /* Chiều cao cố định của container, có thể điều chỉnh */
  overflow-y: auto;
  position: relative;
}

.virtual-list-phantom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list-item {
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>