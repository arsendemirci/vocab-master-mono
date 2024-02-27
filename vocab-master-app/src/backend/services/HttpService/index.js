const axios = require("axios");
const storage = require("#storageUtils");
let HttpService = axios.create({ baseURL: "http://localhost:3000" });

HttpService.interceptors.request.use(
  (config) => {
    /** In dev, intercepts request and logs it into console for dev */
    // console.log("request is sending", JSON.stringify(config));
    const token = storage.get(storage.key.ACCESS_TOKEN);

    config.headers["Authorization"] = storage.get(storage.key.ACCESS_TOKEN);

    return config;
  },
  (error) => {
    console.log("request send error", JSON.stringify(error));
    return Promise.reject(error);
  }
);

HttpService.interceptors.response.use(
  (res) => {
    // console.log("response received from api", response.data);
    if (res && res.data && res.data.auth) {
      storage.setObject({
        [storage.key.ACCESS_TOKEN]: res.data.auth.accessToken,
        [storage.key.REFRESH_TOKEN]: res.data.auth.refreshToken,
      });

      delete res.data.auth;
    }

    return res;
  },
  (error) => {
    // console.log("response is error", error.response.data);
    return Promise.resolve(error.response);
  }
);

const isExpireError = (error) => {
  return (
    error &&
    error.response &&
    error.response.status === 401 &&
    error.response.data &&
    error.response.data.error &&
    error.response.data.error.Code === 601
  );
};

module.exports = HttpService;
