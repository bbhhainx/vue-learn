// extensions/ResizableImage.ts
import { Node, mergeAttributes } from '@tiptap/core'

export const ResizableImage = Node.create({
  name: 'resizableImage',

  group: 'inline',
  inline: true,
  atom: true,

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      width: {
        default: '300px',
        parseHTML: element => element.style.width || element.getAttribute('width'),
        renderHTML: attributes => ({
          style: `width: ${attributes.width}`,
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'img[src]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div')
      container.style.position = 'relative'
      container.style.display = 'inline-block'

      const img = document.createElement('img')
      img.src = node.attrs.src
      img.alt = node.attrs.alt || ''
      img.style.width = node.attrs.width || '300px'
      img.style.display = 'block'
      img.style.maxWidth = '100%'

      const handle = document.createElement('div')
      handle.style.width = '7px'
      handle.style.height = '7px'
      handle.style.background = 'black'
      handle.style.position = 'absolute'
      handle.style.right = '0'
      handle.style.bottom = '0'
      handle.style.cursor = 'nwse-resize'

      let startX = 0
      let startWidth = 0

      handle.addEventListener('mousedown', (e) => {
        e.preventDefault()
        startX = e.clientX
        startWidth = img.offsetWidth

        const onMouseMove = (e: MouseEvent) => {
          const newWidth = Math.max(50, startWidth + (e.clientX - startX))
          img.style.width = `${newWidth}px`

          editor.commands.command(({ tr }) => {
            tr.setNodeMarkup(getPos(), undefined, {
              ...node.attrs,
              width: `${newWidth}px`,
            })
            return true
          })
        }

        const onMouseUp = () => {
          window.removeEventListener('mousemove', onMouseMove)
          window.removeEventListener('mouseup', onMouseUp)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
      })

      container.appendChild(img)
      container.appendChild(handle)

      return {
        dom: container,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'resizableImage') return false
          if (updatedNode.attrs.src !== node.attrs.src) return false
          img.src = updatedNode.attrs.src
          img.style.width = updatedNode.attrs.width || '300px'
          return true
        },
      }
    }
  },
})
