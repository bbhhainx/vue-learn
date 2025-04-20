<template>
  <div class="menu-bar">
    <button @click="command('undo')">
      <UndoIcon class="w-5 h-5" />
    </button>
    <button @click="command('redo')">
      <RedoIcon class="w-5 h-5" />
    </button>

    <span class="divider" />

    <DropBox
      v-model="open_heading"
      :close="() => open_heading = false"
      >
    <template #trigger>
      <button
        @click="open_heading = !open_heading"
        class="flex items-center justify-between cursor-pointer text-sm gap-2 w-36"
        :class="{ 'text-[#007bff] !border-[#007bff] !bg-[#e0f0ff]': editor?.isActive('heading') }"
      >
        <template v-for="heading in HEADING">
          <span class="text-[#007bff]" v-if="editor?.isActive('heading', { level: heading.level })">
            {{ heading.label }}
          </span>
        </template>
        <span v-if="!editor?.isActive('heading')">Paragraph</span>
        <ChevronDownIcon class="w-4 h-4" />
      </button>
    </template>
    <template #content>
      <div
        v-if="open_heading"
        class="w-36 bg-white border border-gray-300 rounded shadow-lg p-2 z-10"
      >
        <div
          class="hover:bg-slate-100 rounded-md py-1 px-2 cursor-pointer"
          @click="() => {
            editor?.chain().focus().setParagraph().run()
            open_heading = false
          }"
          :class="{
            '!bg-blue-200': !editor?.isActive('heading')
          }"
        >
          Paragraph
        </div>
        <template v-for="heading in HEADING">
          <div
            class="hover:bg-slate-100 rounded-md py-1 px-2 cursor-pointer"
            @click="changeHeading(heading.level)"
            :class="{
              '!bg-blue-200': editor?.isActive('heading', {
                level: heading.level,
              }),
            }"
          >
            {{ heading.label }}
          </div>
        </template>
      </div>
      </template>
    </DropBox>
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
      <div class="w-5 h-5 flex items-center justify-center">☑</div>
    </button>

    <button
      @click="alignText('left')"
      :class="{ active: editor?.isActive({ textAlign: 'left' }) }"
    >
      <TextAlignLeftIcon class="w-5 h-5" />
    </button>
    <button
      @click="alignText('center')"
      :class="{ active: editor?.isActive({ textAlign: 'center' }) }"
    >
      <TextAlignCenterIcon class="w-5 h-5" />
    </button>
    <button
      @click="alignText('right')"
      :class="{ active: editor?.isActive({ textAlign: 'right' }) }"
    >
      <TextAlignRightIcon class="w-5 h-5" />
    </button>

    <span class="divider" />

    <button @click="insertTable">
      <TableIcon class="w-5 h-5" />
    </button>
    <button @click="insertImage">
      <ImageIcon class="w-5 h-5" />
    </button>
    <button @click="setLink">
      <LinkIcon class="w-5 h-5" />
    </button>
    <button
      @click="command('toggleCodeBlock')"
      :class="{ active: editor?.isActive('codeBlock') }"
    >
      <CodeIcon class="w-5 h-5" />
    </button>
  </div>
</template>

<script lang="ts" setup>
// * Libraries
import { ref } from "vue";
import type { Editor } from "@tiptap/vue-3";

// * Components
import DropBox from "../DropBox.vue";

// * Icons
import BoldIcon from "./icons/BoldIcon.vue";
import LinkIcon from "./icons/LinkIcon.vue";
import CodeIcon from "./icons/CodeIcon.vue";
import UndoIcon from "./icons/UndoIcon.vue";
import RedoIcon from "./icons/RedoIcon.vue";
import ImageIcon from "./icons/ImageIcon.vue";
import TableIcon from "./icons/TableIcon.vue";
import ItalicIcon from "./icons/ItalicIcon.vue";
import BlockQuoteIcon from "./icons/BlockQuoteIcon.vue";
import ListBulletIcon from "./icons/ListBulletIcon.vue";
import NumberListIcon from "./icons/NumberListIcon.vue";
import ChevronDownIcon from "./icons/ChevronDownIcon.vue";
import StrikeThroughIcon from "./icons/StrikeThroughIcon.vue";
import TextAlignLeftIcon from "./icons/TextAlignLeftIcon.vue";
import TextAlignRightIcon from "./icons/TextAlignRightIcon.vue";
import TextAlignCenterIcon from "./icons/TextAlignCenterIcon.vue";

// * Interfaces
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** props */
const props = defineProps<{
  editor: Editor;
}>();

/** Đóng mở select chọn heading */
const open_heading = ref(false);

/** Danh sách các cấp heading */
const HEADING: {
  level: HeadingLevel;
  label: string;
}[] = [
  { level: 1, label: "Heading 1" },
  { level: 2, label: "Heading 2" },
  { level: 3, label: "Heading 3" },
  { level: 4, label: "Heading 4" },
  { level: 5, label: "Heading 5" },
  { level: 6, label: "Heading 6" },
];

/** Hàm xử lý các lệnh */
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
    case "undo":
      props.editor.commands.undo();
      break;
    case "redo":
      props.editor.commands.redo();
      break;
    default:
      break;
  }
};

/** Hàm xử lý thay đổi heading */
const changeHeading = (level: HeadingLevel) => {
  props.editor.chain().focus().toggleHeading({ level: level }).run();
  open_heading.value = false;
};

/** Hàm xử lý căn chỉnh văn bản */
const alignText = (alignment: "left" | "center" | "right") => {
  props.editor.chain().focus().setTextAlign(alignment).run();
};

/** Hàm xử lý chèn bảng */
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

<style lang="scss" scoped>
.menu-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: #f9fafb;
  border: 1px solid #ddd;
  border-radius: 6px;

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
}
</style>
