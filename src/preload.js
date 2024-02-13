const {ipcRenderer, contextBridge} = require('electron');

window.Word2Html = {
  openDialog: () => ipcRenderer.invoke('Word2HtmlDialog')
};