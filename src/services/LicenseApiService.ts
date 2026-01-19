// src/services/LicenseApiService.ts
import http from "@/user-common";
import httpAuth from "@/auth-common";
import type { License } from "@/types/license";

class LicenseApiService {
  // 低レベルAPI（他でも使える）
  getData() {
    return http.get("/api/license");
  }

  // アプリ用の整形済みAPI
  async getLicenseData(): Promise<License[]> {
    const response = await this.getData();
    return response.data.license;
  }

  async getLicenseList() {
    return httpAuth.post("/api/userlicense/list", []);
  }
}

export default new LicenseApiService();
