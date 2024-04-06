import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: "http://localhost:8000",
  // リクエストヘッダ
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer 16|NbUoKcFycSpIm6AyY8HpvMYCWa51HztQkZcwX3aH492ffb7f",
  },
});

export default apiClient;
