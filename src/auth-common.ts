import axios from "axios";
import { d_Path } from "./plugins/const";
import { useStoreUser } from "@/store/user";

const apiClient = axios.create({
  baseURL: d_Path,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": d_Path,
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
  withXSRFToken: true,
});

apiClient.interceptors.request.use((config) => {
  const store = useStoreUser();

  if (store.userToken) {
    config.headers.Authorization = `Bearer ${store.userToken}`;
  }

  return config;
});

export default apiClient;
