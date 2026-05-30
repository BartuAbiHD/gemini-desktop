const test = require('node:test');
const assert = require('node:assert/strict');

const { GEMINI_URL, WINDOW_OPTIONS } = require('../src/app-config');

test('Gemini URL is configured', () => {
  assert.equal(GEMINI_URL, 'https://gemini.google.com/');
});

test('Window options enforce secure defaults', () => {
  assert.equal(WINDOW_OPTIONS.webPreferences.contextIsolation, true);
  assert.equal(WINDOW_OPTIONS.webPreferences.nodeIntegration, false);
  assert.equal(WINDOW_OPTIONS.webPreferences.sandbox, true);
});
