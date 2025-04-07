<template>
  <div class="p-4">
    <div>
      <div class="flex gap-2">
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor?.isActive('paragraph') }"
        >
          Paragraph
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor?.isActive('bold') }"
        >
          Bold
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor?.isActive('italic') }"
        >
          Italic
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor?.isActive('strike') }"
        >
          Strike
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().toggleHighlight().run()"
          :class="{ 'is-active': editor?.isActive('highlight') }"
        >
          Highlight
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }"
        >
          Left
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }"
        >
          Center
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }"
        >
          Right
        </button>
        <button
          class="p-2 rounded-md bg-slate-200"
          @click="editor?.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor?.isActive({ textAlign: 'justify' }) }"
        >
          Justify
        </button>
      </div>
    </div>
    <div class="border-2 border-slate-300 rounded-md mt-2 p-2">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
const editor = useEditor({
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Highlight.configure({
      multicolor: true,
    }),
  ],
});
</script>
