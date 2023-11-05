import { invoke } from "@tauri-apps/api/tauri";
import { Editor } from "@tiptap/core";

async function saveJson(editor: Editor, path: string) {
  const json = JSON.stringify(editor.getJSON());
  try {
    const content = await invoke("save_json", { path, json });
    return content;
  } catch (error) {
    console.error(error);
  }
}

async function loadJson(editor: Editor, path: string) {
  try {
    const json = await invoke("load_json", { path }) as string;
    if (!json) {
      return;
    }
    editor.commands.setContent(json);
  } catch (error) {
    console.error(error);
  }
}

export { saveJson, loadJson };
