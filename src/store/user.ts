import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";
export const useStoreUser = defineStore("user", {
  state: () => ({
    count: 1,
    count2: 2,
    isLogin: false,
    isExamLogin: false,
    userdata: {},
    userToken: {},
    userTokenExam: {},
    userExam: {},
    home: "HOME",
    customerInfoList: "顧客企業一覧",
    testList: "検査一覧",
    testExamList: "検査結果一覧",
    examSearch: "受検者検索",
    testAdd: "検査登録",
    customerRegist: "新規顧客登録",
    partnerEdit: "企業情報変更",
    addPartner: "新規パートナー登録",
    editPartner: "パートナー情報変更",
    privacyText:
      "本検査提供会社は、個人情報を適切な方法で管理し、下記の利用目的以外で受検者の同意なく、第三者に対し開示することはありません。\n\n【個人情報の利用目的】\n本検査提供会社は、弊社の担当部署に、採用活動や人材育成等の目的範囲内に限定し、結果を開示します。\n弊社は、目的に応じ必要な範囲で、検査提供会社に情報を開示することがあります。\n検査提供会社は、研究開発を目的として、受検者に関する検査結果を個人が識別、または特定できないようにし、利用する場合があります。\n\n【検査受検に関する注意事項】\n本検査受検にて得られる検査結果は、当該受検者の人格の全てを規定したり、保証したりするものではありません。\n検査提供会社は、検査受検の結果によって被る受検者の損害に対して、一切責任を負いません。\n\n同意して頂ける場合は、次へお進み下さい。",
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
    setUserDataExamToken(data: string) {
      this.userTokenExam = data;
      this.isExamLogin = true;
    },
    setUserDataToken(data: string) {
      this.userToken = data;
      this.isLogin = true;
    },
    setUserData(data: object) {
      this.userdata = data;
    },
    setUserExamData(data: object) {
      this.userExam = data;
    },
    getUserData() {
      return JSON.parse(JSON.stringify(this.userdata));
    },
    IsLogout() {
      this.isLogin = false;
    },
    IsLogoutExam() {
      this.isExamLogin = false;
    },

    // ログインした人のIDとパラメータのIDが同じ確認
    sameIdChecked(userid: number, paramId: number) {
      const router = useRouter();
      if (userid != paramId) {
        router.push(router.resolve({ name: "error" }).href);
      }
      return true;
    },
  },
});
