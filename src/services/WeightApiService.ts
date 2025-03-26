import httpAuth from "@/auth-common";

class WeightApiService {
  setWeightMaster(data: object) {
    return httpAuth.post("/api/weight/setWeightMaster", data);
  }
  editWeightMaster(data: object) {
    return httpAuth.post("/api/weight/editWeightMaster", data);
  }
  editStatusWeightMaster(data: object) {
    return httpAuth.post("/api/weight/editStatusWeightMaster", data);
  }
  getWeightMaster(data: object) {
    return httpAuth.post("/api/weight/getWeightMaster", data);
  }
  getWeightMasterDetail(data: object) {
    return httpAuth.post("/api/weight/getWeightMasterDetail", data);
  }
}

export default new WeightApiService();
