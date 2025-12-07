import axios, { AxiosInstance } from "axios";
import { d_Path } from "./plugins/const";
import { useStoreUser } from "@/store/user";

const apiClient: AxiosInstance = axios.create({
  baseURL: d_Path,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// 🔥 API 呼び出し直前に毎回 token を注入する
apiClient.interceptors.request.use((config) => {
  const store = useStoreUser();

  if (store.userToken) {
    config.headers.Authorization = `Bearer ${store.userToken}`;
  }

  return config;
});

export default apiClient;
