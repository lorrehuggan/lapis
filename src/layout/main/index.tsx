import Navigation from "../../components/navigation";
import { Toaster } from "solid-sonner";
import style from "./style.module.css";
import { children } from "solid-js";
import { JSX } from "solid-js";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query'

const queryClient = new QueryClient()

type Props = {
  children: JSX.Element | JSX.Element[];
}

export default function Layout(props: Props) {
  const c = children(() => props.children);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster invert />
        <div class={style.app}>
          <Navigation />
          <div class={style.app__main}>
            {c()}
          </div>
        </div>
      </QueryClientProvider>
    </>
  )
}
