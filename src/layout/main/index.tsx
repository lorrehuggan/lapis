import Navigation from "../../components/navigation";
import { Toaster } from "solid-sonner";
import style from "./style.module.css";
import { children } from "solid-js";
import { JSX } from "solid-js";

type Props = {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: Props) {
  const c = children(() => props.children);
  return (
    <div class={style.app}>
      <Toaster invert />
      <Navigation />
      <div class={style.app__main}>
        {c()}
      </div>
    </div>
  )
}
