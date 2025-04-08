import { ref } from "vue";
import { zeroPadding } from "./validate";

export const getTodayDateTime = (type: string) => {
  const today = new Date();

  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  let year = 0;
  let month = "";
  let date = "";
  if (type == "start") {
    year = yesterday.getFullYear();
    month = zeroPadding(yesterday.getMonth() + 1);
    date = zeroPadding(yesterday.getDate());
  } else {
    year = today.getFullYear();
    month = zeroPadding(today.getMonth() + 1);
    date = zeroPadding(today.getDate());
  }

  const time = ref("0");
  const time1 = ref("0");
  if (type == "end") {
    time.value = "23";
    time1.value = "59";
  }
  return year + "-" + month + "-" + date + " " + time.value + ":" + time1.value;
};
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = zeroPadding(today.getMonth() + 1);
  const date = zeroPadding(today.getDate());
  return year + "-" + month + "-" + date;
};
