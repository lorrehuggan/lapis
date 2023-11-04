import { invoke } from "@tauri-apps/api/tauri";
import { Show, Suspense, createEffect, createSignal } from "solid-js";
import Card from "./card";
import style from './style.module.css';


export default function Explorer() {
  const [files, setFiles] = createSignal<string[] | []>([]);

  async function getAll() {
    try {
      const response = await invoke('get_all',
        { folder: "/home/lorre/Documents/lapis" }) as string[];
      setFiles(response);
    } catch (error) {
      console.log(error)
    }
  }

  createEffect(() => {
    getAll()
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Show when={files().length > 0}>
        <ul class={style.cards}>
          {files().map((file) => (
            <Card path={file} />
          ))}
        </ul>
      </Show>
    </Suspense>
  )
}
