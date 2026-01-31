#pip install cryptography
from flask import Flask, render_template_string,  send_file, jsonify, request, Response, render_template, send_from_directory, redirect, abort
from flask_cors import CORS
import io
import requests
import zipfile
from cryptography.fernet import Fernet
import time
from pystray import Icon, Menu, MenuItem
from PIL import Image
import threading
import sys
import win32com.client  #pip install pywin32
import ctypes
import tkinter as tk
from webview.window import Window
from webview.platforms.edgechromium import EdgeChrome
from System import IntPtr, Int32, Func, Type, Environment
from System.Windows.Forms import Control
from System.Threading import  ApartmentState, ThreadStart, SynchronizationContext, SendOrPostCallback
from System.Threading import Thread as System_Thread
import sqlite3
import random
import string

shutdown_event = threading.Event()

########################################################################################################################
########################################################################################################################
########################################################################################################################

user32 = ctypes.windll.user32

class WebView2(tk.Frame):
    def __init__(self, parent, width: int, height: int, url: str = '', **kw):
        tk.Frame.__init__(self, parent, width=width, height=height, **kw)
        control = Control()
        uid = 'master'
        window = Window(uid, str(id(self)), url=None, html=None, js_api=None, width=width, height=height, x=None, y=None,
                        resizable=True, fullscreen=False, min_size=(200, 100), hidden=False,
                        frameless=False, easy_drag=True,
                        minimized=False, on_top=False, confirm_close=False, background_color='#FFFFFF',
                        transparent=False, text_select=True, localization=None,
                        zoomable=True, draggable=True, vibrancy=False)
        self.window = window
        self.web_view = EdgeChrome(control, window, None)
        self.control = control
        self.web = self.web_view.webview
        self.width = width
        self.height = height
        self.parent = parent
        self.chwnd = int(str(self.control.Handle))
        user32.SetParent(self.chwnd, self.winfo_id())
        user32.MoveWindow(self.chwnd, 0, 0, width, height, True)
        self.loaded = window.events.loaded
        self.__go_bind()
        if url != '':
            self.load_url(url)
        self.core = None
        #self.web.CoreWebView2InitializationCompleted += self.__load_core

    def __go_bind(self):
        self.bind('<Destroy>', lambda event: self.web.Dispose())
        self.bind('<Configure>', self.__resize_webview)
        self.newwindow = None

    def __resize_webview(self, event):
        user32.MoveWindow(self.chwnd, 0, 0, self.winfo_width(), self.winfo_height(), True)

    def __load_core(self, sender, _):
        self.core = sender.CoreWebView2
        self.core.NewWindowRequested -= self.web_view.on_new_window_request
        # Prevent opening new windows or browsers
        self.core.NewWindowRequested += lambda _, args: args.Handled(True)

        if self.newwindow != None:
            self.core.NewWindowRequested += self.newwindow
        settings = sender.CoreWebView2.Settings  # 设置
        settings.AreDefaultContextMenusEnabled = False  # 菜单
        settings.AreDevToolsEnabled = False  # 开发者工具
        # self.core.DownloadStarting+=self.__download_file

    def load_url(self, url):
        self.web_view.load_url(url)

    def load_html(self, content, base_uri=None):
        self.web_view.load_html(content, base_uri)

    def reload(self):
        self.core.Reload()
import os


def title_bar_color(window, color):
    import ctypes as ct
    try:
        window.update()
        if color.startswith('#'):
            blue = color[5:7]
            green = color[3:5]
            red = color[1:3]
            color = blue + green + red
        else:
            blue = color[4:6]
            green = color[2:4]
            red = color[0:2]
            color = blue + green + red
        get_parent = ct.windll.user32.GetParent
        HWND = get_parent(window.winfo_id())

        color = '0x' + color
        color = int(color, 16)

        ct.windll.dwmapi.DwmSetWindowAttribute(HWND, 35, ct.byref(ct.c_int(color)), ct.sizeof(ct.c_int))
    except:
        pass


