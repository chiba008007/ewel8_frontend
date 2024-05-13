import http from "@/user-common";
import { ref } from "vue";
class PdfApiService {
  list = ref();
  async getElementData() {
    const tmp = ref();
    await this.getData().then((response) => {
      tmp.value = response.data.pdf;
    });
    this.list = tmp;
    return tmp;
  }
  getData() {
    return http.get("/api/pdf");
  }
}

export default new PdfApiService();
