import { cx } from 'class-variance-authority';
import { invoke } from "@tauri-apps/api/tauri";
import { createTiptapEditor } from 'solid-tiptap';
import { Show, createSignal, onCleanup } from "solid-js";
import Toolbar from '../toolbar';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count'
import { Editor } from "@tiptap/core";
import style from './style.module.css';

const content = `
<article>
    <h1 id="introduction">Introduction</h1>
    <p>Space, the final frontier. Ever since humanity has looked up at the stars, we have been fascinated by the vastness and mysteries of space. <a href="https://www.nasa.gov" target="_blank">NASA</a> and other space agencies have made great strides in exploring our solar system and beyond.</p>
</article>`

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
  CharacterCount
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
