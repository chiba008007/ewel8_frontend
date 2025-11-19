import httpAuth from "@/auth-common";

class InformationApiService {
  getInfoList(data: object) {
    return httpAuth.post("/api/infomation/getInfoList", data);
  }
}

export default new InformationApiService();
