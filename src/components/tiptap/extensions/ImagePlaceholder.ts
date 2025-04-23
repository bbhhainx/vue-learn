
import {  mergeAttributes, Node, } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import ImagePlaceholderComponent from './../ImagePlaceholderComponent.vue'

export const ImagePlaceholder = Node.create({
  name: 'imagePlaceholder',

  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: 'image-placeholder' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['image-placeholder', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(ImagePlaceholderComponent)
  },
})
