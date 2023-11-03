import { Archive, FilePlus, Search } from 'lucide-solid'
import style from './style.module.css'
import Button from '../ui/button'

export default function Navigation() {
  return (
    <nav class={style.navigation}>
      <div class={style.menu}>
        <Button variant='primary'>
          <FilePlus size={24} />
        </Button>
        <Button variant='primary'>
          <Search size={24} />
        </Button>
      </div>
      <Button variant='default'>
        <Archive size={24} />
      </Button>
    </nav>
  )
}
