from pystray import Icon, Menu, MenuItem
from PIL import Image, ImageDraw
import threading

def create_image():
    # Create a simple icon image (16x16 or 32x32)
    image = Image.new('RGB', (64, 64), 'white')
    dc = ImageDraw.Draw(image)
    dc.rectangle((16, 16, 48, 48), fill='black')
    return image

def on_quit(icon, item):
    icon.stop()

def run_tray():
    icon = Icon(
        "app_name",
        icon=create_image(),
        title="My Python App",
        menu=Menu(
            MenuItem("Quit", on_quit)
        )
    )
    icon.run()

# Run in a separate thread to avoid blocking
threading.Thread(target=run_tray, daemon=True).start()

# Your app logic here
while True:
    # Simulating background work
    pass
