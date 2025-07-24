#pip install cryptography
from flask import Flask, render_template_string,  send_file, request, Response, render_template, send_from_directory, redirect, abort
import os
import io
import requests
import zipfile
from cryptography.fernet import Fernet
import threading
import webbrowser
import time
from pystray import Icon, Menu, MenuItem
from PIL import Image
import threading
import os
import sys
import win32com.client  #pip install pywin32


#key = Fernet.generate_key()
key = b'EG35NhK1foFRe8CBXyR7mtTDkTBfrbMs_R3H1sU0kt0='
cipher = Fernet(key)

BASE_DIR = os.path.abspath('./private/x_local')

def ensure_c_drive_location():
    expected_dir = r"C:\Movionyx"
    exe_name = os.path.basename(sys.argv[0])
    current_path = os.path.abspath(sys.argv[0])
    target_path = os.path.join(expected_dir, exe_name)

    # Only proceed if NOT already running from C:\Movionyx
    if not current_path.lower().startswith(expected_dir.lower()):
        print("[~] Moving Movionyx.exe to C:/Movionyx")

        import shutil

        if not os.path.exists(expected_dir):
            os.makedirs(expected_dir)

        # Copy only the executable
        shutil.copy2(current_path, target_path)

        # Launch from new location
        os.startfile(target_path)
        sys.exit()

    # ADD A CODE TO STOP THIS FILE FOROM RUNNING

ensure_c_drive_location()

def get_executable_path():
    if getattr(sys, 'frozen', False):
        # Running in a bundle (e.g. PyInstaller)
        return sys.executable
    else:
        return os.path.abspath(__file__)

def create_shortcut(shortcut_name="Movionyx"):
    target_path = get_executable_path()
    desktop = os.path.join(os.environ['USERPROFILE'], 'Desktop')
    shortcut_path = os.path.join(desktop, f"{shortcut_name}.lnk")
    icon_path = os.path.join(os.getcwd(),"Movionyx.ico")

    print("icon_path : ",icon_path)
    print("shortcut_path : ", shortcut_path)
    print("target_path : ", target_path)
    print("target_path : ", os.getcwd())


    shell = win32com.client.Dispatch("WScript.Shell")
    shortcut = shell.CreateShortcut(shortcut_path)
    shortcut.TargetPath = target_path
    shortcut.WorkingDirectory = os.path.dirname(target_path)
    shortcut.IconLocation =F"{icon_path},0"
    shortcut.Save()

def download_app_icon():
        icon_path = "Movionyx.ico"
        if os.path.exists(icon_path):
            print("[✓] Icon already exists. Skipping download.")
            return
        img_url = "https://github.com/n-h-e-z-r-o-n/movie-app-website/raw/refs/heads/main/Web%20App/Assets/Movionyx.ico"
        response = requests.get(img_url)
        with open(icon_path, 'wb') as f:
            f.write(response.content)

download_app_icon()
create_shortcut()

def download_app_info():
    url1 = "https://github.com/n-h-e-z-r-o-n/movie-app-website/raw/refs/heads/main/x_local.zip"
    filename1 = './Update.zip'
    try:
        response1 = requests.get(url1)
        print(response1.status_code)
        if response1.status_code == 200:
            with open(filename1, 'wb') as f:
                f.write(response1.content)

        with zipfile.ZipFile(filename1, 'r') as zip_ref:
            zip_ref.extractall('./private')

        for root, dirs, files in os.walk(BASE_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                with open(file_path, 'rb') as f:
                    data = f.read()
                encrypted = cipher.encrypt(data)
                with open(file_path, 'wb') as f:
                    f.write(encrypted)
        os.remove("./Update.zip")

    except:
        pass


threading.Thread(target=download_app_info).start()




app = Flask("Movionyx", template_folder='./private/x_local', static_folder='./private/x_local')

def decrypt_file(file_path):
        with open(file_path, 'rb') as f:
            encrypted = f.read()
        return cipher.decrypt(encrypted)

# ✅ Content Security Policy to restrict external assets or frames
@app.after_request
def apply_csp(response):
    ad_domains = ["ads.example.com", "doubleclick.net", "googlesyndication.com"]
    for domain in ad_domains:
        if domain in request.url:
            abort(403)  # Forbidden

    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "img-src 'self'; "
        "style-src 'self'; "
        "frame-src 'none';"
    )
    return response
@app.route('/')
def serve_encrypted_file():
    file_path = os.path.join(BASE_DIR, "index.html")
    decrypted = decrypt_file(file_path)
    return render_template_string(decrypted.decode('utf-8'))


@app.route('/<path:requested>')
def dynamic_handler(requested):
    file_path = os.path.join(BASE_DIR, requested)
    decrypted = decrypt_file(file_path)
    if requested.endswith('.html'):

        print("file_path html : ", requested)
        return render_template_string(decrypted.decode('utf-8'))

    elif requested.endswith('.css'):
        print("file_path css : ", requested)
        return send_file(io.BytesIO(decrypted), mimetype='text/css')

    elif requested.endswith('.js'):
        return send_file(io.BytesIO(decrypted), mimetype='application/javascript')

    elif requested.startswith("Assets/"):
        if requested.endswith('.png'):
           return send_file(io.BytesIO(decrypted), mimetype='image/png')
        elif requested.endswith('.jpg') or requested.endswith('.jpeg'):
            return send_file(io.BytesIO(decrypted), mimetype='image/jpeg')
        elif requested.endswith('.ico'):
            return send_file(io.BytesIO(decrypted), mimetype='image/x-icon')

    return f" failed: {requested}"


@app.route('/Database/database.php', methods=['POST'])
def proxy_database():
    external_url = 'https://movionyx.com/Database/database.php'
    resp = requests.post(external_url, data=request.form)
    return Response(
        resp.content,
        status=resp.status_code,
        content_type=resp.headers.get('Content-Type')
    )


def on_quit(icon, item):
    icon.stop()

def run_tray():
    icon_path = "./Movionyx.ico"
    image = Image.open(icon_path)
    icon = Icon(
        "app_name",
        icon=image,
        title="Movionyx",
        menu=Menu(
            MenuItem("Quit", on_quit),
           MenuItem("Open", open_browser)
        )
    )
    icon.run()


def open_browser():
        time.sleep(1)  # wait a moment to ensure the server starts
        webbrowser.open('http://127.0.0.1:8668')

if __name__ == '__main__':
    threading.Thread(target=run_tray, daemon=True).start()

    threading.Thread(target=open_browser).start()
    app.run(host='0.0.0.0', port=8668)