const { app, shell, BrowserWindow, Menu } = require('electron')
const isMac = process.platform === 'darwin'
const fs = require('fs');
const { parse } = require('node-html-parser')

let loadingScreen;
let mainWindow;
let aboutScreen;
let helpScreen;


const createLoadingScreen = () => {
  /// create a browser window
  loadingScreen = new BrowserWindow({
    width: 400,
    height: 350,
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
    frame: false,
    width: 400,
    height: 350,
    title: '',
    center: true,
    minimizable: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
    }
  })
  aboutScreen.loadFile('src/windows/about.html')
  aboutScreen.on('closed', function() {
    aboutScreen = null
  })
}

function createHelpScreen() {
  if (helpScreen) {
    helpScreen.focus()
    return
  }
  /// create a browser window
  helpScreen = new BrowserWindow({
    frame: false,
    width: 500,
    height: 600,
    title: '',
    center: true,
    minimizable: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
    }
  })
  helpScreen.loadFile('src/windows/help.html')
  helpScreen.on('closed', function() {
    helpScreen = null
  })
}
  
function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    minWidth: 600,
    minHeight: 600,
    icon: "scr/img/icon/logo1.png",
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      fullscreenable: true,
      //fullscreen: true,
    },
    show: false
    /// set show to false, the window will be visible when to loading screen will be remove
  });

  var menu = Menu.buildFromTemplate([
    {
        label: (isMac ? app.name : "File"),
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
        (isMac ? {role: 'zoom'} : {
          label: 'Maximize',
          click: _ => {
            mainWindow.maximize();
          }
      })
      ]
    },
    {
      label: 'Help',
      submenu: [
        { role: 'toggleDevTools'},
        { type: 'separator' },
        { label: 'Tips and Tricks',
          click() {
            createHelpScreen()
          }
        },
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

  app.allowRendererProcessReuse = false;   //! A work around to allow for NeDB to be called on reload of render, https://github.com/louischatriot/nedb/issues/649

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')
  //mainWindow.loadURL('data:text/html, ' + baseHtml)
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


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createLoadingScreen();

  // timeout to show loading screen
  setTimeout(() => {
    createWindow();
  }, 2500); // normally 4000

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