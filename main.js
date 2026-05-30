const { app, BrowserWindow } = require('electron');
const { GEMINI_URL, WINDOW_OPTIONS } = require('./src/app-config');

function createWindow() {
  const window = new BrowserWindow(WINDOW_OPTIONS);
  window.loadURL(GEMINI_URL);
  return window;
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

module.exports = {
  createWindow
};
