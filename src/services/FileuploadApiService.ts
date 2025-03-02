import httpAuth from "@/auth-common";
import { ref } from "vue";

const token = localStorage.getItem("user") as string;

class UserApiService {
  openFlag(data: object) {
    return httpAuth.post("/api/fileupload/openFlag", data);
  }
  deleteStatus(data: object) {
    return httpAuth.post("/api/fileupload/deleteStatus", data);
  }
  async getList(data: object) {
    try {
      return await httpAuth.post("/api/fileupload/list", data);
    } catch (e) {
      console.log(e);
      location.reload();
    }
  }
}

export default new UserApiService();
