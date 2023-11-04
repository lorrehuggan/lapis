import { cx } from 'class-variance-authority';
import { invoke } from "@tauri-apps/api/tauri";
import { createTiptapEditor } from 'solid-tiptap';
import { Show, createSignal, onCleanup } from "solid-js";
import Toolbar from '../toolbar';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { Editor } from "@tiptap/core";
import style from './style.module.css';

const content = `
<h1>Heading 1</h1>
<p>This is a paragraph.</p>
`

const extensions = [
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

export const [isTyping, setIsTyping] = createSignal(false);

export default function Edit() {
  let ref!: HTMLDivElement;
  let typingTimeout: any;

  const handleChange = () => {
    setIsTyping(true);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  onCleanup(() => {
    clearTimeout(typingTimeout);
  });

  async function save(editor: Editor) {
    let fileName = "lit"
    const response = invoke('save_file', { html: editor.getHTML(), name: fileName })
    return response
  }

  const editor = createTiptapEditor(() => ({
    element: ref,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      handleChange();
      save(editor);
      console.log(editor.getJSON());
    }
  }));

  return (
    <>
      <Show when={editor()}>
        {(instance) =>
        (
          <>
            <Toolbar editor={instance} />
          </>
        )}
      </Show>
      <article id="editor" ref={ref} class={cx(style.editor, 'container')} />
    </>
  );
}
