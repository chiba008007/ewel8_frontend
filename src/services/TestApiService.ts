import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

class TestApiService {
  setTest(editData: object) {
    return httpAuth.post("/api/test/setTest", editData);
  }
  getTestList(editData: object) {
    return httpAuth.post("/api/test/getTestList", editData);
  }
  getQRParam(data: object) {
    return httpAuth.post("/api/test/getQRParam", data);
  }
}

export default new TestApiService();
