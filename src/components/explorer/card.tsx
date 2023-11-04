import { Show, createEffect, createSignal } from 'solid-js';
import style from './card.module.css'
import { invoke } from '@tauri-apps/api/tauri';
import { ArrowRight } from 'lucide-solid';
import { A } from '@solidjs/router';
import { createTiptapEditor } from 'solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import Highlight from '@tiptap/extension-highlight';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder';

type Props = {
  path: string;
}

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


export default function Card(props: Props) {
  let ref!: HTMLDivElement;
  const [html, setHTML] = createSignal<string>('');

  async function getHTML() {
    try {
      const response = await invoke('get_html', { file: props.path }) as string;
      setHTML(response);

    } catch (error) {
      console.log(error)
    }
  }

  const editor = createTiptapEditor(() => ({
    element: ref,
    extensions,
    content: html(),
  }));

  createEffect(() => {
    editor()?.setEditable(false)
  })

  createEffect(() => {
    getHTML()
  })

  return (
    <div class={style.card}>
      <Show when={html().length} fallback={
        <div>Loading...</div>
      }>
        <>
          <article class={style.card__html} id="editor" ref={ref} />
          <div class={style.card__svg}>
            <A href={`/explorer/${props.path}`}>
              <ArrowRight size={24} />
            </A>
          </div>
        </>
      </Show>
    </div>
  )
}
