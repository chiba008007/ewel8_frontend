import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { textString, SECRET_KEY } from "@/plugins/const";
import * as CryptoJS from "crypto-js";
import axios from "axios";

export const useStoreUser = defineStore("user", {
  state: () => ({
    count: 1,
    count2: 2,
    isLogin: false,
    isExamLogin: false,
    userdata: {} as { id: string; type: "admin" | "partner" | "user" },
    userToken: "" as string,
    userTokenExam: "" as string,
    userExam: {},
    home: "HOME",
    customerInfoList: "顧客企業一覧",
    download: "ダウンロード",
    upload: "添付",
    ListView: "パートナー一覧",
    testList: "検査一覧",
    testExamList: "検査結果一覧",
    testExamEdit: "受検者情報更新",
    testListsDownload: "ダウンロード",
    uploadView: "ファイルアップロード",
    csvupload: "CSVアップロード",
    pdfdownload: "PDF一括ダウンロード",
    examSearch: "受検者検索",
    searchExamlog: "検査ログ",
    searchPdflog: "PDF出力ログ",
    examRowData: "検査種別ROWデータ",
    billRowData: "請求書一覧",
    invoiceSetView: "請求書作成",
    licenseView: "ライセンス一覧",
    informationData: "お知らせ情報",
    informationDataSet: "お知らせ情報登録",
    examLiginHistory: "受検者ログイン情報",
    adminLoginHistory: "管理者ログイン情報",
    pdfoutputlog: "PDF一覧",
    lisenceList: "ライセンス一覧",
    billCreate: "請求書登録",
    testAdd: "検査登録",
    testDelete: "検査削除",
    customerRegist: "新規顧客登録",
    customerEdit: "新規顧客編集",
    pdflogo: "PDFロゴ画像登録",
    partnerEdit: textString.CompanyEdit,
    addPartner: "新規パートナー登録",
    editPartner: "パートナー情報変更",
    weightMaster: "重み付けマスタ登録",
    weightMasterSet: "重み付けマスタ新規登録",
    testExec: "実施件数確認",
    privacyText:
      "本検査提供会社は、個人情報を適切な方法で管理し、下記の利用目的以外で受検者の同意なく、第三者に対し開示することはありません。\n\n【個人情報の利用目的】\n本検査提供会社は、弊社の担当部署に、採用活動や人材育成等の目的範囲内に限定し、結果を開示します。\n弊社は、目的に応じ必要な範囲で、検査提供会社に情報を開示することがあります。\n検査提供会社は、研究開発を目的として、受検者に関する検査結果を個人が識別、または特定できないようにし、利用する場合があります。\n\n【検査受検に関する注意事項】\n本検査受検にて得られる検査結果は、当該受検者の人格の全てを規定したり、保証したりするものではありません。\n検査提供会社は、検査受検の結果によって被る受検者の損害に対して、一切責任を負いません。\n\n同意して頂ける場合は、次へお進み下さい。",
  }),
  persist: true,
  // computed と同じ
  getters: {
    doubleCount: (state) => state.count * 2,
    getTitle: (state) => {
      return (key: string) => {
        return (state as any)[key] ?? null;
      };
    },
  },
  actions: {
    setSession(key: string, id: string | string[] | number) {
      const str = CryptoJS.AES.encrypt(String(id), SECRET_KEY).toString();
      localStorage.setItem(key, str);
    },
    getSession(key: string) {
      const k = localStorage.getItem(key);
      if (!k) return "";
      const bytes = CryptoJS.AES.decrypt(k, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
    },
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

      axios.defaults.headers.common["Authorization"] = `Bearer ${data}`;
    },
    setUserData(data: { id: string; type: "admin" | "partner" | "user" }) {
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
      this.userToken = "";
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
