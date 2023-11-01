import { Editor } from "@tiptap/core"

function italicToggle(editor: Editor) {
  editor.chain().focus().toggleItalic().run()
}

function boldToggle(editor: Editor | any) {
  if (!editor) return
  editor.chain().focus().toggleBold().run()
}

function codeToggle(editor: Editor) {
  editor.chain().focus().toggleCode().run()
}

function strikeToggle(editor: Editor) {
  editor.chain().focus().toggleStrike().run()
}

function blockquoteToggle(editor: Editor) {
  editor.chain().focus().toggleBlockquote().run()
}

function highlightToggle(editor: Editor) {
  editor.chain().focus().toggleHighlight().run()
}

function undo(editor: Editor) {
  editor.chain().focus().undo().run()
}

function redo(editor: Editor) {
  editor.chain().focus().redo().run()
}


export {
  italicToggle,
  boldToggle,
  codeToggle,
  strikeToggle,
  blockquoteToggle,
  highlightToggle,
  undo,
  redo
}
