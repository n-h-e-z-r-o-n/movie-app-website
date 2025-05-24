import webview

def on_before_load(window):
    # Block specific URLs (e.g., containing "redirect" or a specific domain)
    url = window.url  # Access the URL from the request object
    if "https://movionyx.com" in url:
        return True  # Allow navigation
    else:
        print(f"Blocked redirect: {url}")
        return False  # Cancel navigation

if __name__ == '__main__':
    window = webview.create_window('Block Redirect Example', 'https://movionyx.com', draggable=True,frameless=True, easy_drag=True)
    window.settings = {
        'ALLOW_DOWNLOADS': False,
        'ALLOW_FILE_URLS': False,
        'OPEN_EXTERNAL_LINKS_IN_BROWSER': False,
        'OPEN_DEVTOOLS_IN_DEBUG': False,
        'REMOTE_DEBUGGING_PORT': None
    }
    webview.start()