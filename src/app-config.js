const GEMINI_URL = 'https://gemini.google.com/';

const WINDOW_OPTIONS = {
  width: 1200,
  height: 800,
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: true
  }
};

module.exports = {
  GEMINI_URL,
  WINDOW_OPTIONS
};
