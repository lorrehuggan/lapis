import { For, Match, Switch } from "solid-js";
import style from "./style.module.css";
import { File } from "lucide-solid";
import { A } from "@solidjs/router";
import { CreateQueryResult } from "@tanstack/solid-query";

type Props = {
  query: CreateQueryResult<string[], Error>
}

export default function FileMenu(props: Props) {
  return (
    <Switch>
      <Match when={props.query.isLoading}>
        <p>Loading...</p>
      </Match>
      <Match when={props.query.isSuccess}>
        <div
          class={style.menu}>
          <ul class={style.menu__items}>
            <For each={props.query.data}>
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
        </div >
      </Match>
      <Match when={props.query.isError}>
        <p>error....</p>
      </Match>
    </Switch>
  )
}
