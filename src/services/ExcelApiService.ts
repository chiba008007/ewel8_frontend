import httpAuth from "@/auth-common";

class ExcelApiService {
  getExcel(data: object) {
    return httpAuth.post("/api/excel/create", data);
  }
  testExec(data: object) {
    return httpAuth.post("/api/excel/testExec", data);
  }
}

export default new ExcelApiService();
