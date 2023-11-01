import { Editor } from "@tiptap/core"
import Toggle from "../ui/toggle"
import { cx } from "class-variance-authority";
import style from "./style.module.css";
import { Bold, Highlighter, Italic, Keyboard, Strikethrough } from "lucide-solid";
import { boldToggle, highlightToggle, italicToggle, strikeToggle } from "../../lib/marks";
import { Accessor, Show } from "solid-js";
import { createEditorTransaction } from "solid-tiptap";
import { isTyping } from "../editor";


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
      <div class={style.marks} style={{ opacity: isTyping() ? '0.2' : '1' }}>
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
          fn={() => strikeToggle(props.editor())}
        />
        <Toggle
          active={isHighlighted()}
          label="italic"
          icon={<Highlighter size={14} />}
          fn={() => highlightToggle(props.editor())}
        />
      </div>
    </div>
  )
}
