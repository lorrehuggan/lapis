use anyhow::{Context, Result};
use html2md;
use pulldown_cmark::{html, Parser};
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use tauri::api::path::home_dir;

#[tauri::command]
pub fn save_markdown(html: &str, name: &str) -> Result<String, String> {
    let path = home_dir().unwrap().join("Documents");
    let save_location = path.to_str().unwrap();
    let md = html2md::parse_html(html);
    let path = Path::new(save_location).join(format!("{}.md", name));

    let mut file = File::create(&path).map_err(|e| format!("Error creating file: {}", e))?;

    file.write_all(md.as_bytes())
        .map_err(|e| format!("Error writing to file: {}", e))?;

    Ok(format!("File saved to: {}", save_location).to_string())
}

#[tauri::command]
pub fn save_json(json: &str, name: &str) -> Result<String, String> {
    let path = home_dir().unwrap().join("Documents");
    let save_location = path.to_str().unwrap();
    let path = Path::new(save_location).join(format!("{}.json", name));

    let mut file = File::create(&path).map_err(|e| format!("Error creating file: {}", e))?;

    file.write_all(json.as_bytes())
        .map_err(|e| format!("Error writing to file: {}", e))?;

    Ok(format!("File saved to: {}", save_location).to_string())
}

#[tauri::command]
pub fn get_all(folder: &str) -> Result<Vec<String>, String> {
    let path = Path::new(folder);

    let md_paths = fs::read_dir(path)
        .with_context(|| format!("Failed to read directory: {}", folder))
        .expect("Failed to read directory")
        .filter_map(|entry| entry.ok())
        .map(|entry| entry.path())
        .filter(|path| path.extension().and_then(|ext| ext.to_str()) == Some("md"))
        .map(|path| {
            path.to_str()
                .map(|s| s.to_string())
                .ok_or_else(|| anyhow::anyhow!("Failed to convert path to string"))
        })
        .collect::<Result<Vec<String>>>()
        .expect("Failed to convert path to string");

    Ok(md_paths)
}

#[tauri::command]
pub fn get_html(file: &str) -> Result<String, String> {
    let path = Path::new(file);

    let markdown_content = fs::read_to_string(path)
        .with_context(|| format!("Failed to read file: {}", file))
        .expect("Failed to read file");

    let parser = Parser::new(&markdown_content);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);

    Ok(html_output)
}

#[tauri::command]
pub fn delete_file(folder_path: &str, file_name: &str) -> Result<(), String> {
    let path = Path::new(folder_path).join(format!("{}.md", file_name));

    // Check if the file exists before attempting to delete
    if path.exists() && path.is_file() {
        fs::remove_file(path).expect("Failed to delete file");
        println!("File deleted successfully");
    } else {
        println!("File not found");
    }

    Ok(())
}
