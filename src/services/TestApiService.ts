import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

class TestApiService {
  setTest(editData: object) {
    return httpAuth.post("/api/test/setTest", editData);
  }
}

export default new TestApiService();
