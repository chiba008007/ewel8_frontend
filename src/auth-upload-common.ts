import axios, { AxiosInstance } from "axios";
import { d_Path } from "./plugins/const";
const token = localStorage.getItem("user") as string;

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: d_Path,
  // リクエストヘッダ
  headers: {
    //"content-type": "multipart/form-data",
    "X-Requested-With": "XMLHttpRequest",
    // "Access-Control-Allow-Origin": d_Path,
    // "Access-Control-Allow-Credentials": true,
    Authorization: "Bearer " + JSON.parse(token)?.userToken,
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default apiClient;
