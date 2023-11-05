import CharacterCount from "@tiptap/extension-character-count"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import StarterKit from "@tiptap/starter-kit"
import style from "../components/editor/style.module.css"

export const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
  }),
  Typography,
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: style.highlight,
    }
  }),
  CharacterCount,
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'paragraph') {
        return 'Start writing...'
      }
      if (node.type.name === 'heading') {
        return 'Title...'
      }
      return 'Type...'
    },
  }),
]
