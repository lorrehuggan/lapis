import { For, Show } from "solid-js";
import style from "./style.module.css";
import { File } from "lucide-solid";
import { A } from "@solidjs/router";

type Props = {
  fileNames: string[];
}

export default function FileMenu(props: Props) {
  return (
    <div
      class={style.menu}>
      <Show when={props.fileNames.length > 0} fallback={<div>No files</div>}>
        <ul class={style.menu__items}>
          <For each={props.fileNames}>
            {(fileName) =>
              <li class={style['menu__items-item']}>
                <A href={`/editor/${fileName.split('/').pop()?.split('.')[0]}`}>
                  <span><File size={12} /></span>
                  {fileName.split('/').pop()?.split('.')[0]}
                </A>
              </li>
            }
          </For>
        </ul>
      </Show>
    </div >
  )
}
