import http from "@/user-common";
import httpAuth from "@/authExam-common";
import httpUpload from "@/upload-common";
import { ref } from "vue";
import axios, { AxiosInstance } from "axios";
import { d_Path } from "@/plugins/const";

class ExamApiService {
  getExam(editData: object) {
    return http.post("/api/exam/getExam", editData);
  }
  getTestExamMenu(data: object) {
    return httpAuth.post("/api/exam/getTestExamMenu", data);
  }
  async getExamData(data = {}) {
    // return httpAuth.post("/api/exam/getExamData");
    const token = localStorage.getItem("user") as string;
    try {
      const res = await axios.post(d_Path + "/api/exam/getExamData", data, {
        headers: {
          "Content-type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "Access-Control-Allow-Origin": d_Path,
          "Access-Control-Allow-Credentials": true,
          Authorization: "Bearer " + JSON.parse(token)?.userTokenExam,
        },
      });
      return res;
    } catch (e) {
      console.log(e);
      location.reload();
    }
  }
  examLogin(editData: object) {
    return http.post("/api/exam/login", editData);
  }
}

export default new ExamApiService();
