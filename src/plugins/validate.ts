export const requiredValue = (value: string, item: string) => {
  if (!value) {
    return item + "は必須です。";
  }
  return "";
};

export const checkEmail = (value: string) => {
  if (!value) return "メールアドレスは必須です";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(value)) {
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

export const checkLoginID = (value: string) => {
  if (!value) return "ログインIDは必須です";
  if (value.length < 4 || value.length > 8)
    return "ログインIDは4文字以上8文字以下で設定してください。";
  return null;
};
