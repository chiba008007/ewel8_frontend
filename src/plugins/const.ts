interface NumberCodeOrNullListType {
  [key: number]: string;
  null: string;
}
/** 画像 */

const uri = new URL(window.location.href);
const reg = /localhost/;
let tmp = "";
if (reg.test(uri.toString())) {
  tmp = "http://localhost:8000/";
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
