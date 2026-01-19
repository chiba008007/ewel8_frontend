import http from "@/user-common";
import type { Element } from "@/types/element";

class ElementApiService {
  async getElementData() {
    const tmp: Element[] = [];
    await this.getData().then((response) => {
      const leng = response.data.element.length;
      for (let i = 0; i < leng; i++) {
        tmp.push({
          id: response.data.element[i].id,
          text: response.data.element[i].note,
          note: response.data.element[i].note,
        });
      }
    });
    return tmp;
  }
  getData() {
    return http.get("/api/element");
  }
}

export default new ElementApiService();
