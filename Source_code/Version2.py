import sys
from PySide6.QtCore import QUrl, Qt
from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebEngineCore import QWebEnginePage

class CustomWebEnginePage(QWebEnginePage):
    def __init__(self, parent=None):
        super().__init__(parent)

    def acceptNavigationRequest(self, url, nav_type, is_main_frame):
        allowed_prefixes = [
            "https://movionyx",
            "https://www.youtube.com",  # For YouTube iframe videos
            "https://player.vimeo.com",  # For Vimeo iframe videos
            # Add other allowed domains for iframes
        ]

        url_str = url.toString()

        # Block redirects unless they target an allowed domain
        if nav_type == QWebEnginePage.NavigationTypeRedirect:
            if any(url_str.startswith(prefix) for prefix in allowed_prefixes):
                print(f"Allowed redirect to:\n{url_str}")
                return True
            else:
                print(f"Blocked redirect to:\n{url_str}")
                return False

        # Allow iframe content from allowed domains
        if not is_main_frame and any(url_str.startswith(prefix) for prefix in allowed_prefixes):
            return True

        # Restrict main frame navigation to movionyx
        if is_main_frame and url_str.startswith("https://movionyx"):
            return True

        print(f"Blocked navigation to:\n{url_str}")
        return False

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Movionyx WebView")

        self.web_view = QWebEngineView(self)
        self.setCentralWidget(self.web_view)

        page = CustomWebEnginePage(self.web_view)
        self.web_view.setPage(page)

        self.web_view.load(QUrl("https://movionyx.com"))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.resize(1024, 768)
    window.show()
    sys.exit(app.exec())