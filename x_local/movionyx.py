from cryptography.fernet import Fernet
import os

# --- WARNING: MAKE A BACKUP BEFORE RUNNING THIS ---

def load_key(key_file='secret.key'):
    """
    Loads the key from the current directory named `secret.key`
    """
    try:
        return open(key_file, "rb").read()
    except FileNotFoundError:
        print(f"Error: {key_file} not found. Please ensure you have the correct key file.")
        return None

def decrypt_folder(folder_path, key):
    """
    Decrypts all files in the given folder using the provided key.
    """
    if not key:
        print("No key provided. Aborting.")
        return

    fernet = Fernet(key)
    
    # Walk through all directories and files
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            
            # Skip the script itself and the key file to avoid errors
            if file == "movionyx.py" or file == "secret.key":
                continue

            try:
                with open(file_path, "rb") as f:
                    encrypted_data = f.read()
                
                # Attempt to decrypt
                decrypted_data = fernet.decrypt(encrypted_data)
                
                with open(file_path, "wb") as f:
                    f.write(decrypted_data)
                
                print(f"Decrypted: {file_path}")
            
            except Exception as e:
                print(f"Failed to decrypt {file_path}: {e}")

if __name__ == "__main__":
    # Example usage:
    # 1. Make sure 'secret.key' is in the same folder (or provide path)
    # 2. Set the folder path you want to decrypt
    
    TARGET_FOLDER = "."  # Change this to the folder path, e.g., "C:/MyFiles" or "." for current folder
    
    print(f"--- Decrypting folder: {os.path.abspath(TARGET_FOLDER)} ---")
    confirm = input("Are you sure? This will modify files in place. (yes/no): ")
    
    if confirm.lower() == "yes":
        key = load_key()
        if key:
            decrypt_folder(TARGET_FOLDER, key)
            print("--- Decryption Complete ---")
    else:
        print("Operation cancelled.")
