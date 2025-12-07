import axios, { AxiosInstance } from "axios";
import { d_Path } from "./plugins/const";
import { useStoreUser } from "@/store/user";

const apiClient: AxiosInstance = axios.create({
  baseURL: d_Path,
  headers: {
    "Content-type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// ★ ここが重要 ｜毎回最新の tokenExam を追加する
apiClient.interceptors.request.use((config) => {
  const store = useStoreUser();
  if (store.userTokenExam) {
    config.headers.Authorization = `Bearer ${store.userTokenExam}`;
  }
  return config;
});

export default apiClient;
