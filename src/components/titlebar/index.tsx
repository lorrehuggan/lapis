import { appWindow } from '@tauri-apps/api/window'

import style from "./style.module.css"
import Button from '../ui/button'
import { MinusSquare, PanelTop, Square, X } from 'lucide-solid'
import { Show, createSignal, onMount } from 'solid-js'

export default function Titlebar() {
  const [isMaximized, setIsMaximized] = createSignal(false)

  onMount(async () => {
    const maximized = await appWindow.isMaximized()
    setIsMaximized(maximized)
  })

  async function handleClose() {
    await appWindow.close()
  }
  async function hanldleMaximiseToggle() {
    await appWindow.toggleMaximize()
    setIsMaximized(!isMaximized())
  }
  async function handleMinimize() {
    await appWindow.minimize()
  }

  return (
    <div onDblClick={hanldleMaximiseToggle} class={style.titlebar}>
      <div class={style.titlebar__logo}>
        lapis
      </div>
      <div class={style.titlebar__buttons}>
        <Button onclick={handleMinimize} variant="ghost" size="icon">
          <MinusSquare size={14} />
        </Button>
        <Button onclick={hanldleMaximiseToggle} variant="ghost" size="icon">
          <Show when={isMaximized()} fallback={<Square size={14} />}>
            <PanelTop size={14} />
          </Show>
        </Button>
        <Button onclick={handleClose} variant="ghost" size="icon">
          <X size={14} />
        </Button>
      </div>
    </div>
  )
}
