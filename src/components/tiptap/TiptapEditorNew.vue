<template>
  <div v-if="editor" class="relative flex flex-col">
    <TiptapMenu
      v-if="type_editor === 'edit'"
      :editor="editor"
      :uploadImage="uploadImage"
    />
    <EditorContent
      :class="{
        'hidden-border': type_editor === 'view',
      }"
      :editor="editor"
    />
  </div>
</template>

<script setup lang="ts">
// * libraries
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import Color from "@tiptap/extension-color";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TableRow from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlock from "@tiptap/extension-code-block";
import { EditorContent, Editor } from "@tiptap/vue-3";
import TableHeader from "@tiptap/extension-table-header";
import { Node as ProsemirrorNode } from "prosemirror-model";
import {
  ref,
  onBeforeUnmount,
  onMounted,
  PropType,
  nextTick,
  computed,
  watch,
} from "vue";
import { marked } from "marked"; // markdown -> html
import TurndownService from "turndown"; // html -> markdown
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { gfm } from "turndown-plugin-gfm"; // hỗ trợ GitHub Flavored Markdown

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw) // Giữ nguyên HTML gốc
  .use(rehypeStringify);

// * custom extensions
import { ImagePlaceholder } from "./extensions/ImagePlaceholder";
import BulletList from "@tiptap/extension-bullet-list";

// * components
import TiptapMenu from "./TiptapMenu.vue";

/** props */
const props = defineProps({
  uploadImage: {
    type: Function as PropType<(file: File) => Promise<string>>,
    default: () => {},
  },
  type_editor: {
    type: String as PropType<"view" | "edit">,
    default: "edit",
  },
});

const turndown = new TurndownService({
  headingStyle: "atx",
  keepReplacement: (content, node) => (node as HTMLElement).outerHTML,
});
turndown.use(gfm); // Kích hoạt hỗ trợ GitHub Flavored Markdown

// Custom rule để giữ nguyên tất cả các thẻ có style inline
turndown.addRule("keep-style-inline", {
  filter: (node) => node.nodeType === 1 && node.hasAttribute("style"),
  replacement: (content, node) => (node as HTMLElement).outerHTML, // giữ nguyên HTML
});
/** editor */
const editor = ref<Editor>();

/** nội dung */
const content = defineModel({
  type: String,
  default: "",
});

const content_markdown = computed(() => {
  return marked.parse(content.value || "");
});

watch(
  () => content.value,
  (newValue) => {
    // nếu là chế độ xem thì không cập nhật editor
    if (props.type_editor !== "view") return;

    // nếu có editor thì cập nhật nội dung
    if (editor.value) {
      editor.value.commands.setContent(marked.parse(newValue || ""));
    }
  },
  { immediate: true }
);

onMounted(() => {
  nextTick(() => {
    if (editor.value) {
      editor.value.destroy();
    }
    // khởi tạo editor
    editor.value = new Editor({
      extensions: [
        Color,
        TextStyle,
        StarterKit.configure({ bulletList: false }),
        // Tạo BulletList custom không có input rule
        BulletList.extend({
          addInputRules() {
            return []; // Tắt hết input rules, không tự chuyển dấu -
          },
        }),
        Underline,
        // TaskList,
        // TaskItem.configure({ nested: true }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Image.configure({ allowBase64: true }),
        Link,
        CodeBlock,
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        ImagePlaceholder,
      ],
      editable: props.type_editor === "edit",
      content: content_markdown.value,
      editorProps: {
        handleDOMEvents: {
          // sự kiện paste vào editor
          paste: (view, event) => {
            // nếu có ảnh trong clipboard
            const ITEMS = event.clipboardData?.items || [];

            // cờ kiểm tra có ảnh không
            let has_image = false;

            // lặp qua mảng dữ liệu trong clipboard
            for (const item of ITEMS) {
              // nếu có ảnh trong clipboard
              if (item.type.startsWith("image")) {
                // bật cờ có ảnh
                has_image = true;

                // lấy dữ liệu file ảnh đó
                const FILE = item.getAsFile();

                // nếu không có thì thôi
                if (!FILE) return false;

                // nếu có thì chặn hành động paste mặc định
                event.preventDefault();

                // tạo 1 id cho node
                const ID = `${Date.now()}-${Math.random()}`;

                // tạo 1 node chứa ảnh
                const NODE = view.state.schema.nodes.imagePlaceholder.create({
                  id: ID,
                });

                // tạo transaction cho editor
                const tr = view.state.tr.replaceSelectionWith(NODE);

                // thêm transaction vào editor để hiển thị
                view.dispatch(tr);

                // gọi hàm up ảnh truyền từ ngoài vào
                props
                  .uploadImage(FILE)
                  .then((url) => {
                    // tìm vị trí của node ảnh
                    const POS = findNodePos(
                      view.state.doc,
                      ID,
                      "imagePlaceholder"
                    );

                    // nếu tìm thấy
                    if (POS !== null) {
                      // tạo 1 node ảnh
                      const IMAGE_NODE = view.state.schema.nodes.image.create({
                        src: url,
                      });

                      // Tạo transaction để thay thế node tại vị trí đã cho
                      const tr = view.state.tr.replaceRangeWith(
                        POS,
                        POS + NODE.nodeSize,
                        IMAGE_NODE
                      );

                      view.dispatch(tr);
                    }
                  })
                  .catch(() => {
                    // nếu lỗi thì xóa node ảnh đã thêm
                    const POS = findNodePos(
                      view.state.doc,
                      ID,
                      "imagePlaceholder"
                    );
                    if (POS !== null) {
                      const tr = view.state.tr.delete(POS, POS + 1);
                      view.dispatch(tr);
                    }
                  });

                return true; // chặn paste mặc định
              }
            }

            return false;
          },
        },
      },
      onUpdate: ({ editor }) => {
        // cập nhật nội dung
        updateContent();
      },
    });

    // cập nhật nội dung
    updateContent();
  });
});

