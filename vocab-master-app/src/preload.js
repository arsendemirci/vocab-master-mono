// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcConfig } from "#config";
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  applicationExit: () => ipcRenderer.invoke(ipcConfig.channel.APP_EXIT),
  getGame: (gameName) =>
    ipcRenderer.invoke(ipcConfig.channel.GET_GAME, gameName),
  getLists: () => ipcRenderer.invoke(ipcConfig.channel.GET_LISTS),
  getQuickGame: () => ipcRenderer.invoke(ipcConfig.channel.GET_QUICK_GAME),
  refreshToken: () => ipcRenderer.invoke(ipcConfig.channel.REFRESH),
  login: (email, password) =>
    ipcRenderer.invoke(ipcConfig.channel.LOGIN, email, password),
  register: (name, email, password) =>
    ipcRenderer.invoke(ipcConfig.channel.REGISTER, name, email, password),
  verifyUser: (userId, code) =>
    ipcRenderer.invoke(ipcConfig.channel.VERIFY_USER, userId, code),
  test: () => ipcRenderer.invoke(ipcConfig.channel.TEST),
  close: () => ipcRenderer.removeAllListeners(),
});
