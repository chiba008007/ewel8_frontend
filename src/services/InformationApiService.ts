import httpAuth from "@/auth-common";
import httpAuthUpload from "@/auth-upload-common";
class InformationApiService {
  getInfoList(data: object) {
    return httpAuth.post("/api/infomation/getInfoList", data);
  }
  setInfoList(form: FormData): Promise<object> {
    return httpAuthUpload.post("/api/infomation/setInfoList", form);
  }
  getUser(data: object) {
    return httpAuth.post("/api/infomation/getUser", data);
  }
  editInfoListDelete(data: object) {
    return httpAuth.post("/api/infomation/editInfoListDelete", data);
  }
  getInformation(data: object) {
    return httpAuth.post("/api/infomation/getInformation", data);
  }
}

export default new InformationApiService();
