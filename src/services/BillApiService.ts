import httpAuth from "@/auth-common";

class BillApiService {
  get(data: object) {
    return httpAuth.post("/api/bill/index", data);
  }
  getData(data: object) {
    return httpAuth.post("/api/bill/get", data);
  }
  setTest(data: object) {
    return httpAuth.post("/api/bill/set", data);
  }
  delete(data: object) {
    return httpAuth.post("/api/bill/delete", data);
  }
}

export default new BillApiService();
