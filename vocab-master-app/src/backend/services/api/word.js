const { ipcConfig } = require("config");
const http = require("../HttpService/index.js");
module.exports = {
  [ipcConfig.channel.GET_QUICK_GAME]: async () => {
    const res = await http.get(`/secure/word/random-words`);
    console.log('get quick game response',res);
    return res.data;
  },
};
