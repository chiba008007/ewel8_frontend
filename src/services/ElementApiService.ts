import http from "@/user-common";

class ElementApiService {
  async getElementData() {
    const tmp: Array<object> = [];
    await this.getData().then((response) => {
      const leng = response.data.element.length;
      for (let i = 0; i < leng; i++) {
        tmp.push({
          id: response.data.element[i].id,
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
