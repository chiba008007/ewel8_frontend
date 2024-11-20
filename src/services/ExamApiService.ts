import http from "@/user-common";
import httpAuth from "@/auth-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";

class ExamApiService {
  getExam(editData: object) {
    return http.post("/api/exam/getExam", editData);
  }
  examLogin(editData: object) {
    return http.post("/api/exam/login", editData);
  }
}

export default new ExamApiService();
