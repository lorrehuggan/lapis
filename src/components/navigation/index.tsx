import { Archive, FilePlus, Pencil, Search } from 'lucide-solid'
import style from './style.module.css'
import Button from '../ui/button'
import { A } from "@solidjs/router";
import { useLocation } from "@solidjs/router";



export default function Navigation() {
  const location = useLocation();
  console.log(location);

  return (
    <nav class={style.navigation}>
      <div class={style.menu}>
        <Button variant={location.pathname === "/" ? "primary" : "default"}>
          <A href='/'>
            <Pencil size={24} />
          </A>
        </Button>
        <Button variant={
          location.pathname === "/new" ? "primary" : "default"
        }>
          <FilePlus size={24} />
        </Button>
        <Button variant={
          location.pathname === "/explorer" ? "primary" : "default"
        }>
          <A href='/explorer'>
            <Search size={24} />
          </A>
        </Button>
      </div>
      <Button variant='default'>
        <Archive size={24} />
      </Button>
    </nav>
  )
}
