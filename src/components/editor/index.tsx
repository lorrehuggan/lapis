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

  const editor = createTiptapEditor(() => ({
    element: ref,
    extensions,
    content: '',
    onUpdate: debounce(async ({ editor }) => {
      const json = JSON.stringify(editor.getJSON());
      const title = editor.getJSON().content[0].content[0].text as string;
      setData(json);
      await invoke('save_json', { json, name: title.toString() });

    }, 1000)

  }));

  createEffect(() => {
    if (data() !== "") {
      editor()?.commands.setContent(JSON.parse(data()));
      return;
    }
    editor()?.commands.setContent(`
<article>
  <h1>Fujifilm Cameras: Blending Tradition with Innovation</h1>
  
  <p><strong>Fujifilm</strong> has been a mainstay in the camera industry, known for combining traditional photography with modern technology.</p>

  <p>From the analog classics to the latest mirrorless models, Fujifilm cameras are <u>renowned for their image quality, distinctive color reproduction</u>, and innovative features. The company has made significant strides in developing the X-Series, which caters to both professional photographers and enthusiasts alike.</p>

  <p>The <mark>X-T4</mark>, Fujifilm's flagship model, continues to impress with its retro design and cutting-edge performance. It’s a testament to Fujifilm’s dedication to continuous improvement and attention to detail.</p>

  <p><strong>Bold Design Choices:</strong> Fujifilm's unique approach to camera design, which often features a retro aesthetic, harkens back to the golden age of film while delivering modern digital capabilities.</p>

  <p>With a focus on tactile controls, photographers can enjoy the experience of <u>dialing in</u> their settings. This tactile experience is a signature element that sets Fujifilm apart in the digital era.</p>
  
  <p><strong>Color Science Mastery:</strong> A key feature of Fujifilm cameras is their color reproduction, which is steeped in the brand's history of film manufacturing. The <mark>Film Simulation modes</mark> are a favorite among photographers, allowing them to achieve the look of classic Fujifilm film stocks in-camera.</p>
</article>
`)
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
