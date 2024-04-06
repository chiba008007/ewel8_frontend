import http from "@/user-common";

class UserApiService {
  getPost(data: any): Promise<any> {
    return http.post("/api/login", data);
  }
}

export default new UserApiService();
