import { ref } from "vue";
import { zeroPadding } from "./validate";

export const getTodayDateTime = (type: string) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = zeroPadding(today.getMonth() + 1);
  const date = zeroPadding(today.getDate());
  const time = ref("00");
  const time1 = ref("00");
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
