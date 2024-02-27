const fs = require("fs");
const { app } = require("electron");

module.exports = {
  path: {
    storage: app.getPath("userData") + "/storage.json",
  },
  key: {
    ACCESS_TOKEN: "ACCESS_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
  },
  get(key) {
    try {
      const settings = fs.readFileSync(this.path.storage);
      const settingsJson = JSON.parse(settings);
      return settingsJson[key];
    } catch {
      return null;
    }
  },
  set(key, value) {
    let objToWrite = { [key]: value };
    const fileExists = fs.existsSync(this.path.storage);

    if (fileExists) {
      const settings = fs.readFileSync(this.path.storage);
      const settingsJson = JSON.parse(settings);
      objToWrite = { ...settingsJson, ...objToWrite };
    }
    try {
      fs.writeFileSync(
        this.path.storage,
        JSON.stringify(objToWrite, null, 2),
        "utf8"
      );
    } catch (error) {
    }
  },
  setObject(obj){
    let objToWrite = obj;
    const fileExists = fs.existsSync(this.path.storage);

    if (fileExists) {
      const settings = fs.readFileSync(this.path.storage);
      const settingsJson = JSON.parse(settings);
      objToWrite = { ...settingsJson, ...obj };
    }
    try {
      fs.writeFileSync(
        this.path.storage,
        JSON.stringify(objToWrite, null, 2),
        "utf8"
      );
      console.log("Data successfully saved to disk");
    } catch (error) {
      console.log("storage.js set fs.writeFileSync error ", error);
    }
  },

  remove(key) {
    try {
      const settings = fs.readFileSync(this.path.storage);
      const settingsJson = JSON.parse(settings);
      delete settingsJson[key];

      fs.writeFileSync(
        this.path.storage,
        JSON.stringify(settingsJson, null, 2),
        "utf8"
      );
      console.log("key successfully removed from settings");
    } catch (error) {
      console.log("setting file doesnt exists");
    }
  },
};
