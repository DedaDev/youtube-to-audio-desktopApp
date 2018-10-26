// Modules to control application life and create native browser window
const ytdl = require('ytdl-core');
const fs = require('fs');
const {app, BrowserWindow, Menu, MenuItem, ipcMain} = require('electron')
let axios = require('axios')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 700, height: 400,frame: false})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()



  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  restOfCode()
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let template = [

]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function restOfCode(){
  ipcMain.on('processURL', (event, url) => {
    ytdl.getInfo(url, (err, info) => {
      let formats = info.player_response.streamingData.adaptiveFormats;
      let audioFormats = formats.filter(e=>{return e.mimeType.startsWith('audio')})
      event.sender.send('stream', {url:audioFormats[0].url, title:info.title, data:info}) // ovo data za console.log posle debuging
    })
    
  })
  ipcMain.on('frameControl', (event,command)=>{
    switch(command){
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'maximize':
        mainWindow.maximize();
        break;
      case 'close':
        mainWindow.close()
        break;
    }
    
  })
  mainWindow.webContents.on('did-finish-load', async ()=>{
    
  });
}