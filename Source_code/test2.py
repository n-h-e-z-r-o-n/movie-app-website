import webview

if __name__ == '__main__':
    webview.create_window('', 'https://movionyx.com', frameless=True,easy_drag=True, fullscreen=True, )
    webview.start(user_agent='MovionyxApp/1.0', icon='./logo.png')