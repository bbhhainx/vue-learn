<template>
  <div
    ref="container"
    class="relative overflow-auto h-full"
    @scroll="handleScroll"
  >
    <div
      class="absolute top-0 left-0 right-0"
      :style="{ height: total_height + 'px' }"
    ></div>
    <ul
      class="absolute top-0 left-0 right-0"
      :style="{ transform: `translateY(${start_offset}px)` }"
    >
      <li
        v-for="(item, index) in visible_items"
        :key="index"
        :style="{ height: item_height + 'px' }"
      >
        <slot name="item" :item="item">
          {{ item }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

// Định nghĩa interface generic cho props
interface Props {
  /** Mảng các mục với kiểu T linh hoạt */
  items: unknown[]; 
  /** Chiều cao của mỗi mục (pixel) */
  item_height: number; 
  /** Số mục render thêm bên trên và bên dưới viewport (overscanning) */
  overscan_count:number;
}

/** Thiết lập props với generic và giá trị mặc định */
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  item_height: 30,
  overscan_count: 5
});

/** Ref tới container DOM */
const container = ref<HTMLElement | null>(null);

/** Vị trí cuộn hiện tại */
const scroll_top = ref(0);

/** Chiều cao của viewport */ 
const viewport_height = ref(0);

/** tổng chiều cao của danh sách */
const total_height = computed(() => props.items.length * props.item_height);

/** index của phần bắt đầu */
const start_index = computed(() => {
  const index = Math.floor(scroll_top.value / props.item_height);
  return Math.max(0, index - props.overscan_count);
});

/** index của phần cuối */
const end_index = computed(() => {
  const index = Math.ceil(
    (scroll_top.value + viewport_height.value) / props.item_height
  );
  return Math.min(props.items.length, index + props.overscan_count);
});

/** Chiều cao bắt đầu */
const start_offset = computed(() => start_index.value * props.item_height);

/** Danh sách các item hiển thị */
const visible_items = computed(() => {
  return props.items.slice(start_index.value, end_index.value);
});

/** Xử lý sự kiện cuộn */ 
const handleScroll = () => {
  if (container.value) {
    scroll_top.value = container.value.scrollTop;
  }
};

// Khởi tạo chiều cao viewport khi component được mount
onMounted(() => {
  if (container.value) {
    viewport_height.value = container.value.clientHeight;
  }
});
</script>
