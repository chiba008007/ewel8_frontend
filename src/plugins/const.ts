interface NumberCodeOrNullListType {
  [key: number]: string;
  null: string;
}
/** 画像 */

const uri = new URL(window.location.href);
const reg = /localhost/;
let tmp = "";
if (reg.test(uri.toString())) {
  tmp = "http://localhost:8000";
} else {
  tmp = "https://ewelmanage.uh-oh.jp";
}

export const d_Path = tmp;
//export const d_Path = "https://paperadmin.uh-oh.jp";
/** 画像 */
export const imagePath = d_Path + "/storage/app/myImage/";

/** 性別 */
export const gender: NumberCodeOrNullListType = {
  null: "-",
  1: "男性",
  2: "女性",
};
export const genderArray = [
  { value: 1, label: "男性" },
  { value: 2, label: "女性" },
  { value: 0, label: "選択しない" },
];

/** スリープ */
export const sleep = (waitMsec: number) => {
  const startMsec = new Date();
  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while ((new Date() as any) - (startMsec as any) < waitMsec);
};

/** 顧客タイプ */
export const customer = "customer";

/** 月 */
export const monthArray = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
  { id: 4, name: "4" },
  { id: 5, name: "5" },
  { id: 6, name: "6" },
  { id: 7, name: "7" },
  { id: 8, name: "8" },
  { id: 9, name: "9" },
  { id: 10, name: "10" },
  { id: 11, name: "11" },
  { id: 12, name: "12" },
];
/** 日 */
const days = [];
for (let i = 1; i <= 31; i++) {
  days.push({
    id: i,
    name: i,
  });
}
export const dayArray = days;
/* 時 */
const times = [];
for (let i = 0; i <= 23; i++) {
  times.push({
    id: i,
    name: i,
  });
}
export const timeArray = times;
/* 分 */
const minute = [];
for (let i = 0; i <= 59; i++) {
  minute.push({
    id: i,
    name: i,
  });
}
export const minuteArray = minute;

/** 動画表示配列 */
export const movieArray = [
  {
    key: 1,
    text: "表示する",
  },
  {
    key: 2,
    text: "表示する(受検終了時のみ)",
  },
  {
    key: 3,
    text: "表示しない",
  },
];

/** PDFグループ */
export const pdfGroup = [
  { key: 1, text: "行動価値検査結果レポート" },
  { key: 2, text: "感情能力検査レポート" },
  { key: 3, text: "行動意識検査" },
  { key: 4, text: "VF検査" },
  { key: 5, text: "コミュニケーション特性" },
  { key: 6, text: "個人結果" },
  { key: 7, text: "BMS検査結果" },
  { key: 8, text: "ブランド感度力診断" },
  { key: 9, text: "ベーシックオンライン" },
];

/** PDF一覧 */
export const pdfArray = [
  { key: 1, groupId: 1, text: "行動価値検査結果レポート（面接版適合あり）" },
  { key: 2, groupId: 1, text: "行動価値検査結果レポート（面接版適合なし）" },
  { key: 3, groupId: 1, text: "行動価値検査結果レポート（面接詳細版１）" },
  { key: 4, groupId: 1, text: "行動価値検査結果レポート（面接詳細版２）" },
  {
    key: 5,
    groupId: 1,
    text: "行動価値検査結果レポート（面接版適合なし）修正版",
  },
  { key: 6, groupId: 1, text: "行動価値検査結果レポート（ストレス版）" },
  { key: 7, groupId: 1, text: "行動価値検査結果レポート（自己理解版）" },
  { key: 8, groupId: 1, text: "行動価値検査結果レポート（A3 自己理解版）" },
  {
    key: 9,
    groupId: 1,
    text: "行動価値検査結果レポート（自己理解版 名前なし）",
  },
  { key: 10, groupId: 1, text: "行動価値検査結果レポート（自己理解版）修正版" },
  {
    key: 11,
    groupId: 1,
    text: "行動価値検査結果レポート 既存社員向け 面接版適合あり",
  },
  {
    key: 12,
    groupId: 1,
    text: "行動価値検査結果レポート 既存社員向け 自己理解版",
  },
  { key: 13, groupId: 2, text: "感情能力検査レポート" },
  { key: 14, groupId: 2, text: "感情能力レポートT" },
  { key: 15, groupId: 3, text: "行動意識検査" },
  { key: 16, groupId: 4, text: "VF検査(採用価値基準検査/表紙なし)" },
  { key: 17, groupId: 4, text: "VF検査(採用価値基準検査/表紙あり)" },
  {
    key: 18,
    groupId: 4,
    text: "VF検査(採用価値基準検査/表紙あり)既存社員面談向け",
  },
  { key: 19, groupId: 5, text: "コミュニケーション特性(NLPコーチング)" },
  {
    key: 20,
    groupId: 5,
    text: "コミュニケーション特性(NLPコーチング) 氏名なし",
  },
  {
    key: 21,
    groupId: 5,
    text: "コミュニケーション意識レポート",
  },
  { key: 22, groupId: 6, text: "個人結果報告書（EQ/IQ/BAJ）" },
  { key: 23, groupId: 6, text: "個人結果シート（パワハラ）" },
  { key: 24, groupId: 6, text: "個人結果シート（教育委員会）" },
  { key: 25, groupId: 6, text: "個人結果シート（AMPレポートS）" },
  { key: 26, groupId: 6, text: "個人結果シート（MHQレポート）" },
  { key: 27, groupId: 6, text: "個人結果シート（MHQレポー詳細版）" },
  { key: 28, groupId: 7, text: "BMS検査結果レポート（自己理解版）" },
  { key: 29, groupId: 7, text: "BMS検査結果レポート（面接版）" },
  { key: 30, groupId: 8, text: "ブランド感度力診断" },
  { key: 31, groupId: 9, text: "BCO" },
];
