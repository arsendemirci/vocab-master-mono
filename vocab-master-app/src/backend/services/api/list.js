const { ipcConfig } = require("config");
const http = require("../HttpService/index.js");
module.exports = {
  [ipcConfig.channel.GET_GAME]: async (event, listId) => {
    const res = await http.get(`/secure/list/words/${listId}`);

    return res.data;
  },
  [ipcConfig.channel.GET_LISTS]: async () => {
    const res = await http.get("/secure/list");
    console.log("responce received ", res.data);
    return res.data;
  },
};
