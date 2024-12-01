import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

class CsvApiService {
  getPfs(data: object) {
    return httpAuth.post("/api/csv/getPfs", data);
  }
}

export default new CsvApiService();
