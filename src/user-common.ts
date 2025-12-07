import axios, { AxiosInstance } from "axios";
import { d_Path } from "./plugins/const";
const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: d_Path,
  //baseURL: "https://api.uh-oh.jp",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    //   "Access-Control-Allow-Origin": d_Path,
    //   "Access-Control-Allow-Credentials": true,
  },
  // withCredentials: true,
  // withXSRFToken: true,
});

export default apiClient;
