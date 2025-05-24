import sys
from PySide6.QtCore import QUrl
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWebEngineCore import QWebEnginePage, QWebEngineUrlRequestInterceptor
from PySide6.QtWidgets import QApplication


# Optional: Interceptor to block all non-allowed resource requests (scripts, ads, images, etc.)
class RequestInterceptor(QWebEngineUrlRequestInterceptor):
    def interceptRequest(self, info):
        allowed_hosts = {"movionyx.com", "www.movionyx.com", ""}
        if info.requestUrl().host() not in allowed_hosts:
            print(f"Blocked resource: {info.requestUrl().toString()}")
            info.block(True)


class CustomWebEnginePage(QWebEnginePage):
    def acceptNavigationRequest(self, url, nav_type, is_main_frame):
        allowed_hosts = {"movionyx.com", "www.movionyx.com"}

        if url.scheme().startswith("http") and url.host() in allowed_hosts:
            return True  # Allow navigation

        print(f"Blocked navigation to: {url.toString()}")

        # Option: Redirect back to homepage
        if is_main_frame:
            self.setUrl(QUrl("https://movionyx.com"))

        return False  # Block navigation


if __name__ == "__main__":
    app = QApplication(sys.argv)
    web = QWebEngineView()

    # Set up the interceptor
    interceptor = RequestInterceptor()

    # Create custom page and apply settings
    page = CustomWebEnginePage(web)
    profile = page.profile()
    profile.setUrlRequestInterceptor(interceptor)
    profile.setHttpUserAgent("MovionyxApp/1.0")

    web.setPage(page)

    # Load the initial webpage
    web.load(QUrl("https://movionyx.com"))
    web.show()

    sys.exit(app.exec())
