import sys
from PySide6.QtCore import QUrl, QTimer, Qt
from PySide6.QtWidgets import QApplication, QMainWindow, QMessageBox
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebEngineCore import QWebEnginePage

class CustomWebEnginePage(QWebEnginePage):
    def __init__(self, parent=None):
        super().__init__(parent)

    def acceptNavigationRequest(self, url, nav_type, is_main_frame):
        allowed_prefix = "https://movionyx"
        if url.toString().startswith(allowed_prefix):
            return True  # Allow loading
        else:
            print(f"Blocked navigation to:\n{url.toString()}")
            return False  # Block loading


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
