const { ipcConfig } = require("config");

const fs = require("fs");
const { app } = require("electron");
module.exports = {
  [ipcConfig.channel.TEST]: () => {
    console.log("storage key,  ", app.getPath("userData"));
    const settings = fs.readFileSync(app.getPath("userData") + "/config.json");
    // const stored = localStorage.getItem(key);
    console.log("settings -> ", settings);

    return { test: "OK" };
  },
};
