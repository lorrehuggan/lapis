import { Editor } from "@tiptap/core"
import Toggle from "../ui/toggle"
import { cx } from "class-variance-authority";
import style from "./style.module.css";
import { Bold, Highlighter, Italic, Keyboard, Save, Strikethrough } from "lucide-solid";
import { boldToggle, highlightToggle, italicToggle, strikeToggle } from "../../lib/marks";
import { Accessor, Show, createMemo } from "solid-js";
import { createEditorTransaction } from "solid-tiptap";
import { isTyping } from "../editor";
import Button from "../ui/button";
import { open } from '@tauri-apps/api/dialog'


async function openFile() {
  const result = await open({
    multiple: false,
    title: 'Open File',
    defaultPath: '.',
    filters: [
      { name: 'Markdown', extensions: ['md'] },
    ]
  })
  console.log(result)
}


type Props = {
  editor: Accessor<Editor>;
}


export default function Toolbar(props: Props) {

  const isBold = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('bold'),
  );

  const isItalic = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('italic'),
  );

  const isHighlighted = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('highlight'),
  );

  const isStrike = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('strike'),
  );

  const isHeading1 = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('heading', { level: 1 }),
  );

  const isHeading2 = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('heading', { level: 2 }),
  );

  const isHeading3 = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('heading', { level: 3 }),
  );

  const isHeading4 = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('heading', { level: 4 }),
  );

  const isHeading5 = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('heading', { level: 5 }),
  );

  const isHeading6 = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.isActive('heading', { level: 6 }),
  );

  const isHeading = createMemo(() => {
    const headings = [
      isHeading1(),
      isHeading2(),
      isHeading3(),
      isHeading4(),
      isHeading5(),
      isHeading6(),
    ]
    return headings.some((heading) => heading === true)
  })

  const wordCount = createEditorTransaction(
    () => props.editor(), // Editor instance from createTiptapEditor
    (editor) => editor.storage.characterCount.words(),
  );



  return (
    <div class={cx(style.toolbar, 'container')}>
      <Show when={isTyping()} fallback={<p>Word Count: {wordCount()}</p>
      }>
        <Keyboard size={16} />
      </Show>
      <div class={style.marks}>
        <Toggle
          active={isBold()}
          label="bold"
          icon={<Bold size={14} />}
          fn={() => boldToggle(props.editor())}
        />
        <Toggle
          active={isItalic()}
          label="italic"
          icon={<Italic size={14} />}
          fn={() => italicToggle(props.editor())}
        />
        <Toggle
          active={isStrike()}
          label="strike through"
          icon={<Strikethrough size={14} />}
          fn={() => strikeToggle(props.editor())
          }
        />
        <Toggle
          active={isHighlighted()}
          label="italic"
          icon={<Highlighter size={14} />}
          fn={() => {
            if (isHeading()) {
              return () => { }
            }
            return highlightToggle(props.editor())
          }}
        />
        <Button onClick={() => openFile()}><Save size={14} /></Button>
      </div>
    </div>
  )
}
