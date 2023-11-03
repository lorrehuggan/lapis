import Editor from "./components/editor";
import { Toaster } from 'solid-sonner'
import Navigation from "./components/navigation";
import style from "./style.module.css";

function App() {

  return (
    <div class={style.app}>
      <Navigation />
      <div class={style.app__main}>
        <Toaster invert />
        <Editor />
      </div>
    </div>
  );
}

export default App;
