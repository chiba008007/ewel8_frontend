import httpAuth from "@/auth-common";
import httpAuthUpload from "@/auth-upload-common";
class ExamloginApiService {
  getExamLoginList(data: object) {
    return httpAuth.post("/api/examloginhistory/getData", data);
  }
}

export default new ExamloginApiService();
