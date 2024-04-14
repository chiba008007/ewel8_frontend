import { defineStore } from "pinia";
export const useStoreUser = defineStore("user", {
  state: () => ({
    count: 1,
    count2: 2,
    isLogin: false,
    userdata: {},
    userToken: {},
  }),
  persist: true,
  // computed と同じ
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    setUserDataToken(data: string) {
      this.userToken = data;
      this.isLogin = true;
    },
    setUserData(data: object) {
      this.userdata = data;
    },
    getUserData() {
      return JSON.parse(JSON.stringify(this.userdata));
    },
    IsLogout() {
      this.isLogin = false;
    },
  },
});
