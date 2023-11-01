import { Show, createSignal, onCleanup } from "solid-js";
import { createTiptapEditor } from 'solid-tiptap';
import Toolbar from '../toolbar';
import { cx } from 'class-variance-authority';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count'
import style from './style.module.css';

const content = `
<article>
    <h2 id="introduction">Introduction</h2>
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

  const editor = createTiptapEditor(() => ({
    element: ref,
    extensions,
    content,
    onUpdate: ({ editor }) => {
      handleChange();
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
      <div id="editor" ref={ref} class={cx(style.editor, 'container')} />
    </>
  );
}
