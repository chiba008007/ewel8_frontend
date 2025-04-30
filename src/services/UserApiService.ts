import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import httpAuthUpload from "@/auth-upload-common";
import { ref } from "vue";

import axios, { AxiosInstance } from "axios";
import { d_Path } from "@/plugins/const";
const token = localStorage.getItem("user") as string;

interface GetCustomerEditResponse {
  data: {
    name: string;
  };
}

class UserApiService {
  checkTest() {
    return http.get("/api/test");
  }
  getUserElement(data: object) {
    return httpAuth.post("/api/user/getUserElement", data);
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
    }
  }
  getPartnerDetail(data: object) {
    try {
      return httpAuth.post("/api/user/getPartnerDetail", data);
    } catch (e) {
      return false;
      //location.href="/error"
    }
  }
  getPartnerDetailData(data: object) {
    try {
      return httpAuth.post("/api/user/getPartnerDetailData", data);
    } catch (e) {
      return false;
      //location.href="/error"
    }
  }
  setPartner(data: object): Promise<object> {
    return httpAuth.post("/api/user/setUserData", data);
  }
  editPartner(data: object) {
    return httpAuth.post("/api/user/editPartner", data);
  }
  editPartnerData(data: object) {
    return httpAuth.post("/api/user/editPartnerData", data);
  }
  setLicense(data: object): Promise<object> {
    return httpAuth.post("/api/user/setUserLicense", data);
  }
  checkEmail(data: string) {
    return httpAuth.get("/api/user/checkEmail?email=" + data);
  }
  checkLoginID(data: string, editid: string) {
    return httpAuth.get(
      "/api/user/checkLoginID?loginid=" + data + "&editid=" + editid
    );
  }
  onUpload(form: FormData): Promise<object> {
    return httpUpload.post("/api/user/upload", form);
  }
  onFileUpload(form: FormData): Promise<object> {
    return httpAuthUpload.post("/api/user/fileupload", form);
  }
  setCustomerAdd(data: object): Promise<object> {
    return httpAuth.post("/api/user/setCustomerAdd", data);
  }
  customerEdit(data: object): Promise<object> {
    return httpAuth.post("/api/user/customerEdit", data);
  }
  getLisencesList(data: object): Promise<object> {
    return httpAuth.post("/api/user/getLisencesList", data);
  }
  getCustomerList(data: object): Promise<object> {
    return httpAuth.post("/api/user/getCustomerList", data);
  }

  async getCustomerEdit(data: object): Promise<GetCustomerEditResponse> {
    return await httpAuth.post("/api/user/getCustomerEdit", data);
  }
  async getPartnerid(data: object): Promise<{ data: number }> {
    return await httpAuth.post("/api/user/getPartnerid", data);
  }
  async getUserLisence(data: object): Promise<object> {
    return await httpAuth.post("/api/user/getUserLisence", data);
  }
  getUserLisenceCalc(data: object): Promise<object> {
    return httpAuth.post("/api/user/getUserLisenceCalc", data);
  }
  async getUserData(data: object) {
    try {
      return await httpAuth.post("/api/user/getUserData", data);
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default new UserApiService();
