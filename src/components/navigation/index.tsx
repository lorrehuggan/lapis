import { Archive, Pencil, Search } from 'lucide-solid'
import style from './style.module.css'
import Button from '../ui/button'
import { A } from "@solidjs/router";
import { useLocation } from "@solidjs/router";
import { Motion } from "@motionone/solid";
import { spring } from "motion";


export default function Navigation() {
  const location = useLocation();

  return (
    <div style={{ width: '4rem' }}>
      <Motion.nav
        animate={{ opacity: [0, 1], width: ["0rem", "4rem"] }}
        transition={{
          duration: 0.5,
          easing: spring({
            damping: 20,
            stiffness: 200,
          }),

        }}
        class={style.navigation}>
        <Motion.div
          animate={{ opacity: [0, 1], x: ["-1rem", "0rem"] }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            easing: spring({
              stiffness: 300,
            }),
          }}
          class={style.menu}>
          <Button size="icon" variant={location.pathname === "/" ? "primary" : "default"}>
            <A href='/'>
              <Pencil size={24} />
            </A>
          </Button>
          <Button size="icon" variant={
            location.pathname === "/explorer" ? "primary" : "default"
          }>
            <A href='/explorer'>
              <Search size={24} />
            </A>
          </Button>
        </Motion.div>
        <Button size="icon" variant='default'>
          <Archive size={24} />
        </Button>
      </Motion.nav >
    </div>
  )
}
