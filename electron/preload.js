const { contextBridge, ipcRenderer } = require('electron');

// Expose safe Electron APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  toggleTheme: () => ipcRenderer.invoke('toggle-theme'),
  onNavigate: (callback) => ipcRenderer.on('nav', (_event, path) => callback(path)),
  removeNavigateListener: () => ipcRenderer.removeAllListeners('nav'),
  isElectron: true,
});
