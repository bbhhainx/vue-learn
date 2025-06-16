<template>
  <div class="outer-container">
    <div 
      class="zoom-wrapper w-full overflow-x-auto overflow-y-hidden" 
      ref="zoomWrapper"
      :style="{ minHeight: wrapperHeight + 'px' }"
    >
      <div 
        class="content-container" 
        ref="content"
        :style="contentStyle"
        @touchstart="handleTouchStart"
      >
        <slot>
          <h2>Nội dung có thể Zoom</h2>
          <p>Thử zoom bằng hai ngón tay trên màn hình cảm ứng hoặc sử dụng chuột (Ctrl + Scroll)</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Chiều cao hiện tại: {{ wrapperHeight }}px</p>
          <p>Tỷ lệ zoom: {{ (scale * 100).toFixed(0) }}%</p>
        </slot>
      </div>
    </div>
    
    <div class="button-container">
      <button v-for="i in 5" :key="i" @click="handleButtonClick(i)">
        Nút {{ i }}
      </button>
      <button @click="resetZoom">Reset Zoom</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';

const scale = ref(1);
const wrapperHeight = ref(300);
const initialDistance = ref(null);

const zoomWrapper = ref(null);
const content = ref(null);

// Tính toán style cho nội dung
const contentStyle = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: '0 0',
  width: '100%',
  display: 'block',
}));

// Hàm cập nhật chiều cao wrapper
const updateWrapperHeight = () => {
  nextTick(() => {
    if (content.value) {
      // Tính toán chiều cao chính xác sau khi zoom
      const contentHeight = content.value.scrollHeight;
      wrapperHeight.value = contentHeight * scale.value;
    }
  });
};

// Theo dõi thay đổi của scale để cập nhật chiều cao
watch(scale, updateWrapperHeight);

// Xử lý sự kiện zoom bằng chuột
const handleWheel = (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale.value = Math.max(0.5, Math.min(scale.value + delta, 3));
  }
};

// Tính khoảng cách giữa 2 điểm cảm ứng
const getDistance = (touch1, touch2) => {
  return Math.hypot(
    touch2.pageX - touch1.pageX,
    touch2.pageY - touch1.pageY
  );
};

// Xử lý sự kiện cảm ứng
const handleTouchStart = (e) => {
  if (e.touches.length === 2) {
    e.preventDefault();
    initialDistance.value = getDistance(e.touches[0], e.touches[1]);
  } 
};

const handleTouchMove = (e) => {
  // alert(e.touches.length);
  if (e.touches.length === 2) {
    e.preventDefault();
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    if (initialDistance.value !== null) {
      const delta = (currentDistance - initialDistance.value) * 0.01;
      scale.value = Math.max(0.5, Math.min(scale.value + delta, 3));
    }
    initialDistance.value = currentDistance;
  }
};

const handleTouchEnd = () => {
  initialDistance.value = null;
};

// Xử lý click nút
const handleButtonClick = (index) => {
  console.log(`Button ${index} clicked`);
};

// Reset zoom
const resetZoom = () => {
  scale.value = 1;
};

// Đăng ký sự kiện
onMounted(() => {
  if (content.value) {
    content.value.addEventListener('wheel', handleWheel, { passive: false });
    content.value.addEventListener('touchmove', handleTouchMove, { passive: false });
    content.value.addEventListener('touchend', handleTouchEnd);
    
    // Cập nhật chiều cao ban đầu
    updateWrapperHeight();
    
    // Thêm ResizeObserver để theo dõi thay đổi nội dung
    const resizeObserver = new ResizeObserver(updateWrapperHeight);
    resizeObserver.observe(content.value);
    
    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  }
});

onUnmounted(() => {
  if (content.value) {
    content.value.removeEventListener('wheel', handleWheel);
    content.value.removeEventListener('touchmove', handleTouchMove);
    content.value.removeEventListener('touchend', handleTouchEnd);
  }
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.outer-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.zoom-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  border-radius: 8px;
  min-height: 300px;
  border: 1px dashed #ccc; /* Để dễ nhận biết kích thước */
}

.content-container {
  padding: 20px;
  font-size: 18px;
  line-height: 1.6;
  transition: transform 0.1s ease;
  display: block;
  width: 100%;
  transform-origin: top center;
}

.button-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 0;
}

button {
  padding: 12px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  flex: 1;
  min-width: 120px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

/* Hiệu ứng khi kéo */
.content-container.grabbing {
  cursor: grabbing;
  user-select: none;
}
</style>