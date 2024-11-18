import axios, { AxiosInstance } from "axios";
import { d_Path } from "./plugins/const";
const token = localStorage.getItem("user") as string;
const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: d_Path,
  //baseURL: "https://api.uh-oh.jp",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": d_Path,
    "Access-Control-Allow-Credentials": true,
    Authorization: "Bearer " + JSON.parse(token)?.userToken,
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default apiClient;
