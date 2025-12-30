import httpAuth from "@/auth-common";
import { ref } from "vue";

class PdfDownloadApiService {
  setTest(editData: object) {
    return httpAuth.post("/api/pdf/setPDFUpload", editData);
  }
  setOutPutLog(editData: object) {
    return httpAuth.post("/api/pdf/setOutPutLog", editData);
  }
  getTest(editData: object) {
    return httpAuth.post("/api/pdf/getPDFUpload", editData);
  }
  getOutPutLog(editData: object) {
    return httpAuth.post("/api/pdf/getOutPutLog", editData);
  }
}

export default new PdfDownloadApiService();
