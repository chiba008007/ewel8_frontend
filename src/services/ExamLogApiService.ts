import httpAuth from "@/authExam-common";

class ExamLogApiService {
  set(data: object) {
    return httpAuth.post("/api/ExamLog/set", data);
  }
}

export default new ExamLogApiService();
