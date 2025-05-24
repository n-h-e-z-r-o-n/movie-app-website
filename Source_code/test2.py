import webview

if __name__ == '__main__':
    webview.settings['OPEN_EXTERNAL_LINKS_IN_BROWSER'] = False
    webview.settings['OPEN_DEVTOOLS_IN_DEBUG'] = False
    webview.create_window('', 'https://movionyx.com', frameless=False, easy_drag=True, fullscreen=False, )
    webview.start(user_agent='MovionyxApp/1.0', icon='/logo.png')