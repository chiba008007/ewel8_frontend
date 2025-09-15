import httpAuth from "@/auth-common";

class HistoryApiService {
  testhistory(data: object) {
    return httpAuth.post("/api/testhistory/index", data);
  }
}

export default new HistoryApiService();
