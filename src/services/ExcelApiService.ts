import http from "@/user-common";
import httpAuth from "@/auth-common";
import { ref } from "vue";

class ExcelApiService {
  getExcel(data: object) {
    return httpAuth.post("/api/excel/create", data);
  }
}

export default new ExcelApiService();
