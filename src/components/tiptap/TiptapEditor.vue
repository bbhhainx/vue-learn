<template>
  <div v-if="editor" class="relative flex flex-col">
    <TiptapMenu :editor="editor" :uploadImage="uploadImage" />
    <EditorContent v-if="display_type === 'wysiwyg'" :editor="editor" />
    <textarea
      v-else
      ref="textarea"
      @input="autoResize"
      class="w-full outline-none border px-5 py-2.5 border-gray-300 p-2 h-max overflow-hidden resize-none"
      v-model="content"
      placeholder="Nhập nội dung ở đây..."
      @paste="handleMarkdownPaste"
    />
    <div class="flex text-[10px] absolute -bottom-5 right-0">
      <button
        class="border px-2 py-0.5 rounded-bl border-r-0"
        :class="{
          'bg-gray-200': display_type === 'wysiwyg',
        }"
        @click="changeDisplayType('wysiwyg')"
      >
        WYSIWYG
      </button>
      <button
        class="border px-2 py-0.5 rounded-br"
        :class="{
          'bg-gray-200': display_type === 'markdown',
        }"
        @click="changeDisplayType('markdown')"
      >
        Markdown
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, nextTick } from "vue";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TiptapMenu from "./TiptapMenu.vue";
import { ImagePlaceholder } from "./extensions/ImagePlaceholder";
import { Node as ProsemirrorNode } from "prosemirror-model";
import { ResizableImage } from "./extensions/ResizableImage";
import { Markdown } from "tiptap-markdown";
import Color from "@tiptap/extension-color";
import { Transaction } from 'prosemirror-state'

/** editor */
const editor = ref<Editor>();

/** nội dung */
const content = ref("<p>Hello Tiptap!</p>");

/** loại hiển thị */
const display_type = ref<"wysiwyg" | "markdown">("wysiwyg");

const textarea = ref<HTMLTextAreaElement | null>(null);

const autoResize = () => {
  const el = textarea.value;
  if (el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }
};
onMounted(() => {
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
      ResizableImage,
      Markdown.configure({
        html: true,
        tightLists: true,
        bulletListMarker: "-",
        linkify: true,
        breaks: true,
      }),
    ],
    content: content.value,
    editorProps: {
      handleDOMEvents: {
        paste: (view, event) => {
          const items = event.clipboardData?.items || [];

          let hasImage = false;

          for (const item of items) {
            if (item.type.startsWith("image")) {
              hasImage = true;

              const file = item.getAsFile();
              if (!file) return false;

              event.preventDefault();

              const id = `${Date.now()}-${Math.random()}`;
              const node = view.state.schema.nodes.imagePlaceholder.create({
                id,
              });

              const tr = view.state.tr.replaceSelectionWith(node);
              view.dispatch(tr);

              uploadImage(file)
                .then((url) => {
                  const pos = findNodePos(
                    view.state.doc,
                    id,
                    "imagePlaceholder"
                  );

                  if (pos !== null) {
                    const imageNode =
                      view.state.schema.nodes.resizableImage.create({
                        src: "https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp",
                      });
                    // Tạo transaction để thay thế node tại vị trí đã cho
                    const tr = view.state.tr.replaceRangeWith(
                      pos,
                      pos + node.nodeSize,
                      imageNode
                    );

                    view.dispatch(tr);
                  }
                })
                .catch(() => {
                  const pos = findNodePos(
                    view.state.doc,
                    id,
                    "imagePlaceholder"
                  );
                  if (pos !== null) {
                    const tr = view.state.tr.delete(pos, pos + 1);
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
    onUpdate: ({ editor }) => {},
  });
});

/** thay đổi loại hiển thị */
function changeDisplayType(type: "wysiwyg" | "markdown") {
  display_type.value = type;
  if (type === "markdown") {
    content.value = editor.value?.storage.markdown.getMarkdown() || "";
    console.log(content.value);
    
    nextTick(() => {
      autoResize();
    });
  } else {
    editor.value?.commands.setContent(content.value);

      nextTick(() => {
        editor.value?.commands.command(({ tr }: { tr: Transaction}) => {
          const doc = tr.doc // Lấy tài liệu từ Transaction
          
          doc.descendants((node, pos) => {
            console.log(node, pos);
            
            if (node.type.name === "paragraph") {
              tr.setNodeMarkup(pos, editor.value?.schema.nodes.resizableImage, {
                ...node.attrs,
                width: "100%",
              });
            }
          });
          editor.value?.view.dispatch(tr);
          return true;
        });
      });
    // Sau đó duyệt qua document và thay đổi node `image` thành `resizableImage`
  }
}

function handleMarkdownPaste(event: ClipboardEvent) {
  const items = Array.from(event.clipboardData?.items || []);
  for (const item of items) {
    if (item.type.indexOf("image") === 0) {
      const file = item.getAsFile();
      if (!file) return false;
      uploadImage(file)
        .then((url) => {
          const imageMarkdown = `![image](https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp)`;
          insertAtCursor(imageMarkdown);
        })
        .catch(() => {
          console.error("Upload failed");
        });
    }
  }
}

function insertAtCursor(text: string) {
  const textarea = document.querySelector("textarea");
  if (!textarea) return;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = textarea.value.substring(0, start);
  const after = textarea.value.substring(end);
  textarea.value = before + text + after;
  textarea.selectionStart = textarea.selectionEnd = start + text.length;
  textarea.focus();
}

// 👉 Hàm upload giả lập
function uploadImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const succeed = Math.random() > 0.2; // 80% success
      if (succeed)
        resolve(URL.createObjectURL(file)); // demo thôi, thay bằng link thật
      else reject(new Error("Upload failed"));
    }, 1500);
  });
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
