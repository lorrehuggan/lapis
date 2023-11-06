import Button from '../ui/button'
import { A } from "@solidjs/router";
import { invoke } from '@tauri-apps/api/tauri';
import { ArrowRight, Cog, Folder, Menu, Pencil, Search } from 'lucide-solid'
import FileMenu from './fileMenu';
import { createQuery } from '@tanstack/solid-query';

import style from './style.module.css'

export default function Navigation() {
  const query = createQuery<string[]>(() => ({
    queryKey: ['fileNames'],
    queryFn: async () => {
      const result = await invoke('get_all_json',
        { folder: '/home/lorre/Documents/' }) as string[]
      return result
    },
  }))

  return (
    <>
      <div style={{ width: '3rem' }}>
        <nav
          class={style.navigation}>
          <div
            class={style.navigation__menu}>
            <Button size="icon" variant="ghost">
              <A href='/'>
                <Pencil size={14} />
              </A>
            </Button>
            <Button size="icon" variant="ghost">
              <A href='/explorer'>
                <Search size={14} />
              </A>
            </Button>
            <Button size="icon" variant="ghost">
              <Menu size={14} />
            </Button>
            <Button size="icon" variant="ghost">
              <Folder size={14} />
            </Button>
            <Button size="icon" variant="ghost">
              <ArrowRight size={14} />
            </Button>
          </div>
          <Button size="icon" variant='default'>
            <Cog size={14} />
          </Button>
        </nav >
      </div>
      <FileMenu query={query} />
    </>
  )
}
