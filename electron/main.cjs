const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const isMac = process.platform === 'darwin'
const isDev = !app.isPackaged

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: '#0b0b0f',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isDev) {
    const devServerURL = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173'
    mainWindow.loadURL(devServerURL)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    const indexHtml = path.join(__dirname, '..', 'dist', 'index.html')
    mainWindow.loadFile(indexHtml)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})
