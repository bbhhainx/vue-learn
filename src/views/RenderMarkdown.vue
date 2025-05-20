<template>
  <div class="h-dvh w-dvh flex flex-col overflow-auto">
    <div v-for="i in 200" class="markdown-body">
      <VueMarkdown :source="src2" :plugins="[imgLazyload]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import VueMarkdown from "vue-markdown-render";
import { imgLazyload } from "@mdit/plugin-img-lazyload";

const startTime = performance.now();
/** nội dung markdown */
const src2 = `
# Tiêu đề H1

Đây là một đoạn văn **in đậm**, *in nghiêng*, và [liên kết](https://example.com).

## Tiêu đề H2

### Danh sách gạch đầu dòng:
- Mục 1
- Mục 2
- Mục 3

### Danh sách đánh số:
1. Bước một
2. Bước hai
3. Bước ba

### Ảnh:
![Ảnh mẫu](https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg)

### Code Block (JavaScript):
\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Bảng dữ liệu:

| Tên | Tuổi | Nghề nghiệp |
|-----|------|-------------|
| An  | 25   | Lập trình viên |
| Bảo | 30   | Thiết kế      |
| Cường | 22 | Tester        |

> Đây là một blockquote (trích dẫn).

---

_Tạo bởi hệ thống tự động._
`.trim();

onMounted(() => {
  const endTime = performance.now();
  console.log(
    `[Render Time] Component mounted in ${(endTime - startTime).toFixed(2)}ms`
  );
});
</script>

<style scoped></style>
