import http from "@/user-common";
import { Pref } from "@/types/pref";
class PrefApiService {
  async getPrefData(): Promise<Pref[]> {
    const response = await this.getData();
    return response.data.pref.map((p: Pref) => ({
      id: p.id,
      name: p.name,
    }));
  }
  getData() {
    return http.get("/api/pref");
  }
}

export default new PrefApiService();
