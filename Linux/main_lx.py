# pip install pywebview[qt]
import webview
import threading
import time

webview.settings['ALLOW_DOWNLOADS'] = True
webview.settings['OPEN_EXTERNAL_LINKS_IN_BROWSER'] = False


def open_url():
    previous = None
    while True:
        c_url = window.get_current_url()
        if c_url != previous:
            if c_url.startswith("http://movionyx.com") or c_url.startswith("https://movionyx.com")  or c_url.startswith("https://vidsrc"):
                print(f"Navigating to: {c_url} (Allowed)")
                window.load_url(c_url)
                previous = c_url
            else:
                window.load_url(previous)
                print(f"Blocked: {c_url} (External site)")

window=webview.create_window(" ", url="https://movionyx.com/watch?id=1027358&type=movie")
#webview.start(icon="./icon.png", private_mode=False, storage_path="./data")
threading.Thread(target=open_url, daemon=True).start()
webview.start()