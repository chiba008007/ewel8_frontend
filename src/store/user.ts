import { defineStore } from "pinia";
export const useStoreUser = defineStore("user", {
  state: () => ({
    count: 1,
    count2: 2,
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
    setUserData(data: any) {
      data.then((response: any) => {
        this.userToken = response.data.token;
      });
    },
  },
});
