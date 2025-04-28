import axios from "axios";
declare module "axios" {
  export interface InternalAxiosRequestConfig {
    meta: any;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
