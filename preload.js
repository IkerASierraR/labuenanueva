import { contextBridge, ipcRenderer, shell } from 'electron'

contextBridge.exposeInMainWorld('uptDesktop', {
  openExternal: (url) => {
    if (typeof url === 'string' && url.startsWith('http')) {
      shell.openExternal(url)
    }
  },
  setWindowControls: (options) => {
    ipcRenderer.invoke('set-window-controls', options)
  },
})
