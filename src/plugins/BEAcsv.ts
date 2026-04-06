import { ref } from "vue";
import UserApiService from "@/services/UserApiService";
import CsvApiService from "@/services/CsvApiService";
import { csvHead, csvHeader, genderArray, passArray } from "./const";

interface tmpType {
  id?: number;
  testid?: number;
}

export const BEAcsv = (params: tmpType) => {
  const cHeader: any = ref([]);

  const tmp = { user_id: params.id, test_id: params.testid };
  for (let i = 0; i <= 12; i++) {
    cHeader.value.push(csvHeader[i]);
  }
  for (let i = 1; i <= 106; i++) {
    cHeader.value.push("回答" + i);
  }

  CsvApiService.getBEA(tmp)
    .then(function (data: any) {
      const head = csvHead;
      const header = cHeader.value.join() + "\n";
      const testname = {
        testname: data.data.test.testname,
        partnername: data.data.test.partnername,
        customername: data.data.test.customername,
      };
      let csv = "";
      csv += "\ufeff" + head[0] + "," + testname["testname"] + "\n";
      csv += "\ufeff" + head[1] + "," + testname["partnername"] + "\n";
      csv += "\ufeff" + head[2] + "," + testname["customername"] + "\n";
      csv += "\ufeff" + header;
      let no = 1;
      data.data.list.forEach((value: any) => {
        const gender = genderArray.find(
          (element) => (element.value = value.exam.gender)
        );
        const pass = ref();
        if (Object.entries(passArray)[value.exam.passflag]) {
          pass.value = Object.entries(passArray)[value.exam.passflag][1];
        } else {
          pass.value = "";
        }
        csv += no + ",";
        csv += (value.exam.email ?? "") + ",";
        csv += (value.exam.name ?? "") + ",";
        csv += (value.exam.kana ?? "") + ",";
        csv += (value.pwd ?? "") + ",";
        csv += (value.age ?? "") + ",";
        csv += (gender?.label ? gender.label : "") + ",";
        csv += pass.value + ",";
        csv += (value.exam.memo1 ?? "") + ",";
        csv += (value.exam.memo2 ?? "") + ",";
        csv += (value.bea?.startdate ?? "") + ",";
        csv += (value.bea?.starttimes ?? "") + ",";
        csv += (value.bea?.timer ?? "") + ",";
        for (let i = 1; i <= 106; i++) {
          csv += (value.bea["q" + i] ?? "") + ",";
        }
        csv += "\n";
        no++;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Result.csv";
      link.click();
    })
    .catch((e) => {
      alert("csv error");
    });
};
