import httpAuth from "@/auth-common";
import httpAuthUpload from "@/auth-upload-common";

class UserApiService {
  csvUploadFile(data: object) {
    return httpAuth.post("/api/csvupload/csvUploadFile", data);
  }

  updateCsvExam(formData: FormData): Promise<boolean> {
    return httpAuthUpload.post("/api/csvupload/updateCsvExam", formData);
  }
  getCsvUpload(data: object) {
    return httpAuth.post("/api/csvupload/getCsvUploadList", data);
  }
}

export default new UserApiService();
