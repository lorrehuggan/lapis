import Button from '../ui/button'
import { A } from "@solidjs/router";
import { invoke } from '@tauri-apps/api/tauri';
import { ArrowRight, Cog, Folder, Home, Menu, Pencil, Search } from 'lucide-solid'
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
    // refetchInterval: 1500,
    refetchOnWindowFocus: true,
  }))


  return (
    <>
      <nav
        class={style.navigation}>
        <div
          class={style.navigation__menu}>
          <A href='/'>
            <Button size="icon" variant="ghost">
              <Home size={14} />
            </Button>
          </A>
          <A href='/'>
            <Button size="icon" variant="ghost">
              <Pencil size={14} />
            </Button>
          </A>
          <A href='/explorer'>
            <Button size="icon" variant="ghost">
              <Search size={14} />
            </Button>
          </A>
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
      <FileMenu query={query} />
    </>
  )
}
