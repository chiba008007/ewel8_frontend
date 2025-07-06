import httpAuth from "@/auth-common";

class ExamApiDataService {
  getTestExamEdit(data: object) {
    return httpAuth.post("/api/examEdit/getExamEditData", data);
  }
  editExamEditData(data: object) {
    return httpAuth.post("/api/examEdit/editExamEditData", data);
  }
}

export default new ExamApiDataService();
