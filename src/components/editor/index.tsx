import { cx } from 'class-variance-authority';
import { createTiptapEditor } from 'solid-tiptap';
import { extensions } from '../../lib/editor';
import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import Toolbar from '../toolbar';
import style from './style.module.css';
import { debounce } from '../../lib/utilities';
import { invoke } from '@tauri-apps/api/tauri';

export const [isTyping, setIsTyping] = createSignal(false);
export const [data, setData] = createSignal("");

export default function Edit() {
  let ref!: HTMLDivElement;
  let typingTimeout: any;

  // const handleChange = () => {
  //   setIsTyping(true);
  //   clearTimeout(typingTimeout);
  //   typingTimeout = setTimeout(() => {
  //     setIsTyping(false);
  //   }, 1000);
  // };

  const editor = createTiptapEditor(() => ({
    element: ref,
    extensions,
    content: '',
    onUpdate: debounce(({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const title = editor.getJSON().content[0].content[0].text as string;
      setData(json);
      invoke('save_json', { json, name: title.toString() });
    }, 1000)

  }));

  createEffect(() => {
    if (data() !== "") {
      editor()?.commands.setContent(JSON.parse(data()));
      return;
    }
    editor()?.commands.setContent({
      "type": "doc", "content":
        [
          {
            "type": "heading",
            "attrs": { "level": 1 },
            "content": [
              { "type": "text", "text": "Hello World" }
            ]
          }
        ]
    })
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
