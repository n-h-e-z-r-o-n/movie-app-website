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

#key = Fernet.generate_key()
key = b'EG35NhK1foFRe8CBXyR7mtTDkTBfrbMs_R3H1sU0kt0='
cipher = Fernet(key)

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
    except:
        pass
#download_app_info()

BASE_DIR = os.path.abspath('./private/x_local')
ENCRYPTION_FLAG = os.path.join(BASE_DIR, ".encrypted")

if not os.path.exists(ENCRYPTION_FLAG):
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            with open(file_path, 'rb') as f:
                data = f.read()
            encrypted = cipher.encrypt(data)
            with open(file_path, 'wb') as f:
                f.write(encrypted)
    with open(ENCRYPTION_FLAG, 'w') as f:
        f.write("Encrypted")


app = Flask(__name__, template_folder='./private/x_local', static_folder='./private/x_local')

def decrypt_file(file_path):
        with open(file_path, 'rb') as f:
            encrypted = f.read()
        return cipher.decrypt(encrypted)

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

"""
@app.route('/')
def index():
    return render_template('./index.html')
    
@app.route('/<path:requested>')
def dynamic_html_handler(requested):
    print(requested)

    if requested.endswith('.html'):
        return render_template(requested)
    elif requested.endswith('.css'):
        return app.send_static_file(requested)
    elif requested.endswith('.js'):
        return app.send_static_file(requested)
    elif requested.startswith("Assets/"):
        print("asset_full_path :", requested)
        return app.send_static_file(requested)
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
"""

if __name__ == '__main__':
    def open_browser():
        time.sleep(1)  # wait a moment to ensure the server starts
        webbrowser.open('http://127.0.0.1:8000')

    threading.Thread(target=open_browser).start()
    app.run(host='0.0.0.0', port=8000)