import os
import win32com.client #pip install pywin32


def create_shortcut(target_path, shortcut_name, icon_path=None):
    desktop = os.path.join(os.environ['USERPROFILE'], 'Desktop')
    shortcut_path = os.path.join(desktop, f"{shortcut_name}.lnk")

    shell = win32com.client.Dispatch("WScript.Shell")
    shortcut = shell.CreateShortcut(shortcut_path)
    shortcut.TargetPath = target_path
    shortcut.WorkingDirectory = os.path.dirname(target_path)
    if icon_path:
        shortcut.IconLocation = icon_path
    shortcut.Save()


# Example usage
target = os.path.abspath("movionyx.py")  # or .py if run with python
shortcut_name = "MoviOnyx"
icon = os.path.abspath("Movionyx.ico")  # Optional

create_shortcut(target, shortcut_name, icon)
