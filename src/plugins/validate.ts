import UserApiService from "@/services/UserApiService";

export const requiredValue = (value: string, item: string) => {
  if (!value) {
    return item + "は必須です。";
  }
  return "";
};
export const numberValue = (value: number, item: string) => {
  if (isNaN(value) || value.toString().length == 0) {
    return item + "は数値を入力してください。";
  }
  return "";
};

export const checkLoginID = (value: string, flag = true) => {
  if (!value) {
    return "ログインIDは必須です。";
  }
  const pattern = /^[a-zA-Z0-9]{4,8}$/;
  if (value && !pattern.test(value)) {
    return "ログインIDは半角英数4文字以上8文字以下で入力してください。";
  }
  if (flag) {
    const tmp = UserApiService.checkLoginID(value);
    return tmp
      .then(function (rlt) {
        if (rlt.data === "success") {
          return "ログインIDが重複しています。";
        }
        return true;
      })
      .catch(function () {
        return true;
      });
  } else {
    return true;
  }
};
export const checkEmail = (value: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value && !emailPattern.test(value)) {
    return "メールアドレスの形式に誤りがあります。";
  }
  return "";
};
export const checkEmailRequired = (value: string) => {
  if (!value) return "メールアドレスは必須です。";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value && !emailPattern.test(value)) {
    return "メールアドレスの形式に誤りがあります。";
  }
  return "";
};
export const checkPassword = (value: string, type = "", tmpid: any = "") => {
  if (tmpid && !value) return "";
  if (type == "edit" && !value) return "";
  if (!value) return "パスワードは必須です";
  const emailPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  if (!emailPattern.test(value)) {
    return "半角8文字以上、半角15文字以内。大文字と小文字は区別さ英大文字・英小文字・数、字それぞれを最低1文字ずつ含めてください";
  }
  return "";
};
export const checkPasswordEdit = (value: string) => {
  if (value) {
    const emailPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    if (!emailPattern.test(value)) {
      return "半角8文字以上、半角15文字以内。大文字と小文字は区別さ英大文字・英小文字・数、字それぞれを最低1文字ずつ含めてください";
    }
  }
  return "";
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

  /*
  const dateObj = new Date(parseInt(year), parseInt(month), parseInt(day));
  const dateObjStr =
      dateObj.getFullYear() +
      "" +
      zeroPadding(dateObj.getMonth()) +
      "" +
      zeroPadding(dateObj.getDate()),
    checkDateStr = year + "" + month + "" + day;
  if (dateObjStr == checkDateStr) return true;
*/
  return true;
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
