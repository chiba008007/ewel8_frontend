import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  //baseURL: "http://localhost:8000",
  baseURL: "https://api.uh-oh.jp",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "https://smp.uh-oh.jp",
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default apiClient;
