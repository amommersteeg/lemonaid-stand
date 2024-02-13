const {ipcRenderer, contextBridge} = require('electron');

window.fileDialog = {
  openDialog: () => ipcRenderer.invoke('fileDialog')
};