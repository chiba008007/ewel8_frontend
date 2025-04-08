import { ref } from "vue";
import { checkDate } from "@/plugins/validate";

export default function () {
  const dateErrorMessage = ref("");
  const onDateTime = (e: string, endtime: string) => {
    const tmpDate = e.split(" ")[0].split("-");
    const tmpTime = e.split(" ")[1].split(":");
    const y = tmpDate[0];
    const m = tmpDate[1];
    const d = tmpDate[2];
    const h = tmpTime[0];
    const mn = tmpTime[1];

    dateErrorMessage.value = "";
    const ymd = y + "-" + m + "-" + d + " " + h + ":" + mn;
    if (!checkDate(y, m, d)) {
      dateErrorMessage.value = "正しい日付を入力してください。";
    } else if (endtime < ymd) {
      dateErrorMessage.value = "終了日付に誤りがあります。";
    }
    return { ymd: ymd, dateErrorMessage: dateErrorMessage.value };
  };

  const onDateEndTime = (e: string, startdaytime: string) => {
    const tmpDate = e.split(" ")[0].split("-");
    const tmpTime = e.split(" ")[1].split(":");
    const y = tmpDate[0];
    const m = tmpDate[1];
    const d = tmpDate[2];
    const h = tmpTime[0];
    const mn = tmpTime[1];
    dateErrorMessage.value = "";
    const ymd = y + "-" + m + "-" + d + " " + h + ":" + mn;
    if (!checkDate(y, m, d)) {
      dateErrorMessage.value = "正しい日付を入力してください。";
    } else if (startdaytime > ymd) {
      dateErrorMessage.value = "開始日付に誤りがあります。";
    }
    return { ymd: ymd, dateErrorMessage: dateErrorMessage.value };
  };
  return {
    onDateTime,
    onDateEndTime,
  };
}
