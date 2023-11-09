import { cx } from 'class-variance-authority';
import { createTiptapEditor } from 'solid-tiptap';
import { extensions } from '../../lib/editor';
import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import Toolbar from '../toolbar';
import style from './style.module.css';
import { debounce } from '../../lib/utilities';
import { invoke } from '@tauri-apps/api/tauri';
import { useParams } from "@solidjs/router";
import { createQuery } from '@tanstack/solid-query';

export const [isTyping, setIsTyping] = createSignal(false);
export const [data, setData] = createSignal("");

export default function Edit() {
  let ref!: HTMLDivElement;
  let typingTimeout: any;
  const params = useParams();
  const query = createQuery<string>(() => ({
    queryKey: [`file-${params.route}`],
    queryFn: async () => {
      const path = params.route.split('-').join(' ');
      const result = await invoke('get_json',
        { file: `/home/lorre/Documents/${path}.json` }) as string
      return result
    },
    // refetchInterval: 1500,
    refetchOnWindowFocus: true,
  }))

  const editor = createTiptapEditor(() => ({
    element: ref,
    extensions,
    content: '',
    onUpdate: debounce(async ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const title = editor.getJSON().content[0].content[0].text as string;
      await invoke('save_json', { json, name: title.toString() });
    }, 1000)
  }));

  createEffect(() => {
    if (!query.data) return;
    editor()?.commands.setContent(JSON.parse(query.data));
  })

  onCleanup(() => {
    clearTimeout(typingTimeout);
    editor()?.destroy();
  });


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
