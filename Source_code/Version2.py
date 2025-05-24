import sys
from PySide6.QtCore import QUrl
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWidgets import QApplication

if __name__ == "__main__":
    app = QApplication(sys.argv)
    web = QWebEngineView()

    # Set custom User-Agent
    user_agent = "MovionyxApp/1.0"
    web.page().profile().setHttpUserAgent(user_agent)

    # Load a webpage
    web.load(QUrl("https://movionyx.com"))
    web.show()

    sys.exit(app.exec())