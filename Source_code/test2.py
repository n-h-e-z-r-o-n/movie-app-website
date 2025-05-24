import tkinter as tk
from cefpython3 import cefpython as cef
import ctypes
import logging
import sys

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Constants
USER_AGENT = "MovionyxApp/1.0"
BG_COLOR = '#36454F'

def set_title_bar_color(window, color):
    try:
        if not color.startswith('#'):
            raise ValueError("Color must be in hex format (e.g., #RRGGBB)")
        color = color.lstrip('#')
        bgr = int(color[4:6] + color[2:4] + color[0:2], 16)
        hwnd = ctypes.windll.user32.GetParent(window.winfo_id())
        ctypes.windll.dwmapi.DwmSetWindowAttribute(hwnd, 35, ctypes.byref(ctypes.c_int(bgr)), ctypes.sizeof(ctypes.c_int))
        logging.info(f"Set title bar color to {color}")
    except Exception as e:
        logging.error(f"Error setting title bar color: {e}")

class CEFBrowser(tk.Frame):
    def __init__(self, parent, width: int, height: int, url: str = ''):
        tk.Frame.__init__(self, parent, width=width, height=height, bg=BG_COLOR, borderwidth=2, relief="solid")
        self.parent = parent
        self.width = width
        self.height = height
        self.browser = None
        self.parent.update()  # Ensure Tkinter window is ready
        self.bind('<Configure>', self.__resize_browser)
        self.__initialize_cef(url)

    def __initialize_cef(self, url):
        try:
            cef.Initialize(settings={
                "user_agent": USER_AGENT,
                "log_severity": cef.LOGSEVERITY_INFO,
                "log_file": "cef_debug.log",
                "javascript_flags": "--js-flags=--expose-gc"
            })
            window_info = cef.WindowInfo()
            window_info.SetAsChild(self.winfo_id(), [0, 0, self.width, self.height])
            self.browser = cef.CreateBrowserSync(
                window_info=window_info,
                url=url if url else "about:blank"
            )
            self.browser.SetClientHandler(NavigationHandler())
            logging.info(f"CEF browser initialized with user agent: {USER_AGENT}")
            if url:
                self.load_url(url)
        except Exception as e:
            logging.error(f"Failed to initialize CEF: {e}")
            raise

    def __resize_browser(self, event):
        try:
            if self.browser:
                ctypes.windll.user32.SetWindowPos(
                    self.browser.GetWindowHandle(), 0, 0, 0,
                    self.winfo_width(), self.winfo_height(), 0
                )
                logging.info("Browser resized")
        except Exception as e:
            logging.error(f"Error resizing browser: {e}")

    def load_url(self, url):
        try:
            if self.browser:
                self.browser.LoadUrl(url)
                logging.info(f"Loaded URL: {url}")
        except Exception as e:
            logging.error(f"Failed to load URL {url}: {e}")

    def reload(self):
        try:
            if self.browser:
                self.browser.Reload()
                logging.info("Browser reloaded")
        except Exception as e:
            logging.error(f"Error reloading browser: {e}")

    def go_back(self):
        try:
            if self.browser and self.browser.CanGoBack():
                self.browser.GoBack()
                logging.info("Navigated back")
        except Exception as e:
            logging.error(f"Error navigating back: {e}")

    def go_forward(self):
        try:
            if self.browser and self.browser.CanGoForward():
                self.browser.GoForward()
                logging.info("Navigated forward")
        except Exception as e:
            logging.error(f"Error navigating forward: {e}")

    def destroy(self):
        try:
            if self.browser:
                self.browser.CloseBrowser(True)
                cef.Shutdown()
            super().destroy()
            logging.info("Browser destroyed")
        except Exception as e:
            logging.error(f"Error destroying browser: {e}")

class NavigationHandler:
    def OnLoadingStateChange(self, browser, is_loading, can_go_back, can_go_forward):
        logging.info(f"Loading state: is_loading={is_loading}, can_go_back={can_go_back}, can_go_forward={can_go_forward}")

def main():
    try:
        app = tk.Tk()
        app.geometry("600x500")
        app.state("zoomed")
        app.title("Movionyx Browser")
        set_title_bar_color(app, "#12161F")

        frame = CEFBrowser(app, width=500, height=500, url="https://movionyx.com")
        frame.place(relheight=1, relwidth=1, relx=0, rely=0)

        # Keep CEF message loop running
        app.protocol("WM_DELETE_WINDOW", frame.destroy)
        while True:
            cef.MessageLoopWork()
            app.update()
    except Exception as e:
        logging.error(f"Error in main: {e}")
        raise

if __name__ == "__main__":
    sys.argv = [sys.argv[0]]  # CEF requires clean argv
    main()