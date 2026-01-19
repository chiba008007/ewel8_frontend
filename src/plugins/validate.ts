import UserApiService from "@/services/UserApiService";

export const requiredValue = (value: string, item: string) => {
  if (!value) {
    return item + "は必須です。";
  }
  return true;
};

type ValidationResult = string | boolean;

/**
 * Vuetify rules 用のラッパー
 * - 空欄は許可（allowEmpty=true）
 * - それ以外は numberValue に委譲
 */
export const makeNumberRule = (
  label: string,
  { max = 0, editid = 0, done = 0, allowEmpty = true } = {}
) => {
  return (v: string | number): ValidationResult => {
    const s = (v ?? "").toString().trim();

    // 空欄許可
    if (allowEmpty && s === "") return true;

    // 数値以外は弾く（全角や文字列含む）
    const n = Number(s);
    if (!Number.isFinite(n)) return `${label}は数値を入力してください。`;

    // 既存の numberValue をそのまま利用（true | string）
    return numberValue(n, label, max, editid, done);
  };
};

export const numberValue = (
  value: number,
  item: string,
  max = 0,
  editid = 0,
  done = 0
) => {
  if (isNaN(value) || value.toString().length == 0) {
    return item + "は数値を入力してください。";
  }
  if (max > 0 && value > max) {
    return "最大登録数(" + max + ")を超えています。";
  }
  if (editid) {
    if (done > value) {
      return "受検者数が少なすぎます。";
    }
  }
  return true;
};

export const checkLoginIDSync = (value: string): true | string => {
  if (!value) {
    return "ログインIDは必須です。";
  }

  const pattern = /^[a-zA-Z0-9]{4,8}$/;
  if (!pattern.test(value)) {
    return "ログインIDは半角英数4文字以上8文字以下で入力してください。";
  }

  return true;
};

export const checkLoginID = async (
  value: string,
  flag = true,
  editid: string | string[] = "0"
): Promise<true | string> => {
  if (!value) {
    return "ログインIDは必須です。";
  }

  const pattern = /^[a-zA-Z0-9]{4,8}$/;
  if (!pattern.test(value)) {
    return "ログインIDは半角英数4文字以上8文字以下で入力してください。";
  }

  if (!flag) {
    return true;
  }

  try {
    const rlt = await UserApiService.checkLoginID(value, editid as string);
    if (rlt.data === "success") {
      return "ログインIDが重複しています。";
    }
    return true;
  } catch {
    return true;
  }
};

export const checkEmail = (value: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value && !emailPattern.test(value)) {
    return "メールアドレスの形式に誤りがあります。";
  }
  return true;
};
export const checkEmailRequired = (value: string) => {
  if (!value) return "メールアドレスは必須です。";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value && !emailPattern.test(value)) {
    return "メールアドレスの形式に誤りがあります。";
  }
  return true;
};
export const checkPassword = (value: string, type = "", tmpid: any = "") => {
  if (tmpid && !value) return true;
  if (type == "edit" && !value) return "";
  if (!value) return "パスワードは必須です";
  const emailPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  if (!emailPattern.test(value)) {
    return "半角8文字以上、半角15文字以内。大文字と小文字は区別さ英大文字・英小文字・数字それぞれを最低1文字ずつ含めてください";
  }
  return true;
};
export const checkPasswordEdit = (value: string) => {
  if (value) {
    const emailPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!emailPattern.test(value)) {
      return "半角8文字以上、半角15文字以内。大文字と小文字は区別さ英大文字・英小文字・数字それぞれを最低1文字ずつ含めてください";
    }
  }
  return true;
};

export const removeTabKey = (e: any) => {
  if (e.key === "Tab") {
    e.preventDefault();
    return false;
  }
};

export const checkDate = (year: string, month: string, day: string) => {
  if (!year || !month || !day) return false;
  if (
    !String(year).match(/^[0-9]{4}$/) ||
    !String(month).match(/^[0-9]{1,2}$/) ||
    !String(day).match(/^[0-9]{1,2}$/)
  ) {
    return false;
  }
  return checkDated(parseInt(year), parseInt(month), parseInt(day));
};
export const zeroPadding = (num: number | string) => {
  return num.toString().padStart(2, "0");
};
export const zeroZapress = (num: number | string) => {
  return Number(num);
};
export const checkBirth = (value: string) => {
  if (!value) return "生年月日を入力してください。";

  if (!value.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
    return "生年月日の形式に誤りがあります。";
  }
  const y = parseInt(value.split("/")[0]);
  const m = parseInt(value.split("/")[1]) - 1;
  const d = parseInt(value.split("/")[2]);
  const date = new Date(y, m, d);
  if (date.getFullYear() != y || date.getMonth() != m || date.getDate() != d) {
    return "生年月日の形式に誤りがあります。";
  }
  return "";
};

export const checkDated = (year: number, month: number, day: number) => {
  if (!year || !month || !day) return false;
  if (
    !String(year).match(/^[0-9]{4}$/) ||
    !String(month).match(/^[0-9]{1,2}$/) ||
    !String(day).match(/^[0-9]{1,2}$/)
  )
    return false;

  const dateObj = new Date(year, month - 1, day),
    dateObjStr =
      dateObj.getFullYear() +
      "" +
      (dateObj.getMonth() + 1) +
      "" +
      dateObj.getDate(),
    checkDateStr = year + "" + month + "" + day;

  if (dateObjStr === checkDateStr) return true;

  return false;
};
