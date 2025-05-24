import webview

def on_before_load(window, request):
    # Block specific URLs (e.g., containing "redirect" or a specific domain)
    url = request.url  # Access the URL from the request object
    if "https://movionyx.com" in url:
        return True  # Allow navigation
    else:
        print(f"Blocked redirect: {url}")
        return False  # Cancel navigation

if __name__ == '__main__':
    window = webview.create_window('Block Redirect Example', 'https://movionyx.com')
    window.events.before_load += on_before_load
    window.webview.settings = {
        'ALLOW_DOWNLOADS': False,
        'ALLOW_FILE_URLS': True,
        'OPEN_EXTERNAL_LINKS_IN_BROWSER': False,
        'OPEN_DEVTOOLS_IN_DEBUG': True,
        'REMOTE_DEBUGGING_PORT': None
    }
    webview.start(user_agent="MovionyxApp/1.0")