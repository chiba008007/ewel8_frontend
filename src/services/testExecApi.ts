import httpAuth from "@/auth-common";

class testExecApi {
  getUserElement(data: object) {
    return httpAuth.post("/api/testExec/getCustomerExec", data);
  }
}

export default new testExecApi();
