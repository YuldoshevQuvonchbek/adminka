import axios, { AxiosInstance } from "axios";
import { loadState } from "./story";

export const request: AxiosInstance = axios.create({
  baseURL: "http://135.181.108.207",
});

request.interceptors.request.use(
  (setconfig) => {
    if (setconfig.url !== "/api/admin-login/")
      setconfig.headers["Authorization"] = `Token ${loadState("user").token}`;

    return setconfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);
