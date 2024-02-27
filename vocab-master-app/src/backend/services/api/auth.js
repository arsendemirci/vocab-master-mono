const { ipcConfig } = require("config");
const http = require("../HttpService/index.js");
const storage = require("#storageUtils");
module.exports = {
  [ipcConfig.channel.LOGIN]: async (event, email, password) => {
    const res = await http.post(`/public/auth/login`, { email, password });

    return res.data;
  },
  [ipcConfig.channel.REGISTER]: async (event, name, email, password) => {
    const res = await http.post(`/public/auth/register`, {
      name,
      email,
      password,
    });

    return res.data;
  },
  [ipcConfig.channel.REFRESH]: async (event) => {
    const res = await http.post("/public/auth/refresh", {
      refreshToken: storage.get(storage.key.REFRESH_TOKEN),
    });

    return res.data;
  },
  [ipcConfig.channel.VERIFY_USER]: async (event, userId, verificationCode) => {
    const res = await http.post("/public/auth/verify-user", {
      userId,
      verificationCode,
    });

    return res.data;
  },
};
