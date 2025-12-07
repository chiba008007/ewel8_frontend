import httpAuth from "@/auth-common";

class AdminPageLogService {
  getPageLog(data: object) {
    return httpAuth.post("/api/page/list", data);
  }
  setPageLog(data: object) {
    return httpAuth.post("/api/page/log", data);
  }
}

export default new AdminPageLogService();
