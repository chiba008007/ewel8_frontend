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

export const checkLoginID = (value: string) => {
  if (!value) {
    return "ログインIDは必須です。";
  }
  const pattern = /^[a-zA-Z0-9]{4,8}$/;
  if (value && !pattern.test(value)) {
    return "ログインIDは半角英数4文字以上8文字以下で入力してください。";
  }

  const tmp = UserApiService.checkLoginID(value);
  return tmp
    .then(function (rlt) {
      console.log(rlt.data === 1);
      if (rlt.data === 1) {
        return "ログインIDが重複しています。";
      }
      return true;
    })
    .catch(function () {
      return true;
    });
};
export const checkEmail = (value: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (value && !emailPattern.test(value)) {
    return "メールアドレスの形式に誤りがあります。";
  }
  return "";
};
export const checkPassword = (value: string, type = "") => {
  if (type == "edit" && !value) return "";
  if (!value) return "パスワードは必須です";
  const emailPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
  if (!emailPattern.test(value)) {
    return "半角8文字以上、半角15文字以内。大文字と小文字は区別さ英大文字・英小文字・数、字それぞれを最低1文字ずつ含めてください";
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
  )
    return false;
  const dateObj = new Date(parseInt(year), parseInt(month), parseInt(day)),
    dateObjStr =
      dateObj.getFullYear() +
      "" +
      zeroPadding(dateObj.getMonth()) +
      "" +
      zeroPadding(dateObj.getDate()),
    checkDateStr = year + "" + month + "" + day;
  if (dateObjStr == checkDateStr) return true;

  return false;
};
export const zeroPadding = (num: number | string) => {
  return num.toString().padStart(2, "0");
};
