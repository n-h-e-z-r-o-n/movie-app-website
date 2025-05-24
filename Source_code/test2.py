import webview

def on_before_load(window, url):
    # Block specific URLs (e.g., containing "redirect" or a specific domain)
    if "https://movionyx.com" in url:
        return True  # Allow navigation
    else:
        print(f"Blocked redirect to: {url}")
        return False  # Cancel navigation


if __name__ == '__main__':
    window = webview.create_window('Block Redirect Example', 'https://movionyx.com')
    window.events.before_load += on_before_load
    webview.start()