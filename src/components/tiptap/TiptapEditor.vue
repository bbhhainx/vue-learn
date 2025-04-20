<template>
  <div v-if="editor">
    <TiptapMenu :editor="editor" />
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import { Color } from "@tiptap/extension-color";
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

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit.configure({ codeBlock: false }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Link,
      CodeBlock,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ImagePlaceholder
    ],
    content: "<p>Hello Tiptap!</p>",
    editorProps: {
      handleDOMEvents: {
        paste: (view, event) => {
          const items = event.clipboardData?.items || [];

          for (const item of items) {
            if (item.type.startsWith("image")) {
              const file = item.getAsFile();
              if (!file) return false;

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
                    const imageNode = view.state.schema.nodes.image.create({
                      src: 'https://cubanvr.com/wp-content/uploads/2023/07/ai-image-generators.webp',
                    });
                    // Tạo transaction để thay thế node tại vị trí đã cho
                    const tr = view.state.tr.replaceRangeWith(pos, pos+ node.nodeSize, imageNode)

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
  });
});

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

<!-- <script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import { ref, onMounted, onBeforeUnmount, type PropType } from 'vue'
import type { Editor } from '@tiptap/core'

interface HeadingOption {
  level: number
  label: string
}

const props = defineProps({
  modelValue: {
    type: String as PropType<string>,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Image
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML() || '')
  }
})

// Xử lý heading
const selectedHeading = ref<HeadingOption | null>(null)
const headingOptions: HeadingOption[] = [
  { level: 1, label: 'Heading 1' },
  { level: 2, label: 'Heading 2' },
  { level: 3, label: 'Heading 3' },
  { level: 0, label: 'Paragraph' }
]

const setHeading = (event: { value: HeadingOption }) => {
  const level = event.value.level as 1 | 2 | 3 | 4 | 5 | 6 | 0
  if (level === 0) {
    editor.value?.chain().focus().setParagraph().run()
  } else {
    editor.value?.chain().focus().toggleHeading({ level }).run()
  }
}

// Xử lý hình ảnh
const fileInput = ref<HTMLInputElement | null>(null)

const openImageDialog = () => {
  fileInput.value?.click()
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      editor.value
        ?.chain()
        .focus()
        .setImage({ src: e.target?.result as string })
        .run()
    }
    reader.readAsDataURL(file)
  }
}

// Xử lý paste ảnh
const handlePaste = (event: ClipboardEvent) => {
  const clipboardData = event.clipboardData
  const items = clipboardData?.items

  if (items) {
    for (const item of items) {
      if (item.type.indexOf('image') !== -1) {
        event.preventDefault()
        const blob = item.getAsFile()
        if (blob) {
          const reader = new FileReader()
          reader.onload = (e) => {
            editor.value
              ?.chain()
              .focus()
              .setImage({ src: e.target?.result as string })
              .run()
          }
          reader.readAsDataURL(blob)
        }
        return
      }
    }
  }
}

// Xử lý paste bằng phím tắt
onMounted(() => {
  window.addEventListener('paste', handlePaste)
})

onBeforeUnmount(() => {
  window.removeEventListener('paste', handlePaste)
})
</script> -->
