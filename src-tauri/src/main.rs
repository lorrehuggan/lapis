// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod actions;
use actions::{delete_file, get_all, get_all_json, get_html, save_json, save_markdown};

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            save_markdown,
            get_all,
            get_html,
            delete_file,
            save_json,
            get_all_json
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
