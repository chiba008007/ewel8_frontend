import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

import axios, { AxiosInstance } from "axios";
import { d_Path } from "@/plugins/const";
const token = localStorage.getItem("user") as string;

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
  async getPartner(data: object) {
    //return await httpAuth.post("/api/user/getPartner", data);
    try {
      const res = await axios.post(d_Path + "/api/user/getPartner", data, {
        headers: {
          "Content-type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": d_Path,
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + JSON.parse(token)?.userToken,
        },
      });
      return res;
    } catch (e) {
      console.log(e);
      location.reload();
    }
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
  checkLoginID(data: string) {
    return httpAuth.get("/api/user/checkLoginID?loginid=" + data);
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
  getPartnerid(data: object): Promise<object> {
    return httpAuth.post("/api/user/getPartnerid", data);
  }
  getUserLisence(data: object): Promise<object> {
    return httpAuth.post("/api/user/getUserLisence", data);
  }
  getUserLisenceCalc(data: object): Promise<object> {
    return httpAuth.post("/api/user/getUserLisenceCalc", data);
  }
}

export default new UserApiService();
