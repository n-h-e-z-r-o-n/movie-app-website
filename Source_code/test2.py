import webview

MY_DOMAIN = 'https://movionyx.com'

def should_block_url(url):
    return MY_DOMAIN not in url



def on_loaded():
    webview.windows[0].evaluate_js(js_script)

if __name__ == '__main__':
    webview.settings['OPEN_EXTERNAL_LINKS_IN_BROWSER'] = False
    webview.settings['OPEN_DEVTOOLS_IN_DEBUG'] = False
    webview.create_window('', 'https://movionyx.com', frameless=False, easy_drag=True, fullscreen=False, )
    webview.start( user_agent='MovionyxApp/1.0', icon='/logo.png')