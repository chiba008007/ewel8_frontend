import axios, { AxiosInstance } from "axios";
const token = localStorage.getItem("user") as string;
const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: "http://localhost:8000",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + JSON.parse(token)?.userToken,
  },
});

export default apiClient;
