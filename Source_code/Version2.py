import tkinter as tk
import webview
import threading

class WebviewFrame:
    def __init__(self, master, url='https://movionyx.com', width=800, height=600, user_agent='MovionyxApp/1.0'):
        self.master = master
        self.url = url
        self.width = width
        self.height = height
        self.user_agent = user_agent
        self._init_ui()

    def _init_ui(self):
        # Frame where the webview will be embedded
        self.container = tk.Frame(self.master, width=self.width, height=self.height)
        self.container.pack(fill=tk.BOTH, expand=True)

        # Start webview in a thread to not block tkinter mainloop
        threading.Thread(target=self._start_webview, daemon=True).start()

    def _start_webview(self):
        # Use the master frame as the parent window
        webview.create_window(
            title='Movionyx',
            url=self.url,
            width=self.width,
            height=self.height,
            resizable=True,
            frameless=False,
            easy_drag=True,
        )
        webview.start()
