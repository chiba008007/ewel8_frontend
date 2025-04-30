import httpAuth from "@/auth-common";

interface GetCustomerEditResponse {
  data: {
    name: string;
    login_id: string;
    post_code: string;
    pref: string;
    address1: string;
    address2: string;
    tel: string;
    fax: string;
    trendFlag: boolean;
    pdfFlag: boolean;
    csvFlag: boolean;
    weightFlag: boolean;
    excelFlag: boolean;
    customFlag: boolean;
    sslFlag: boolean;
    logoImagePath: string;
    privacy: boolean;
    displayFlag: boolean;
    privacyText: string;
    tanto_name: string;
    tanto_address: string;
    tanto_busyo: string;
    tanto_tel1: string;
    tanto_tel2: string;
    tanto_name2: string;
    tanto_address2: string;
  };
}

class UserApiGetCustomerEdit {
  async getCustomerEdit(data: object): Promise<GetCustomerEditResponse> {
    return await httpAuth.post("/api/user/getCustomerEdit", data);
  }
}

export default new UserApiGetCustomerEdit();
