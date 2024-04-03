import { defineStore } from "pinia";
export const useStoreUser = defineStore("user", {
  state: () => ({
    count: 1,
    count2: 2,
    user: {
      name: "John Doe",
    },
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
  },
});
