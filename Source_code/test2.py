import tkinter as tk
import ctypes
import os
import logging
from webview.window import Window
from webview.platforms.edgechromium import EdgeChrome
from System import IntPtr
from System.Windows.Forms import Control
from System.Threading import ApartmentState, ThreadStart, System_Thread

# Configure logging for better debugging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants
BG_COLOR = '#36454F'
USER_AGENT = "MovionyxApp/1.0"
user32 = ctypes.windll.user32
dwmapi = ctypes.windll.dwmapi

class WebView2(tk.Frame):
    def __init__(self, parent, width: int, height: int, url: str = '', **kw):
        tk.Frame.__init__(self, parent, width=width, height=height, **kw)
        self.parent = parent
        self.width = width
        self.height = height

        # Initialize WebView2
        try:
            control = Control()
            uid = 'master'
            self.window = Window(
                uid, str(id(self)), url=None, html=None, js_api=None,
                width=width, height=height, x=None, y=None,
                resizable=True, fullscreen=False, min_size=(200, 100),
                hidden=False, frameless=False, easy_drag=True,
                minimized=False, on_top=False, confirm_close=False,
                background_color=BG_COLOR, transparent=False, text_select=True,
                zoomable=True, draggable=True, vibrancy=False
            )
            self.web_view = EdgeChrome(control, self.window, None)
            self.control = control
            self.chwnd = int(str(self.control.Handle))
            user32.SetParent(self.chwnd, self.winfo_id())
            user32.MoveWindow(self.chwnd, 0, 0, width, height, True)
            self.loaded = self.window.events.loaded
            self.loaded += self.__load_core
            self.bind('<Destroy>', lambda event: self.web_view.Dispose())
            self.bind('<Configure>', self.__resize_webview)
            if url:
                self.load_url(url)
        except Exception as e:
            logging.error(f"Failed to initialize WebView2: {e}")
            raise

    def __load_core(self, sender, _):
        try:
            self.core = sender.CoreWebView2
            self.core.NewWindowRequested -= self.web_view.on_new_window_request
            self.core.NewWindowRequested += lambda _, args: args.Handled(True)  # Block new windows
            settings = self.core.Settings
            settings.AreDefaultContextMenusEnabled = False
            settings.AreDevToolsEnabled = False
            settings.UserAgent = USER_AGENT  # Set custom user agent
            logging.info(f"WebView2 initialized with user agent: {USER_AGENT}")
        except Exception as e:
            logging.error(f"Error in __load_core: {e}")

    def __resize_webview(self, event):
        try:
            user32.MoveWindow(self.chwnd, 0, 0, self.winfo_width(), self.winfo_height(), True)
        except Exception as e:
            logging.error(f"Error resizing WebView2: {e}")

    def load_url(self, url):
        try:
            self.web_view.load_url(url)
            logging.info(f"Loaded URL: {url}")
        except Exception as e:
            logging.error(f"Failed to load URL {url}: {e}")

    def reload(self):
        try:
            if self.core:
                self.core.Reload()
                logging.info("WebView2 reloaded")
        except Exception as e:
            logging.error(f"Error reloading WebView2: {e}")

    def go_back(self):
        try:
            if self.core and self.core.CanGoBack:
                self.core.GoBack()
                logging.info("Navigated back")
        except Exception as e:
            logging.error(f"Error navigating back: {e}")

    def go_forward(self):
        try:
            if self.core and self.core.CanGoForward:
                self.core.GoForward()
                logging.info("Navigated forward")
        except Exception as e:
            logging.error(f"Error navigating forward: {e}")

def set_title_bar_color(window, color):
    try:
        if not color.startswith('#'):
            raise ValueError("Color must be in hex format (e.g., #RRGGBB)")
        # Convert hex to RGB and then to BGR for DWM
        color = color.lstrip('#')
        bgr = int(color[4:6] + color[2:4] + color[0:2], 16)
        hwnd = user32.GetParent(window.winfo_id())
        dwmapi.DwmSetWindowAttribute(hwnd, 35, ctypes.byref(ctypes.c_int(bgr)), ctypes.sizeof(ctypes.c_int))
        logging.info(f"Set title bar color to {color}")
    except Exception as e:
        logging.error(f"Error setting title bar color: {e}")

def main():
    try:
        app = tk.Tk()
        app.geometry("600x500")
        app.state("zoomed")
        app.title("Movionyx Browser")
        set_title_bar_color(app, "#12161F")

        frame = WebView2(app, width=500, height=500)
        frame.place(relheight=1, relwidth=1, relx=0, rely=0)
        frame.load_url('https://movionyx.com')

        app.mainloop()
    except Exception as e:
        logging.error(f"Error in main: {e}")
        raise

if __name__ == "__main__":
    # Run in STA thread for WebView2 compatibility
    thread = System_Thread(ThreadStart(main))
    thread.ApartmentState = ApartmentState.STA
    thread.Start()
    thread.Join()