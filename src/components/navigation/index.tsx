import { Archive, Cog, Folder, Pencil, Search } from 'lucide-solid'
import style from './style.module.css'
import Button from '../ui/button'
import { A } from "@solidjs/router";
import { useLocation } from "@solidjs/router";
import { Motion } from "@motionone/solid";
import { spring } from "motion";


export default function Navigation() {
  const location = useLocation();

  return (
    <>
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
            class={style.navigation__menu}>
            <Button size="icon" variant={location.pathname === "/" ? "primary" : "ghost"}>
              <A href='/'>
                <Pencil size={14} />
              </A>
            </Button>
            <Button size="icon" variant={
              location.pathname === "/explorer" ? "primary" : "ghost"
            }>
              <A href='/explorer'>
                <Search size={14} />
              </A>
            </Button>
            <Button size="icon" variant={
              location.pathname === "/archive" ? "primary" : "ghost"
            }>
              <A href='/'>
                <Folder size={14} />
              </A>
            </Button>
          </Motion.div>
          <Button size="icon" variant='default'>
            <Cog size={14} />
          </Button>
        </Motion.nav >
      </div>
      <Motion.div class={style.files}>
        <div>just some file name</div>
      </Motion.div>
    </>
  )
}
