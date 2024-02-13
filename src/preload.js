const {ipcRenderer, contextBridge} = require('electron');

window.fileDialog = {
  openDialog: (options) => ipcRenderer.invoke('openDialog', options),
  saveDialog: (options) => ipcRenderer.invoke('saveDialog', options)
};

window.appVersion = {
  getVersion: () => ipcRenderer.invoke('getVersion')
};

window.screen = {
  closeWindow: () => ipcRenderer.invoke('closeWindow')
};