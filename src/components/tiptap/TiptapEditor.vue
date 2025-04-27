<template>
  <div v-if="editor" class="relative flex flex-col">
    <TiptapMenu :editor="editor" :uploadImage="uploadImage" />
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
// * libraries
import Link from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
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
import { ref, onBeforeUnmount, onMounted, PropType } from "vue";

// * custom extensions
import { ResizableImage } from "./extensions/ResizableImage";
import { ImagePlaceholder } from "./extensions/ImagePlaceholder";

// * components
import TiptapMenu from "./TiptapMenu.vue";

/** props */
const props = defineProps({
  uploadImage: {
    type: Function as PropType<(file: File) => Promise<string>>,
    default: () => {},
  },
  type_content: {
    type: String as PropType<"markdown" | "html">,
    default: "html",
  },
});

/** editor */
const editor = ref<Editor>();

/** nội dung */
const content = defineModel({
  type: String,
  default: "",
});

onMounted(() => {
  // khởi tạo editor
  editor.value = new Editor({
    extensions: [
      Color,
      TextStyle,
      StarterKit.configure({ codeBlock: false }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ allowBase64: true }),
      Link,
      CodeBlock,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ImagePlaceholder,
      // ResizableImage,
      Markdown.configure({
        html: true,
        tightLists: true,
        bulletListMarker: "-",
        linkify: true,
        breaks: true,
        transformPastedText:true
      }),
    ],
    content: content.value,
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
                    // const imageNode =
                    //   view.state.schema.nodes.resizableImage.create({
                    //     src: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp",
                    //   });

                    // tạo 1 node ảnh
                    const IMAGE_NODE =
                      view.state.schema.nodes.image.create({
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
      updateContent()
    },
  });

  // cập nhật nội dung
  updateContent()
});

/** hàm lưu lại giá trị theo kiểu dữ liệu được truyền vào */
function updateContent() {
  // nếu là markdown thì cập nhật nội dung markdown
  if (props.type_content === "markdown") {
    content.value = editor.value?.storage.markdown.getMarkdown() || '';
  }
  // nếu là html thì cập nhật nội dung html
  else {
    content.value = editor.value?.getHTML() || '';
  }
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
<style lang="scss">
.tiptap {
  min-height: 70px;
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ccc;
  ul[data-type="taskList"] > li {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  ul[data-type="taskList"] > li::before {
    display: none !important;
  }
  ul[data-type="taskList"] > li > label {
    position: absolute;
    margin-left: -23px;
    display: flex;
  }
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
  ul > li::before {
    position: absolute;
    content: "";
    margin-top: 6px;
    margin-left: -17px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #ccc;
  }
  ol > li::before {
    position: absolute;
    content: "." counter(li);
    margin-left: -28px;
    width: 24px;
    text-align: right;
    direction: rtl;
    color: #aaa;
  }
  ul > li,
  ol > li {
    position: relative;
    counter-increment: li;
  }
  ul,
  ol {
    padding: 0 1.5rem;
    margin: 0 1rem 0 0;
    counter-reset: li;
  }
  hr {
    margin: 1rem 0;
    display: block;
  }

  blockquote {
    border-left: 3px solid gray;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  pre {
    background: black;
    border-radius: 0.5rem;
    color: white;
    font-family: "JetBrainsMono", monospace;
    margin: 1rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }
  a {
    color: blue;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    text-wrap: pretty;
  }
  h1 {
    font-size: 1.8rem;
  }
  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.4rem;
  }
  h4 {
    font-size: 1.3rem;
  }
  h5 {
    font-size: 1.2rem;
  }
  h6 {
    font-size: 1.1rem;
  }
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  }
  table td,
  table th {
    border: 1px solid black;
    box-sizing: border-box;
    min-width: 1em;
    padding: 6px 8px;
    position: relative;
    vertical-align: top;
  }

  table th {
    background-color: rgba(0, 0, 0, 0.3);
    font-weight: bold;
    text-align: left;
  }

  table .selectedCell:after {
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

  table .column-resize-handle {
    background-color: gray;
    bottom: -2px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: 0;
    width: 4px;
  }

  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
  img.ProseMirror-selectednode {
    outline: 3px solid blue;
  }
}
</style>
