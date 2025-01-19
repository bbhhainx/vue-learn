<template>
  <div>
    <h1>Lexical Basic - Vanilla JS</h1>
    <div class="editor-wrapper">
      <div id="lexical-editor" contenteditable></div>
    </div>
    <h4>Editor state:</h4>
    <textarea id="lexical-state"></textarea>
  </div>
</template>
<script setup lang="ts">
import { registerDragonSupport } from "@lexical/dragon";
import { createEmptyHistoryState, registerHistory } from "@lexical/history";
import { HeadingNode, QuoteNode, registerRichText } from "@lexical/rich-text";
import { mergeRegister } from "@lexical/utils";
import { createEditor } from "lexical";
import prepopulatedRichText from "../helper/prepopulatedRichText";
import { onMounted } from "vue";

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <h1>Lexical Basic - Vanilla JS</h1>
//     <div class="editor-wrapper">
//       <div id="lexical-editor" contenteditable></div>
//     </div>
//     <h4>Editor state:</h4>
//     <textarea id="lexical-state"></textarea>
//   </div>
// `;
onMounted(() => {
  const editorRef = document.getElementById("lexical-editor");
  const stateRef = document.getElementById(
    "lexical-state"
  ) as HTMLTextAreaElement;

  const initialConfig = {
    namespace: "Vanilla JS Demo",
    // Register nodes specific for @lexical/rich-text
    nodes: [HeadingNode, QuoteNode],
    onError: (error: Error) => {
      throw error;
    },
    theme: {
      // Adding styling to Quote node, see styles.css
      quote: "PlaygroundEditorTheme__quote",
    },
  };
  const editor = createEditor(initialConfig);
  editor.setRootElement(editorRef);

  // Registring Plugins
  mergeRegister(
    registerRichText(editor),
    registerDragonSupport(editor),
    registerHistory(editor, createEmptyHistoryState(), 300)
  );

  editor.update(prepopulatedRichText, { tag: "history-merge" });

  editor.registerUpdateListener(({ editorState }) => {
    stateRef!.value = JSON.stringify(editorState.toJSON(), undefined, 2);
  });
});
</script>
<style scoped>
.editor-wrapper {
  border: 2px solid gray;
}
#lexical-state {
  width: 100%;
  height: 300px;
}

.PlaygroundEditorTheme__quote {
  margin: 0;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  color: rgb(101, 103, 107);
  border-left-color: rgb(206, 208, 212);
  border-left-width: 4px;
  border-left-style: solid;
  padding-left: 16px;
}
</style>