########################################################################################################################
########################################################################################################################
########################################################################################################################
#key = Fernet.generate_key()
key = b'EG35NhK1foFRe8CBXyR7mtTDkTBfrbMs_R3H1sU0kt0='
cipher = Fernet(key)

BASE_DIR = os.path.abspath('private/x_local')
DB_LOCATION = './database.db'
#BASE_DIR = os.path.abspath('x_local')


def init_database():
    conn = sqlite3.connect(DB_LOCATION)
    cursor = conn.cursor()

    # Users table
    conn.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    watchlist TEXT,
                    Messages TEXT,
                    ProfileIMG TEXT
                )
            ''')

    # Session table to strictly maintain active user
    conn.execute('''
                CREATE TABLE IF NOT EXISTS current_session (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER
                )
            ''')

    conn.commit()
    conn.close()



def get_db_connection():
    conn = sqlite3.connect(DB_LOCATION)
    conn.row_factory = sqlite3.Row
    return conn


# Helper to ensure unique email for dummy profiles
def generate_dummy_email(name):
    random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=4))
    return f"{name.replace(' ', '_').lower()}_{random_suffix}@local.com"






def ensure_c_drive_location():
    expected_dir = r"C:\Movionyx"

    # Get current executable path
    current_path = sys.executable if getattr(sys, "frozen", False) else os.path.abspath(__file__)
    exe_name = os.path.basename(current_path)
    target_path = os.path.join(expected_dir, exe_name)

    # Normalize paths for case-insensitive comparison (Windows)
    current_path_normalized = os.path.normcase(os.path.abspath(current_path))
    target_path_normalized = os.path.normcase(os.path.abspath(target_path))

    # If already running from C:\Movionyx → DO NOTHING
    if current_path_normalized == target_path_normalized:
        #print(f"[✓] Already running from C:\\Movionyx")
        return

    #print(f"[~] Running from: {current_path}")
    #print(f"[~] Target location: {target_path}")
    #print("[~] Relocating to C:\\Movionyx...")

    import shutil
    import subprocess

    # Create target directory if it doesn't exist
    os.makedirs(expected_dir, exist_ok=True)

    try:
        # Copy the executable to target location
        shutil.copy2(current_path, target_path)
        #print(f"[✓] Copied to {target_path}")

        # Start the new instance from C:\Movionyx
        #print("[✓] Launching from C:\\Movionyx")
        subprocess.Popen([target_path], shell=True)

        # Give it a moment to start
        time.sleep(1)

    except Exception as e:
        #print(f"[!] Failed to relocate: {e}")
        # Continue with current instance if relocation fails
        return

    # Terminate current instance completely
    #print("[✓] Exiting current instance")
    sys.exit(0)


ensure_c_drive_location()
init_database()

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

    #print("icon_path : ",icon_path)
    #print("shortcut_path : ", shortcut_path)
    #print("target_path : ", target_path)
    #print("target_path : ", os.getcwd())


    shell = win32com.client.Dispatch("WScript.Shell")
    shortcut = shell.CreateShortcut(shortcut_path)
    shortcut.TargetPath = target_path
    shortcut.WorkingDirectory = os.path.dirname(target_path)
    shortcut.IconLocation =F"{icon_path},0"
    shortcut.Save()

def download_app_icon():
        icon_path = "Movionyx.ico"
        if os.path.exists(icon_path):
            #print("[✓] Icon already exists. Skipping download.")
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
        #print(response1.status_code)
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


def decrypt_folder():
    fernet = Fernet(key)

    # Walk through all directories and files
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            file_path = os.path.join(root, file)

            try:
                with open(file_path, "rb") as f:
                    encrypted_data = f.read()

                # Attempt to decrypt
                decrypted_data = fernet.decrypt(encrypted_data)

                with open(file_path, "wb") as f:
                    f.write(decrypted_data)

                #print(f"Decrypted: {file_path}")

            except Exception as e:
                2
                #print(f"Failed to decrypt {file_path}: {e}")


#decrypt_folder()
download_app_info()




app = Flask("Movionyx", template_folder='./private/x_local', static_folder='./private/x_local')

def decrypt_file(file_path):
        with open(file_path, 'rb') as f:
            encrypted = f.read()
        return cipher.decrypt(encrypted)

# ✅ Content Security Policy to restrict external assets or frames

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

        #print("file_path html : ", requested)
        return render_template_string(decrypted.decode('utf-8'))

    elif requested.endswith('.css'):
        #print("file_path css : ", requested)
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


########################################################################################################################
########################################################################################################################
########################################################################################################################


@app.route('/getProfiles', methods=['GET'])
def get_profiles():
    try:
        conn = get_db_connection()
        profiles = conn.execute('SELECT id, name, ProfileIMG FROM users').fetchall()
        conn.close()
        return jsonify({'massage': [dict(row) for row in profiles]})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/createProfile', methods=['POST'])
def create_profile():
    try:
        data = request.form
        name = data.get('name')
        profile_img = data.get('ProfileIMG', '/Assets/account.png')

        # Generate dummy credentials
        email = generate_dummy_email(name)
        password = "dummy_password"
        watchlist = '[]'
        messages = '[]'

        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            'INSERT INTO users (name, email, password, watchlist, Messages, ProfileIMG) VALUES (?, ?, ?, ?, ?, ?)',
            (name, email, password, watchlist, messages, profile_img))
        user_id = cursor.lastrowid
        conn.commit()

        # Determine strict user dict to return
        user_dict = {
            'id': user_id,
            'name': name,
            'email': email,
            'watchlist': watchlist,
            'Messages': messages,
            'ProfileIMG': profile_img
        }

        # Automatically set as active user for seamless flow (optional, but good UX)
        cursor.execute('DELETE FROM current_session')
        cursor.execute('INSERT INTO current_session (user_id) VALUES (?)', (user_id,))
        conn.commit()
        conn.close()

        return jsonify({'massage': user_dict})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/loginProfile', methods=['POST'])
def login_profile():
    try:
        user_id = request.form.get('id')
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()

        if user:
            # Set as active user in DB
            conn.execute('DELETE FROM current_session')
            conn.execute('INSERT INTO current_session (user_id) VALUES (?)', (user_id,))
            conn.commit()

            user_dict = dict(user)
            del user_dict['password']
            conn.close()
            return jsonify({'massage': user_dict})
        else:
            conn.close()
            return jsonify({'massage': 'User not found'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/updateProfile', methods=['POST'])
def update_profile():
    try:
        data = request.form
        user_id = data.get('id')
        name = data.get('name')
        profile_img = data.get('ProfileIMG')

        conn = get_db_connection()
        # Update name and image. If argument is missing, keep existing (optional logic, but here we expect both or handle in frontend)
        # Simplified: Update both provided.
        conn.execute('UPDATE users SET name = ?, ProfileIMG = ? WHERE id = ?', (name, profile_img, user_id))
        conn.commit()

        # Fetch updated user to return
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()

        if user:
            user_dict = dict(user)
            del user_dict['password']
            return jsonify({'massage': user_dict})
        else:
            return jsonify({'massage': 'User not found after update'})

    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/getActiveUser', methods=['GET'])
def get_active_user():
    try:
        conn = get_db_connection()
        session = conn.execute('SELECT user_id FROM current_session LIMIT 1').fetchone()

        if session:
            user_id = session['user_id']
            user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
            conn.close()
            if user:
                user_dict = dict(user)
                del user_dict['password']
                return jsonify({'massage': user_dict})

        conn.close()
        return jsonify({'massage': None})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/logout', methods=['POST'])
def logout():
    try:
        conn = get_db_connection()
        conn.execute('DELETE FROM current_session')
        conn.commit()
        conn.close()
        return jsonify({'massage': 'Logged out successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.form
        email = data.get('email')
        password = data.get('password')

        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()

        if user:
            if user['password'] == password:
                user_dict = dict(user)
                del user_dict['password']  # Don't send password back
                return jsonify({'massage': user_dict})
            else:
                return jsonify({'massage': 'Invalid password'})
        else:
            return jsonify({'massage': 'User not found'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.form
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        watchlist = '[]'
        messages = '[]'

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user exists
        existing_user = cursor.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        if existing_user:
            conn.close()
            return jsonify({'massage': 'User already exists'})

        cursor.execute('INSERT INTO users (name, email, password, watchlist, Messages) VALUES (?, ?, ?, ?, ?)',
                       (name, email, password, watchlist, messages))
        conn.commit()
        conn.close()

        return jsonify({'massage': 'User added successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/getWatchlist', methods=['POST'])
def get_watchlist():
    try:
        email = request.form.get('email')
        conn = get_db_connection()
        user = conn.execute('SELECT watchlist FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()

        if user:
            return jsonify({'massage': user['watchlist']})
        return jsonify({'massage': 'Error fetching'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/updateWatchlist', methods=['POST'])
def update_watchlist():
    try:
        email = request.form.get('email')
        watchlist = request.form.get('watchlist')

        conn = get_db_connection()
        conn.execute('UPDATE users SET watchlist = ? WHERE email = ?', (watchlist, email))
        conn.commit()
        conn.close()
        return jsonify({'massage': 'Watchlist updated successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/getMessageslist', methods=['POST'])
def get_messages():
    try:
        email = request.form.get('email')
        conn = get_db_connection()
        user = conn.execute('SELECT Messages FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()

        if user:
            return jsonify({'massage': user['Messages']})
        return jsonify({'massage': 'Error fetching'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/updateMassagelist', methods=['POST'])
def update_messages():
    try:
        email = request.form.get('email')
        messages = request.form.get('Messages')

        conn = get_db_connection()
        conn.execute('UPDATE users SET Messages = ? WHERE email = ?', (messages, email))
        conn.commit()
        conn.close()
        return jsonify({'massage': 'Messages updated successfully'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/getUser', methods=['POST'])
def get_user():
    try:
        email = request.form.get('email')
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()

        if user:
            user_dict = dict(user)
            del user_dict['password']
            return jsonify({'massage': user_dict})
        return jsonify({'massage': 'User not found'})
    except Exception as e:
        return jsonify({'massage': str(e)})


@app.route('/requestPasswordReset', methods=['POST'])
def reset_password():
    return jsonify({'massage': 'If this email exists, a reset link has been sent (Mock)'})

########################################################################################################################
########################################################################################################################
########################################################################################################################


def on_quit(icon, item):
    icon.stop()

def run_tray():
    icon_path = "Movionyx.ico"
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


def open_browscer():
        app.run(host='0.0.0.0', port=8668, debug=False, use_reloader=False)

def open_browser():
    from werkzeug.serving import make_server

    server = make_server('127.0.0.1', 8668, app)
    server.timeout = 1

    while not shutdown_event.is_set():
        server.handle_request()

    server.server_close()

threading.Thread(target=open_browser).start()

def main():
        time.sleep(10)
        root = tk.Tk()
        root.iconbitmap("Movionyx.ico")
        root.title("")
        title_bar_color(root, "#191311")
        root.minsize(1000, 600)

        def on_close():
            shutdown_event.set()
            root.destroy()
            os._exit(0)

        root.protocol("WM_DELETE_WINDOW", on_close)

        video_box = tk.Frame(root)
        video_box.place(relheight=1, relwidth=1, relx=0, rely=0)
        frame2 = WebView2(video_box, 500, 500)
        frame2.place(relheight=1, relwidth=1, relx=0, rely=0)
        #path = os.getcwd()
        path = "http://127.0.0.1:8668/Home.html"
        #print(path)
        frame2.load_url(path)
        root.mainloop()


if __name__ == "__main__":
    t = System_Thread(ThreadStart(main))
    t.ApartmentState = ApartmentState.STA
    t.Start()
    t.Join()