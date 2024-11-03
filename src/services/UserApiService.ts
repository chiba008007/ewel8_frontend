import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

class UserApiService {
  checkTest() {
    return http.get("/api/test");
  }
  editLoginAdmin(editData: object) {
    return httpAuth.post("/api/user/adminEdit", editData);
  }
  getPost(data: object): Promise<object> {
    return http.post("/api/login", data);
  }
  getAdmin(data: object): Promise<object> {
    return httpAuth.post("/api/user/admin", data);
  }
  getPartner(data: object): Promise<object> {
    return httpAuth.post("/api/user/getPartner", data);
  }
  getPartnerDetail(data: object): Promise<object> {
    return httpAuth.post("/api/user/getPartnerDetail", data);
  }
  setPartner(data: object): Promise<object> {
    return httpAuth.post("/api/user/setUserData", data);
  }
  editPartner(data: object): Promise<object> {
    return httpAuth.post("/api/user/editPartner", data);
  }
  setLicense(data: object): Promise<object> {
    return httpAuth.post("/api/user/setUserLicense", data);
  }
  checkEmail(data: string) {
    return httpAuth.get("/api/user/checkEmail?email=" + data);
  }
  onUpload(form: FormData): Promise<object> {
    return httpUpload.post("/api/user/upload", form);
  }
  setCustomerAdd(data: object): Promise<object> {
    return httpAuth.post("/api/user/setCustomerAdd", data);
  }
  getLisencesList(data: object): Promise<object> {
    return httpAuth.post("/api/user/getLisencesList", data);
  }
  getCustomerList(data: object): Promise<object> {
    return httpAuth.post("/api/user/getCustomerList", data);
  }
}

export default new UserApiService();
