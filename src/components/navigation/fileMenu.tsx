import { For } from "solid-js";
import style from "./style.module.css";
import { ArrowRight, File } from "lucide-solid";
import { A } from "@solidjs/router";
import { CreateQueryResult } from "@tanstack/solid-query";

type Props = {
  query: CreateQueryResult<string[], Error>
}

export default function FileMenu(props: Props) {
  return (
    <div
      class={style.menu}>
      <ul class={style.menu__items}>
        <For each={props.query.data}>
          {(fileName) =>
            <A class={style['menu__items-item']} href={`/editor/${fileName.split('/').pop()?.split('.')[0].split(' ').join('-')}`}>
              <li >
                <div>
                  <File size={12} />
                  <p>
                    {fileName.split('/').pop()?.split('.')[0]}
                  </p>
                </div>
                <span>
                  <ArrowRight class="menu__items-item__arrow" size={12} />
                </span>
              </li>
            </A>
          }
        </For>
      </ul>
    </div >
  )
}
