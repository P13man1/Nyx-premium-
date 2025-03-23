import os
import sys
import subprocess
import time
import random
import string
from ppadb.client import Client as AdbClient
import usb.core
import threading

# ANSI colors
PURPLE = "\033[95m"
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

# ASCII intro
INTRO = """
   __ _____       _            
  | \ | |         |  __ \     (_)           
  |  \| |_   _    | |__) |__ ___ __   ___ 
  |.` | | | |   |  ___/ __| | | '_ \ /_ \
  | |\  | |_| |   | |   \__ \ | | | | |  __/
  |_| |_|__,_|   |_|   |___/_|_|_| |_|___|
       Premium V2 - Unleash the Pulse
"""

def animate_intro():
    for line in INTRO.splitlines():
        print(f"{PURPLE}{line}{RESET}", flush=True)
        time.sleep(0.1)
    print(f"{GREEN}Booting core systems...{RESET}")
    for _ in range(6):
        junk = "".join(random.choices(string.hexdigits.lower(), k=32))
        print(f"{GREEN}0x{junk}{RESET}", end="\r", flush=True)
        time.sleep(0.15)
    print(f"{PURPLE}Pulse engaged{RESET}\n")

def check_activation():
    parts = [
        0x33, 0x39, 0x50, 0x32, 0x34, 0x4D, 0x34, 0x38,
        0x52, 0x35, 0x54, 0x31, 0x4A, 0x33, 0x58, 0x37
    ]
    real = "".join(chr(x ^ 0x5A) for x in parts)
    key = input(f"{PURPLE}Enter 16-digit access code: {RESET}")
    if key != real:
        print(f"{RED}Wrong code, access denied , Nah, mate. Telegram @Nyx0ra for the key {RESET}")
        sys.exit(1)
    print(f"{GREEN}Systems live. Time to own.{RESET}")

def list_devices():
    devices = []
    try:
        adb = AdbClient(host="127.0.0.1", port=5037)
        for dev in adb.devices():
            devices.append(("Android", dev.serial))
    except Exception as e:
        print(f"{RED}ADB error: {e}{RESET}")
    try:
        usb_devs = usb.core.find(find_all=True)
        for dev in usb_devs:
            if dev.idVendor == 0x05ac:  # Apple
                devices.append(("iOS", f"USB-{dev.idProduct}"))
    except Exception as e:
        print(f"{RED}USB scan error: {e}{RESET}")
    return devices

def mirror_screen(device_type, device_id):
    try:
        if device_type == "Android":
            subprocess.Popen(["scrcpy", "-s", device_id])
        elif device_type == "iOS":
            print(f"{PURPLE}iOS screen mirroring not supported yet.{RESET}")
    except Exception as e:
        print(f"{RED}Mirror error: {e}{RESET}")

def run_command(device_type, device_id, cmd):
    try:
        if device_type == "Android":
            subprocess.run(["adb", "-s", device_id, "shell", cmd], check=True)
        elif device_type == "iOS":
            subprocess.run(["idevicesyslog", "-u", device_id])
    except Exception as e:
        print(f"{RED}Command execution error: {e}{RESET}")

def show_help():
    print(f"{PURPLE}--- NyxPulse Premium V2 Manual ---{RESET}")
    print("  list          - Scan connected devices")
    print("  select <num>  - Select a device")
    print("  cmd <command> - Execute shell command")
    print("  mirror        - Mirror screen")
    print("  help          - Show help menu")
    print("  exit          - Exit program")
    print(f"{PURPLE}--------------------------------{RESET}")

def main():
    animate_intro()
    check_activation()
    selected_device = None
    while True:
        try:
            cmd = input(f"{PURPLE}nyx> {RESET}").strip().lower()
            if cmd == "list":
                devices = list_devices()
                if not devices:
                    print(f"{RED}No devices found.{RESET}")
                for i, (dev_type, dev_id) in enumerate(devices):
                    print(f"{GREEN}{i}: {dev_type} - {dev_id}{RESET}")
            elif cmd.startswith("select"):
                idx = int(cmd.split()[1])
                devices = list_devices()
                if 0 <= idx < len(devices):
                    selected_device = devices[idx]
                    print(f"{GREEN}Selected: {selected_device[0]} - {selected_device[1]}{RESET}")
                else:
                    print(f"{RED}Invalid selection.{RESET}")
            elif cmd == "mirror" and selected_device:
                threading.Thread(target=mirror_screen, args=(selected_device[0], selected_device[1])).start()
                time.sleep(1)
                print(f"{GREEN}Screen mirroring started.{RESET}")
            elif cmd.startswith("cmd ") and selected_device:
                command = " ".join(cmd.split()[1:])
                run_command(selected_device[0], selected_device[1], command)
            elif cmd == "help":
                show_help()
            elif cmd == "exit":
                print(f"{PURPLE}Exiting...{RESET}")
                break
            else:
                print(f"{RED}Invalid command. Type 'help' for available commands.{RESET}")
        except ValueError:
            print(f"{RED}Invalid input. Type a proper command.{RESET}")
        except Exception as e:
            print(f"{RED}Error: {e}{RESET}")

if __name__ == "__main__":
    main()