/** hàm lưu lại giá trị theo kiểu dữ liệu được truyền vào */
async function updateContent() {
  const html = editor.value?.getHTML() || "";
  console.log("HTML:", html);

  content.value = turndown.turndown(html);
  console.log("Markdown:", content.value);
}

// 👉 Tìm vị trí node ảnh theo custom attr
function findNodePos(
  doc: ProsemirrorNode,
  id: string,
  nodeTypeName: string
): number | null {
  let foundPos: number | null = null;

  doc.descendants((node, pos) => {
    if (node.type.name === nodeTypeName && node.attrs.id === id) {
      foundPos = pos;
      return false;
    }
    return true;
  });

  return foundPos;
}

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.hidden-border .tiptap {
  border: none !important;
  padding: 20px 0px !important;
}

.tiptap {
  min-height: 70px;
  padding: 10px;
  outline: none;
  border: 1px solid #ccc;
  overflow: hidden;
  height: fit-content;
}

.tiptap ul[data-type="taskList"] > li {
  display: flex;
  align-items: center;
  gap: 3px;
}

.tiptap ul[data-type="taskList"] > li::before {
  display: none !important;
}

.tiptap ul[data-type="taskList"] > li > label {
  position: absolute;
  margin-left: -23px;
  display: flex;
}

.tiptap input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.tiptap ul > li::before {
  position: absolute;
  content: "";
  margin-top: 6px;
  margin-left: -17px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #ccc;
}

.tiptap ol > li::before {
  position: absolute;
  content: "." counter(li);
  margin-left: -28px;
  width: 24px;
  text-align: right;
  direction: rtl;
  color: #aaa;
}

.tiptap ul > li,
.tiptap ol > li {
  position: relative;
  counter-increment: li;
}

.tiptap ul,
.tiptap ol {
  padding: 0 1.5rem;
  margin: 0 1rem 0 0;
  counter-reset: li;
}

.tiptap hr {
  margin: 1rem 0;
  display: block;
}

.tiptap blockquote {
  border-left: 3px solid gray;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.tiptap pre {
  background: black;
  border-radius: 0.5rem;
  color: white;
  font-family: "JetBrainsMono", monospace;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

.tiptap a {
  color: blue;
  text-decoration: none;
}

.tiptap a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.1;
  text-wrap: pretty;
}

.tiptap h1 {
  font-size: 1.8rem;
}

.tiptap h2 {
  font-size: 1.5rem;
}

.tiptap h3 {
  font-size: 1.4rem;
}

.tiptap h4 {
  font-size: 1.3rem;
}

.tiptap h5 {
  font-size: 1.2rem;
}

.tiptap h6 {
  font-size: 1.1rem;
}

.tiptap table {
  border-collapse: collapse;
  margin: 0;
  overflow: hidden;
  table-layout: fixed;
  width: 100%;
}

.tiptap table td,
.tiptap table th {
  border: 1px solid black;
  box-sizing: border-box;
  min-width: 1em;
  padding: 6px 8px;
  position: relative;
  vertical-align: top;
}

.tiptap table th {
  background-color: rgba(0, 0, 0, 0.3);
  font-weight: bold;
  text-align: left;
}

.tiptap table .selectedCell:after {
  background: rgba(0, 0, 0, 0.1);
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  z-index: 2;
}

.tiptap table .column-resize-handle {
  background-color: gray;
  bottom: -2px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
}

.tiptap .tableWrapper {
  margin: 1.5rem 0;
  overflow-x: auto;
}

.tiptap.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

.tiptap img.ProseMirror-selectednode {
  outline: 3px solid blue;
}

.tiptap.ProseMirror {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
