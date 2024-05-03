import http from "@/user-common";

class PrefApiService {
  async getPrefData() {
    const tmp: Array<object> = [];
    await this.getData().then((response) => {
      const leng = response.data.pref.length;
      for (let i = 0; i < leng; i++) {
        tmp.push({
          id: response.data.pref[i].id,
          name: response.data.pref[i].name,
        });
      }
    });
    return tmp;
  }
  getData() {
    return http.get("/api/pref");
  }
}

export default new PrefApiService();
