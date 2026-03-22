import http from "@/user-common";
import httpAuth from "@/authExam-common";
import axios, { AxiosInstance } from "axios";
import { d_Path } from "@/plugins/const";

class ExamVFJApiService {
  async getVFJ(data: object) {
    try {
      return await httpAuth.post("/api/exam/getVFJ", data);
    } catch (e) {
      return false;
      //location.href = "/exam/error";
    }
  }
  setVFJ(data: object) {
    return httpAuth.post("/api/exam/setVFJ", data);
  }
  editVFJ(data: object) {
    return httpAuth.post("/api/exam/editVFJ", data);
  }
  getExam(editData: object) {
    return http.post("/api/exam/getExam", editData);
  }

  // getExamTestParts(data: object) {
  //   return httpAuth.post("/api/exam/getExamTestParts", data);
  // }
  getTestDataExam(data: object) {
    return httpAuth.post("/api/exam/getTestDataExam", data);
  }
  checkStatus(data: object) {
    return httpAuth.post("/api/exam/checkStatus", data);
  }
  editExamData(data: object) {
    return httpAuth.post("/api/exam/editExamData", data);
  }
  downloadExam(data: object) {
    return httpAuth.post("/api/exam/downloadExam", data);
  }
  setStarttime(data: object) {
    return httpAuth.post("/api/exam/setStarttime", data);
  }

  async getTestExamMenu(data: object) {
    try {
      return await httpAuth.post("/api/exam/getTestExamMenu", data);
    } catch (e) {
      location.href = "/exam/error";
    }
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
      return false;
      //  location.reload();
    }
  }
  examLogin(editData: object) {
    return http.post("/api/exam/login", editData);
  }
}

export default new ExamVFJApiService();
