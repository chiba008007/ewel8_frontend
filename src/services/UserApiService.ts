import http from "@/user-common";

class UserApiService {
  getPost(data: object): Promise<object> {
    return http.post("/api/login", data);
  }
}

export default new UserApiService();
