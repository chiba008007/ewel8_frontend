import httpAuth from "@/auth-common";
import httpAuthUpload from "@/auth-upload-common";
class CompanyDownloadApiService {
  getExamLoginList(data: object) {
    return httpAuth.post("/api/company/download/", data);
  }
}

export default new CompanyDownloadApiService();
