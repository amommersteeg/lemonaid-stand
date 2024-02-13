const { app, shell, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const remoteMain = require('@electron/remote/main');
const isMac = process.platform === 'darwin';
const path = require('node:path');

remoteMain.initialize();
let loadingScreen;
let mainWindow;
let aboutScreen;

const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow({
    width: 400,
    height: 400,
    /// remove the window frame, so it will rendered without frames
    frame: false,
    /// and set the transparency to true, to remove any kind of background
    transparent: true,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
    }
  });
  var menu = Menu.buildFromTemplate([
    {label: app.name,
      submenu: [
        { role: 'quit' }
      ]
    }
  ])
  Menu.setApplicationMenu(menu); 
  loadingScreen.setResizable(false);
  loadingScreen.loadFile('src/windows/loadingscreen.html')
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
    loadingScreen.show();
  });
}

function createAboutScreen() {
  if (aboutScreen) {
    aboutScreen.focus()
    return
  }
  /// create a browser window
  aboutScreen = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    width: 400,
    height: 400,
    title: '',
    center: true,
    minimizable: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: false,
    }
  })
  aboutScreen.loadFile('src/windows/about.html')
  aboutScreen.on('closed', function() {
    aboutScreen = null
  })
}
  
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    icon: "scr/img/icon/lemon.png",
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      fullscreenable: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false
    /// set show to false, the window will be visible when to loading screen will be remove
  });

  var menu = Menu.buildFromTemplate([
    {
        label: app.name,
        submenu: [
          { label: 'About',
            click() {
              createAboutScreen()
            }
         },
          { type: 'separator' },
          { role: 'quit' }
        ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall'}
      ] 
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload'},
        { role: 'forceReload'},
        { type: 'separator' },
        { role: 'minimize'},
        (isMac ? {role: 'zoom'} : { role: ' togglefullscreen'})
      ]
    },
    {
      label: 'Help',
      submenu: [
        { role: 'toggleDevTools'},
        { type: 'separator' },
        { 
          label: 'Contact',
          click: async () => {
            await shell.openExternal('https://withane.design/contact/')
          }
        }
      ]
    }

  ])

  Menu.setApplicationMenu(menu); 

  remoteMain.enable(mainWindow.webContents);

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  mainWindow.webContents.on('did-finish-load', () => {
    /// when the content has loaded, hide the loading screen and show the main window
    if (loadingScreen) {
      loadingScreen.close();
    }
    mainWindow.show();
  });

  ipcMain.handle('openDialog', async (event, options) => {
    if(!options) {
      options = {
          properties: ['openFile'],
          filters: [
              {name: 'All Files', extensions: ['*']}
          ]
      }
    }
    const { canceled, filePaths } = await dialog.showOpenDialog(options)
      if (!canceled) {
        return filePaths[0];
      } else {
        return null;
      }
  });

  ipcMain.handle('saveDialog', async (event, options) => {
    const { canceled, filePath } = await dialog.showSaveDialog(options)
    if (!canceled) {
      return filePath;
    } else {
      return null;
    }
  });
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createLoadingScreen();
  /// add a little timeout for tutorial purposes, remember to remove this
  setTimeout(() => {
    createWindow();
  }, 4000);
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.