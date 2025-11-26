const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 416,
    height: 720,
    resizable: true,
    maximizable: true,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("http://localhost:5173");
}

ipcMain.handle("set-window-controls", (event, options = {}) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;

  if (typeof options.resizable === "boolean") {
    win.setResizable(options.resizable);
  }

  if (typeof options.maximizable === "boolean") {
    win.setMaximizable(options.maximizable);
  }

  if (
    options.size &&
    typeof options.size.width === "number" &&
    typeof options.size.height === "number"
  ) {
    win.setSize(Math.floor(options.size.width), Math.floor(options.size.height));
    win.center();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
