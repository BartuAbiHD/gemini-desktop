# Gemini Desktop

![Gemini](https://github.com/BartuAbiHD/gemini-desktop/blob/main/images/Gemini.png?raw=true)

Gemini Desktop is a simple Desktop application for using Gemini, built using [ElectronJS](https://www.electronjs.org).

## Features

- **Quick Toggle (Global Shortcut)**: Press `Alt + Space` anywhere on your computer to instantly show or hide the Gemini window.
- **Background Execution**: The app intelligently minimizes to the System Tray when closed, ensuring fast access without restarting. You can restore it by clicking the Tray Icon or via `Alt + Space`.
- **Hardware Acceleration Control**: Toggle hardware acceleration directly from the Tray context menu to improve performance or stability.
- **Built-in Ad-Blocker**: Integrated with `@ghostery/adblocker-electron` to provide a clean and seamless web experience.

## Installation

Download the latest [release](https://github.com/BartuAbiHD/gemini-desktop/releases) for Windows, Linux, and MacOS.

For Windows, a standard Executable is provided, as well as a NuGet package. RPM and DEB packages are available for Linux Distributions (not tested!).

## Launching

To run, just launch the executable via the Desktop Shortcut, or the Executable directly. 

## Building

To build locally, clone the repository and install the dependencies.

```powershell
git clone https://github.com/BartuAbiHD/gemini-desktop.git
cd gemini-desktop
npm install
```

To run the application locally:

```powershell
npm run test
```

To build the application installers:

```powershell
npm run make
```

## Dependencies

- electron
- electron-forge
- electron-store
- @ghostery/adblocker-electron

## Errata

Logo borrowed from [Wikipedia](https://commons.wikimedia.org/wiki/File:Gemini_sparkle_v002.svg)