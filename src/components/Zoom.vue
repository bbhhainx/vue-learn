<template>
  <div
    class="w-full overflow-x-auto overflow-y-hidden"
    ref="zoom_wrapper"
    :style="{ minHeight: wrapper_height + 'px' }"
  >
    <div ref="content" :style="content_style" @touchstart="handleTouchStart">
      <slot>
        <h2>Nội dung có thể Zoom</h2>
        <p>
          Thử zoom bằng hai ngón tay trên màn hình cảm ứng hoặc sử dụng chuột
          (Ctrl + Scroll)
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Chiều cao hiện tại: {{ wrapper_height }}px</p>
        <p>Tỷ lệ zoom: {{ (scale * 100).toFixed(0) }}%</p>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";

/** tỉ lệ zoom của nội dung */
const scale = ref(1);

/** Chiều cao của wrapper */
const wrapper_height = ref(300);

/** Khoảng cách ban đầu giữa 2 điểm cảm ứng */
const initial_distance = ref<number | null>(null);

/** ref tới thẻ bọc nội dung zoom */
const zoom_wrapper = ref<HTMLDivElement | null>(null);

/** ref tới nội dung cần zoom */
const content = ref<HTMLDivElement | null>(null);

/** style của nội dung cần zoom */
const content_style = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: "0 0",
  width: "100%",
  display: "block",
}));

onMounted(() => {
  // nếu không có phần tử nội dung thì thôi
  if (!content.value) return;

  // nếu có lắng nghe sự kiện touchmove
  content.value.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });

  // nếu có lắng nghe sự kiện touchend
  content.value.addEventListener("touchend", handleTouchEnd);

  // Cập nhật chiều cao ban đầu
  updateWrapperHeight();
});

onUnmounted(() => {
  // nếu không có phần tử nội dung thì thôi
  if (!content.value) return;
  // Xóa lắng nghe sự kiện touchmove
  content.value.removeEventListener("touchmove", handleTouchMove);
  // Xóa lắng nghe sự kiện touchend
  content.value.removeEventListener("touchend", handleTouchEnd);
});

/** Hàm cập nhật chiều cao wrapper */
const updateWrapperHeight = () => {
  nextTick(() => {
    // nếu không có phần tử nội dung thì thôi
    if (!content.value) return;

    /** Chiều cao chính xác của nội dung sau khi zoom */
    const CONTENT_HEIGHT = content.value.scrollHeight;

    // Cập nhật chiều cao của wrapper dựa trên chiều cao nội dung và tỷ lệ zoom
    wrapper_height.value = CONTENT_HEIGHT * scale.value;
  });
};

/** Xử lý sự kiện cảm ứng */
const handleTouchStart = (e: TouchEvent) => {
  // Nếu không có 2 điểm cảm ứng thì thôi
  if (e.touches.length !== 2) return;

  // Ngăn chặn hành vi mặc định để tránh cuộn trang
  e.preventDefault();

  // Tính khoảng cách ban đầu giữa 2 điểm cảm ứng
  initial_distance.value = getDistance(e.touches[0], e.touches[1]);
};

/** Tính khoảng cách giữa 2 điểm cảm ứng
 * @param touch1 - Điểm cảm ứng đầu tiên
 * @param touch2 - Điểm cảm ứng thứ hai
 */
const getDistance = (touch1: Touch, touch2: Touch) => {
  // Sử dụng Math.hypot để tính khoảng cách giữa 2 điểm cảm ứng
  return Math.hypot(touch2.pageX - touch1.pageX, touch2.pageY - touch1.pageY);
};

/** Xử lý sự kiện di chuyển cảm ứng */
const handleTouchMove = (e: TouchEvent) => {
  // Nếu không có 2 điểm cảm ứng thì thôi
  if (e.touches.length !== 2) return;

  // Ngăn chặn hành vi mặc định để tránh cuộn trang
  e.preventDefault();

  /** khoảng cách giữa 2 ddierm chạm */
  const CURRENT_DISTANCE = getDistance(e.touches[0], e.touches[1]);

  // Nếu khoảng cách ban đầu không được thiết lập thì thôi
  if (initial_distance.value === null) return;

  // Tính toán tỷ lệ zoom dựa trên khoảng cách hiện tại và khoảng cách ban đầu
  const DELTA = (CURRENT_DISTANCE - initial_distance.value) * 0.01;

  // Cập nhật tỷ lệ zoom, giới hạn trong khoảng từ 0.5 đến 5
  scale.value = Math.max(0.5, Math.min(scale.value + DELTA, 5));

  // Cập nhật chiều cao của wrapper sau khi thay đổi tỷ lệ zoom
  initial_distance.value = CURRENT_DISTANCE;
};

/** Xử lý sự kiện kết thúc cảm ứng */
const handleTouchEnd = () => {
  // Đặt lại khoảng cách ban đầu về null khi kết thúc cảm ứng
  initial_distance.value = null;
};

// Theo dõi thay đổi của scale để cập nhật chiều cao
watch(scale, updateWrapperHeight);
</script>
