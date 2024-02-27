const { ipcMain, app } = require("electron");
const handlers = require("./api/index");

module.exports = (function () {
  const { ipcConfig } = require("config");

  Object.keys(handlers).forEach((key) => {
    Object.keys(handlers[key]).forEach((channel) => {
      ipcMain.handle(channel, handlers[key][channel]);
    });
  });

  ipcMain.handle(ipcConfig.channel.APP_EXIT, () => {
    app.quit();
  });
})();
