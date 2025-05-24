from PySide6.QtWidgets import QApplication, QMainWindow
from PySide6.QtWebEngineWidgets import QWebEngineView
import sys

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("My WebView App")
        self.setGeometry(100, 100, 1024, 768)

        web = QWebEngineView()
        web.load("https://movionyx.com")
        self.setCentralWidget(web)

app = QApplication(sys.argv)
window = MainWindow()
window.show()
app.exec()
