import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

class TestApiService {
  setTest(editData: object) {
    return httpAuth.post("/api/test/setTest", editData);
  }
  editTest(editData: object) {
    return httpAuth.post("/api/test/editTest", editData);
  }
  getTestList(editData: object) {
    return httpAuth.post("/api/test/getTestList", editData);
  }
  getTestTableTh(data: object) {
    return httpAuth.post("/api/test/getTestTableTh", data);
  }
  getQRLists(editData: object) {
    return httpAuth.post("/api/test/getQRLists", editData);
  }
  getQRParam(data: object) {
    return httpAuth.post("/api/test/getQRParam", data);
  }
  getExam(data: object) {
    return httpAuth.post("/api/test/getTestDetail", data);
  }
  getTestEditData(data: object) {
    return httpAuth.post("/api/test/getTestEditData", data);
  }
  getCsvList(data: object) {
    return httpAuth.post("/api/test/getCsvList", data);
  }
  getPFSTestDetail(data: object) {
    return httpAuth.post("/api/test/getPFSTestDetail", data);
  }
  async getSearchExam(data = {}) {
    return httpAuth.post("/api/test/getSearchExam", data);
  }
  async getTest(data = {}) {
    return await httpAuth.post("/api/test/getTest", data);
  }
  async deleteTest(data = {}) {
    return await httpAuth.post("/api/test/deleteTest", data);
  }
}

export default new TestApiService();
