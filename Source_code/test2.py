import webview

def on_before_load(window, url):
    # Block specific URLs (e.g., containing "redirect" or a specific domain)
    if "https://movionyx.com" in url:
        return True  # Allow navigation
    else:
        print(f"Blocked redirect ")
        return False  # Cancel navigation


if __name__ == '__main__':
    window = webview.create_window('Block Redirect Example', 'https://movionyx.com')
    window.events.before_load += on_before_load
    webview.settings = {
        'ALLOW_DOWNLOADS': False,
        'ALLOW_FILE_URLS': True,
        'OPEN_EXTERNAL_LINKS_IN_BROWSER': True,
        'OPEN_DEVTOOLS_IN_DEBUG': True,
        'REMOTE_DEBUGGING_PORT': None
    }
    webview.start(user_agent="MovionyxApp/1.0")