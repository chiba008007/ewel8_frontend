import httpAuth from "@/auth-common";

class WeightApiService {
  setWeightMaster(data: object) {
    return httpAuth.post("/api/weight/setWeightMaster", data);
  }
}

export default new WeightApiService();
