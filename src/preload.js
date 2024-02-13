const {ipcRenderer, contextBridge} = require('electron');

window.fileDialog = {
  openDialog: (options) => ipcRenderer.invoke('openDialog', options),
  saveDialog: (options) => ipcRenderer.invoke('saveDialog', options)
};