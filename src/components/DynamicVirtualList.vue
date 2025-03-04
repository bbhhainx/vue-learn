<template>
  <div ref="container" class="virtual-list-container" @scroll="handleScroll">
    <!-- Phantom để tạo chiều cao cho thanh cuộn -->
    <div class="virtual-list-phantom" :style="{ height: totalHeight + 'px' }"></div>
    <!-- Danh sách các item hiển thị -->
    <div class="virtual-list" :style="{ transform: `translateY(${startOffset}px)` }">
      <div
        v-for="(item, index) in visibleItems"
        :key="item.id"
        :ref="(el:any) => setItemRef(el, startIndex + index)"
        class="virtual-list-item"
      >
        <slot :item="item">{{ item.content }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';

// Định nghĩa kiểu dữ liệu cho item
interface ListItem {
  id: number;
  content: string;
  height: number;
}

// Props
const props = defineProps<{
  items: ListItem[];
  estimatedHeight?: number; // Chiều cao ước lượng ban đầu
}>();

// State
const container = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const scrollTop = ref(0);
const viewportHeight = ref(0);
const estimatedHeight = props.estimatedHeight || 50;

// Mảng lưu trữ chiều cao thực tế của các item
const measuredHeights = ref<number[]>(
  Array(props.items.length).fill(estimatedHeight)
);

// Tổng chiều cao của danh sách
const totalHeight = computed(() => {
  return measuredHeights.value.reduce((sum, height) => sum + height, 0);
});

// Chỉ số bắt đầu của các item trong viewport
const startIndex = computed(() => {
  let accumulatedHeight = 0;
  for (let i = 0; i < props.items.length; i++) {
    if (accumulatedHeight >= scrollTop.value) return Math.max(0, i - 5); // Buffer 5 item
    accumulatedHeight += measuredHeights.value[i];
  }
  return 0;
});

// Chỉ số kết thúc của các item trong viewport
const endIndex = computed(() => {
  let accumulatedHeight = 0;
  for (let i = startIndex.value; i < props.items.length; i++) {
    accumulatedHeight += measuredHeights.value[i];
    if (accumulatedHeight >= viewportHeight.value + scrollTop.value)
      return Math.min(props.items.length, i + 1 + 5); // Buffer 5 item
  }
  return props.items.length;
});

// Offset để dịch chuyển danh sách
const startOffset = computed(() => {
  return measuredHeights.value
    .slice(0, startIndex.value)
    .reduce((sum, height) => sum + height, 0);
});

// Danh sách các item hiển thị
const visibleItems = computed(() =>
  props.items.slice(startIndex.value, endIndex.value)
);

// Gán refs cho các item
const setItemRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    itemRefs.value[index] = el;
    measureHeight(index);
  }
};

// Đo chiều cao thực tế của item
const measureHeight = (index: number) => {
  nextTick(() => {
    const el = itemRefs.value[index];
    if (el) {
      const height = el.getBoundingClientRect().height;
      if (height !== measuredHeights.value[index]) {
        measuredHeights.value[index] = height;
      }
    }
  });
};

// Xử lý sự kiện cuộn
const handleScroll = () => {
  if (container.value) {
    scrollTop.value = container.value.scrollTop;
    // Đo lại các item trong viewport
    for (let i = startIndex.value; i < endIndex.value; i++) {
      measureHeight(i);
    }
  }
};

// Khởi tạo viewportHeight và đo chiều cao ban đầu
onMounted(() => {
  if (container.value) {
    viewportHeight.value = container.value.clientHeight;
    for (let i = startIndex.value; i < endIndex.value; i++) {
      measureHeight(i);
    }
  }
});
</script>

<style scoped>
.virtual-list-container {
  height: 100dvh;
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
  padding: 10px;
  box-sizing: border-box;
}
</style>