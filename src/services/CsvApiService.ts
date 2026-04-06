import httpAuth from "@/auth-common";

class CsvApiService {
  getPfs(data: object) {
    return httpAuth.post("/api/csv/getPfs", data);
  }
  getBAJ3(data: object) {
    return httpAuth.post("/api/csv/getBAJ3", data);
  }
  getVFJ(data: object) {
    return httpAuth.post("/api/csv/getVFJ", data);
  }
  getBEA(data: object) {
    return httpAuth.post("/api/csv/getBEA", data);
  }
}

export default new CsvApiService();
