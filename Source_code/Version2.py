import tkinter as tk
import os
import ctypes as ct


path_exe = os.getcwd()

bg_color = '#36454F'
fg_color = "black"

# ------------------------------- web-Integration ---------------------------------------------------------------------------------------------------

import ctypes
from webview.window import Window
from webview.platforms.edgechromium import EdgeChrome
from System.Windows.Forms import Control


help(Window)

class WebView2(tk.Frame):
    def __init__(self, parent, width: int, height: int, url: str = '', **kw):
        global bg_color
        tk.Frame.__init__(self, parent, width=width, height=height, **kw)
        uid = 'master'
        control = Control()
        window = Window(uid, str(id(self)), url=None, html=None, js_api=None, width=width, height=height, x=None,
                        y=None,
                        resizable=True, fullscreen=False, min_size=(200, 100), hidden=False,
                        frameless=False, easy_drag=True,
                        minimized=False, on_top=False, confirm_close=False, background_color=bg_color,
                        transparent=False, text_select=True, localization=None,
                        zoomable=True, draggable=True, vibrancy=False)
        self.window = window
        self.web_view = EdgeChrome(control, window, None)

        self.width = width
        self.height = height
        self.parent = parent

        self.loaded = window.events.loaded
        if url != '':
            self.load_url(url)

    def load_url(self, url):
        self.web_view.load_url(url)



# =============================== Functions definition =================================================================

# --------------------------------- Themes -----------------------------------------------------------------------------
def title_bar_color(window, color):
    # import ctypes as ct
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

    except Exception as e:
        print("title_bar_color fun error : ", e)



def main():
    app = tk.Tk()
    app.geometry("600x500")
    app.state("zoomed")
    app.title("")
    title_bar_color(app, "#12161F")

    new_web_view_frame = tk.Frame(app, bg="#000000")
    new_web_view_frame.place( relwidth=1, relheight=1)
    frame2 = WebView2(new_web_view_frame, 500, 500)
    frame2.place(relheight=1, relwidth=1, relx=0, rely=0)

    frame2.load_url('https://movionyx.com')
    frame2.user_agent='MovionyxApp/1.0'

    app.mainloop()


def go():
    try:
        main()
    except Exception as e:
        print(e)


if __name__ == "__main__":
    main()