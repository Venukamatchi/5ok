import json
import os

# === CONFIG ===
INPUT_FILE = "US_recipes_null.json"
OUTPUT_FILE = "recipes_array.json"
SPLIT_OUTPUT_DIR = "chunks"     # Folder to store chunks
CHUNK_SIZE = 1000               # Number of entries per chunk file
SPLIT = True                    # Set to False if you don't want chunking

def load_and_convert_json(input_path):
    print(f"🔍 Loading: {input_path}")
    with open(input_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"🔧 Converting {len(data)} entries to array...")
    array_data = [{ "_id": k, **v } for k, v in data.items()]
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(array_data, f, indent=2)

    print(f"✅ Saved: {OUTPUT_FILE}")
    return array_data

def split_json_array(data, chunk_size, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    print(f"📦 Splitting into chunks of {chunk_size}...")

    for i in range(0, len(data), chunk_size):
        chunk = data[i:i + chunk_size]
        chunk_file = os.path.join(output_dir, f"chunk_{i//chunk_size + 1}.json")
        with open(chunk_file, "w", encoding="utf-8") as f:
            json.dump(chunk, f, indent=2)
        print(f"  📁 Saved: {chunk_file}")

    print("✅ All chunks saved.")

if __name__ == "__main__":
    recipes = load_and_convert_json(INPUT_FILE)

    if SPLIT:
        split_json_array(recipes, CHUNK_SIZE, SPLIT_OUTPUT_DIR)
