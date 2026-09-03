import httpAuth from "@/auth-common";

class CsvApiService {
  getPfs(data: object) {
    return httpAuth.post("/api/csv/getPfs", data);
  }
  getBAJ3(data: object) {
    return httpAuth.post("/api/csv/getBAJ3", data);
  }
  getBAJ4(data: object) {
    return httpAuth.post("/api/csv/getBAJ4", data);
  }
  getVFJ(data: object) {
    return httpAuth.post("/api/csv/getVFJ", data);
  }
  getBEA(data: object) {
    return httpAuth.post("/api/csv/getBEA", data);
  }
  getEAIb(data: object) {
    return httpAuth.post("/api/csv/getEAIb", data);
  }
  getEAIa(data: object) {
    return httpAuth.post("/api/csv/getEAIa", data);
  }
}

export default new CsvApiService();
