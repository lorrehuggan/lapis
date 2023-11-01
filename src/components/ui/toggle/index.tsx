import { ToggleButton } from "@kobalte/core";
import { JSX, Show, createEffect, createSignal } from "solid-js";
import style from "./style.module.css";

type Props = {
  icon: JSX.Element;
  label: string;
  active: boolean
  fn: () => void
}

export default function Toggle(props: Props) {
  const [pressed, setPressed] = createSignal(false);

  createEffect(() => {
    setPressed(props.active)
  })

  return (
    <ToggleButton.Root
      pressed={pressed()}
      onChange={setPressed}
      class={style['toggle-button']}
      aria-label={props.label}
      onClick={() => props.fn()}
    >
      {state => (
        <Show when={state.pressed()} fallback={props.icon}>
          {props.icon}
        </Show>
      )}
    </ToggleButton.Root>
  )
}
