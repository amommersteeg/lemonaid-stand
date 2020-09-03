const { app, BrowserWindow } = require('electron')
//const tinymce = require('./node_modules/tinymce/tinymce.min.js')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)