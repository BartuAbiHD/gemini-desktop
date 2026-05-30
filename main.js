// main.js

// https://www.electronforge.io/config/makers/squirrel.windows
if (require('electron-squirrel-startup')) return;

const { app, shell, session, BrowserWindow, Menu, Tray, nativeImage, dialog, globalShortcut } = require('electron')
const { getHA, setHA } = require('./settings.js');

const { ElectronBlocker } = require('@ghostery/adblocker-electron');
const fetch = require('cross-fetch'); // required 'fetch'

// Bazı hataları uygulamanın çökmesini engellemek için sessizce yakala
process.on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
});

let currentWindow = null;
let isQuitting = false;

// Disable Hardware Acceleration
// https://www.electronjs.org/docs/latest/tutorial/offscreen-rendering
if (!getHA()) {
    app.disableHardwareAcceleration()
}

createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'Gemini Desktop',
        icon: __dirname + '/images/Gemini.png',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
            contextIsolation: true,
            webviewTag: true,
            nativeWindowOpen: true
        }
    });

    currentWindow = win;

    win.on('close', function (event) {
        if (!isQuitting) {
            event.preventDefault();
            win.hide();
        }
        return false;
    });

    win.loadURL(`https://gemini.google.com/`);

    // Polyfill for Electron 33+ compatibility with adblocker-electron
    if (typeof session.defaultSession.registerPreloadScript !== 'function') {
        session.defaultSession.registerPreloadScript = () => ({ id: 'mock-preload-id' });
        session.defaultSession.unregisterPreloadScript = () => { };
    }

    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
    }).catch(err => console.warn('Adblocker error:', err));

    // Create a Cookie, so that Theater Mode is allways enabled.
    // https://www.electronjs.org/docs/latest/api/cookies
    // http://blog.ercanopak.com/how-to-make-theater-mode-the-default-for-youtube/
    // https://medium.com/swlh/building-an-application-with-electron-js-part-2-e62c23e4eb69
    const cookie = { url: 'https://gemini.google.com', name: 'wide', value: '1' }
    session.defaultSession.cookies.set(cookie)
        .then(() => {
            // success
        }, (error) => {
            console.error(error)
        })

    // Open links with External Browser
    // https://stackoverflow.com/a/67409223
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Hardware Acceleration',
            type: 'checkbox',
            checked: getHA(),
            click({ checked }) {
                setHA(checked)
                dialog.showMessageBox(
                    null,
                    {
                        type: 'info',
                        title: 'info',
                        message: 'Exiting Applicatiom, as Hardware Acceleration setting has been changed...'
                    })
                    .then(result => {
                        if (result.response === 0) {
                            app.relaunch();
                            app.exit()
                        }
                    }
                    )
            }
        },
        {
            label: 'Clear Cache',
            click: () => {
                session.defaultSession.clearStorageData()
                app.relaunch();
                app.exit();
            }
        },
        {
            label: 'Reload',
            click: () => win.reload()
        },
        {
            label: 'Quit',
            type: 'normal',
            role: 'quit'
        }
    ])

    let tray = null
    if (process.platform == 'darwin') {
        const icon = nativeImage.createFromPath(__dirname + '/images/Gemini.icns')
        tray = new Tray(icon)
    } else if (process.platform == 'win32') {
        const icon = nativeImage.createFromPath(__dirname + '/images/Gemini.ico')
        tray = new Tray(icon)
    } else if (process.platform == 'linux') {
        const icon = nativeImage.createFromPath(__dirname + '/images/Gemini.png')
        tray = new Tray(icon)
    }

    tray.setToolTip('Gemini Desktop')
    tray.setTitle('Gemini Desktop')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
            win.focus();
        }
    });
};

app.whenReady().then(() => {
    createWindow()

    globalShortcut.register('Alt+Space', () => {
        if (currentWindow) {
            if (currentWindow.isVisible()) {
                currentWindow.hide();
            } else {
                currentWindow.show();
                currentWindow.focus();
            }
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('before-quit', () => {
    isQuitting = true;
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
