import axios, { AxiosRequestConfig, AxiosError } from "axios"; // adjust the path to your jwt helper function as needed
import { parseJwt } from "./auth/auth-utils";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (typeof config.headers.Authorization === "string") {
      const token = config.headers.Authorization.split(" ")[1];
      const data = parseJwt(token);
      if (Date.now() > data.exp * 1000) {
        window.location.href = "/signin";
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default instance;
