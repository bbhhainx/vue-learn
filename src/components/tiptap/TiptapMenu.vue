<template>
  <div class="menu-bar">
    <select
      @input="(e:Event) => {
      const TARGET = e?.target as HTMLSelectElement
      const VALUE = Number(TARGET?.value) as 1 | 2 | 3 | 4 | 5 | 6
      changeHeading(VALUE)
    }"
    >
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
      <option value="4">Heading 4</option>
      <option value="5">Heading 5</option>
      <option value="6">Heading 6</option>
    </select>
    <button
      @click="command('toggleBold')"
      :class="{ active: editor?.isActive('bold') }"
    >
      <BoldIcon class="w-5 h-5" />
    </button>
    <button
      @click="command('toggleItalic')"
      :class="{ active: editor?.isActive('italic') }"
    >
      <ItalicIcon class="w-5 h-5" />
    </button>
    <button
      @click="command('toggleStrike')"
      :class="{ active: editor?.isActive('strike') }"
    >
      <StrikeThroughIcon class="w-5 h-5" />
    </button>

    <span class="divider" />

    <button @click="command('setHorizontalRule')">
      <div class="w-5 h-5">—</div>
    </button>
    <button
      @click="command('toggleBlockquote')"
      :class="{ active: editor?.isActive('blockquote') }"
    >
      <BlockQuoteIcon class="w-5 h-5" />
    </button>

    <span class="divider" />

    <button
      @click="command('toggleBulletList')"
      :class="{ active: editor?.isActive('bulletList') }"
    >
      <ListBulletIcon class="w-5 h-5" />
    </button>
    <button
      @click="command('toggleOrderedList')"
      :class="{ active: editor?.isActive('orderedList') }"
    >
      <NumberListIcon class="w-5 h-5" />
    </button>
    <button
      @click="command('toggleTaskList')"
      :class="{ active: editor?.isActive('taskList') }"
    >
      <div class="w-5 h-5 flex items-center justify-center">
        ☑
      </div>
    </button>

    <button
      @click="alignText('left')"
      :class="{ active: editor?.isActive({ textAlign: 'left' }) }"
    >
      ⇤
    </button>
    <button
      @click="alignText('center')"
      :class="{ active: editor?.isActive({ textAlign: 'center' }) }"
    >
      ⇥⇤
    </button>
    <button
      @click="alignText('right')"
      :class="{ active: editor?.isActive({ textAlign: 'right' }) }"
    >
      ⇥
    </button>

    <span class="divider" />

    <button @click="insertTable">📊</button>
    <button @click="insertImage">🖼</button>
    <button @click="setLink">🔗</button>
    <button
      @click="command('toggleCodeBlock')"
      :class="{ active: editor?.isActive('codeBlock') }"
    >
      { }
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import type { Editor } from "@tiptap/vue-3";
import BoldIcon from "./icons/BoldIcon.vue";
import ItalicIcon from "./icons/ItalicIcon.vue";
import { Strike } from "element-tiptap";
import StrikeThroughIcon from "./icons/StrikeThroughIcon.vue";
import BlockQuoteIcon from "./icons/BlockQuoteIcon.vue";
import ListBulletIcon from "./icons/ListBulletIcon.vue";
import NumberListIcon from "./icons/NumberListIcon.vue";

const props = defineProps<{
  editor: Editor;
}>();

const command = (cmd: string) => {
  switch (cmd) {
    case "toggleBold":
      props.editor.chain().focus().toggleBold().run();
      break;
    case "toggleItalic":
      props.editor.chain().focus().toggleItalic().run();
      break;
    case "toggleStrike":
      props.editor.chain().focus().toggleStrike().run();
      break;
    case "toggleBlockquote":
      props.editor.chain().focus().toggleBlockquote().run();
      break;
    case "toggleBulletList":
      props.editor.chain().focus().toggleBulletList().run();
      break;
    case "toggleOrderedList":
      props.editor.chain().focus().toggleOrderedList().run();
      break;
    case "toggleTaskList":
      props.editor.chain().focus().toggleTaskList().run();
      break;
    case "toggleCodeBlock":
      props.editor.chain().focus().toggleCodeBlock().run();
      break;
    case "setHorizontalRule":
      props.editor.chain().focus().setHorizontalRule().run();
      break;
    case "indent":
      props.editor.commands.sinkListItem("listItem");
      break;
    case "outdent":
      props.editor.commands.liftListItem("listItem");
      break;
    default:
      break;
  }
};

const changeHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  props.editor.chain().focus().toggleHeading({ level: level }).run();
};

const isHeadingActive = computed(() =>
  props.editor?.isActive("heading", { level: 2 })
);

const alignText = (alignment: "left" | "center" | "right") => {
  props.editor.chain().focus().setTextAlign(alignment).run();
};

const insertTable = () => {
  props.editor
    .chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run();
};

const insertImage = () => {
  const url = prompt("Image URL");
  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
};

const setLink = () => {
  const url = prompt("Enter link URL");
  if (url) {
    props.editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }
};
</script>

<style scoped>
.menu-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 6px;
}

button {
  background: transparent;
  border: 1px solid #ccc;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
}

button.active {
  background-color: #e0f0ff;
  border-color: #007bff;
  color: #007bff;
}

.divider {
  width: 1px;
  height: 20px;
  background-color: #ddd;
  margin: 0 6px;
}
</style>
