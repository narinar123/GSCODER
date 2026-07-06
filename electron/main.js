const { app, BrowserWindow, Menu, Tray, ipcMain, shell, nativeTheme, protocol } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

let mainWindow = null;
let tray = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    frame: process.platform !== 'darwin',
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#0a0a0f',
    icon: path.join(__dirname, '../public/icons/icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
    },
    show: false,
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

function createMenu() {
  const template = [
    {
      label: 'GSQoderAI',
      submenu: [
        { label: 'About GSQoderAI', role: 'about' },
        { type: 'separator' },
        { label: 'Settings', accelerator: 'CmdOrCtrl+,', click: () => mainWindow?.webContents.send('nav', '/settings') },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
      ],
    },
    {
      label: 'Navigate',
      submenu: [
        { label: 'Home', accelerator: 'CmdOrCtrl+1', click: () => mainWindow?.webContents.send('nav', '/') },
        { label: 'AI Chat', accelerator: 'CmdOrCtrl+2', click: () => mainWindow?.webContents.send('nav', '/chat') },
        { label: 'Agents', accelerator: 'CmdOrCtrl+3', click: () => mainWindow?.webContents.send('nav', '/agents') },
        { label: 'Automations', accelerator: 'CmdOrCtrl+4', click: () => mainWindow?.webContents.send('nav', '/automation') },
        { type: 'separator' },
        { label: 'Integrations', click: () => mainWindow?.webContents.send('nav', '/integrations') },
        { label: 'Models', click: () => mainWindow?.webContents.send('nav', '/models') },
      ],
    },
    {
      label: 'View',
      submenu: [
        { label: 'Reload', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'Force Reload', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { type: 'separator' },
        { label: 'Zoom In', accelerator: 'CmdOrCtrl+=', role: 'zoomIn' },
        { label: 'Zoom Out', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: 'Reset Zoom', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Toggle Fullscreen', accelerator: 'F11', role: 'togglefullscreen' },
        ...(isDev ? [{ label: 'Toggle DevTools', accelerator: 'CmdOrCtrl+Option+I', role: 'toggleDevTools' }] : []),
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
        { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'selectAll' },
      ],
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' }, { role: 'zoom' }, { role: 'close' },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { label: 'GSQoderAI Documentation', click: () => shell.openExternal('https://github.com/narinar123/GSCODER') },
        { label: 'GS Groups Website', click: () => shell.openExternal('https://www.gsgroups.net') },
        { type: 'separator' },
        { label: 'Report Issue', click: () => shell.openExternal('https://github.com/narinar123/GSCODER/issues') },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// IPC Handlers
ipcMain.handle('get-platform', () => process.platform);
ipcMain.handle('get-app-version', () => app.getVersion());
ipcMain.handle('open-external', (_event, url) => shell.openExternal(url));
ipcMain.handle('toggle-theme', () => {
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
  return nativeTheme.shouldUseDarkColors;
});

app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (tray) tray.destroy();
});
