from pystray import Icon, Menu, MenuItem
from PIL import Image
import threading


def on_quit(icon, item):
    icon.stop()

def run_tray():
    icon_path = "./Movionyx.ico"
    image = Image.open(icon_path)
    icon = Icon(
        "app_name",
        icon=image,
        title="Movionyx",
        menu=Menu(
            MenuItem("Quit", on_quit),
           MenuItem("Open", on_quit)
        )
    )
    icon.run()

# Run in a separate thread to avoid blocking
threading.Thread(target=run_tray, daemon=True).start()

# Your app logic here
while True:
    print("workin")
    pass
