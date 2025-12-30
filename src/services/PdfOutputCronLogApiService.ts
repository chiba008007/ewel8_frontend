import httpAuth from "@/auth-common";

class PdfOutputCronLogApiService {
  set(data: object) {
    return httpAuth.post("/api/pdfOutputCronLog/set", data);
  }
  getList(data: object) {
    return httpAuth.post("/api/pdfOutputCronLog/getList", data);
  }
}

export default new PdfOutputCronLogApiService();
