import http from "@/user-common";
import { ref } from "vue";
class LicenseApiService {
  list = ref();
  async getElementData() {
    const tmp = ref();
    await this.getData().then((response) => {
      tmp.value = response.data.license;
    });
    this.list = tmp;
    return tmp;
  }
  getData() {
    return http.get("/api/license");
  }
  getSearchData(str: string) {
    const tmp = [];
    for (const key in this.list.value) {
      const code = this.list.value[key].code;
      const text = this.list.value[key].text;
      const regex = new RegExp(str);
      if (!code || regex.test(code) || regex.test(text)) {
        tmp.push(this.list.value[key]);
      }
    }
    return tmp;
  }
}

export default new LicenseApiService();
