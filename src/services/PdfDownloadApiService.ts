import httpAuth from "@/auth-common";
import { ref } from "vue";

class PdfDownloadApiService {
  setTest(editData: object) {
    return httpAuth.post("/api/pdf/setPDFUpload", editData);
  }
  getTest(editData: object) {
    return httpAuth.post("/api/pdf/getPDFUpload", editData);
  }
}

export default new PdfDownloadApiService();
