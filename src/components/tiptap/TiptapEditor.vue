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
    ],
    content: "<p>Hello Tiptap!</p>",
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>
<style>
.tiptap {
  padding: 10px 20px;
  outline: none;
  border: 1px solid #ccc;
}
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
  margin-left: -17px;
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
