import http from "@/auth-common";

class UserLogout {
  logout(): Promise<object> {
    return http.post("/api/logout");
  }
}

export default new UserLogout();
