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
}

export default new UserApiService();
