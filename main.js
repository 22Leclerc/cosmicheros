// main.js (CommonJS)
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // mantenha true por segurança
    },
  });

  // carrega seu jogo
  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  // mainWindow.webContents.openDevTools(); // se quiser abrir DevTools
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Evita múltiplas instâncias
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (mainWindow === null) createWindow();
  });
}
