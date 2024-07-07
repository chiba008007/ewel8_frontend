import http from "@/user-common";
import httpAuth from "@/auth-common";
import { ref } from "vue";

class UserApiService {
  editLoginAdmin(editData: object) {
    return httpAuth.post("/api/user/adminEdit", editData);
  }
  getPost(data: object): Promise<object> {
    return http.post("/api/login", data);
  }
  getAdmin(data: object): Promise<object> {
    return httpAuth.post("/api/user/admin", data);
  }
  setPartner(data: object): Promise<object> {
    return httpAuth.post("/api/user/setUserData", data);
  }
  setLicense(data: object): Promise<object> {
    return httpAuth.post("/api/user/setUserLicense", data);
  }
  checkEmail(data: string) {
    return httpAuth.get("/api/user/checkEmail?email=" + data);
  }
}

export default new UserApiService();
