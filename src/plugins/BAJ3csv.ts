import { ref } from "vue";
import UserApiService from "@/services/UserApiService";
import CsvApiService from "@/services/CsvApiService";
import { csvHead, csvHeader, genderArray, passArray } from "./const";

interface tmpType {
  id?: number;
  testid?: number;
}

export const BAJ3csv = (params: tmpType) => {
  const cHeader: any = ref([]);

  const tmp = { user_id: params.id, test_id: params.testid };
  for (let i = 0; i <= 12; i++) {
    cHeader.value.push(csvHeader[i]);
  }
  for (let i = 1; i <= 36; i++) {
    cHeader.value.push("回答" + i);
  }
  const dev = ref({
    dev1: "",
    dev2: "",
    dev3: "",
    dev4: "",
    dev5: "",
    dev6: "",
    dev7: "",
    dev8: "",
    dev9: "",
    dev10: "",
    dev11: "",
  });
  UserApiService.getUserElement(tmp).then(function (rlt: any) {
    for (let i = 1; i <= 11; i++) {
      cHeader.value.push(rlt.data["element" + i]);
    }
    dev.value["dev1"] = rlt.data["element1"];
    dev.value["dev2"] = rlt.data["element2"];
    dev.value["dev3"] = rlt.data["element3"];
    dev.value["dev4"] = rlt.data["element4"];
    dev.value["dev5"] = rlt.data["element5"];
    dev.value["dev6"] = rlt.data["element6"];
    dev.value["dev7"] = rlt.data["element7"];
    dev.value["dev8"] = rlt.data["element8"];
    dev.value["dev9"] = rlt.data["element9"];
    dev.value["dev10"] = rlt.data["element10"];
    dev.value["dev11"] = rlt.data["element11"];

    const head = csvHead;
    const header =
      cHeader.value.join() + "," + csvHead[3] + "," + csvHead[4] + "\n";

    CsvApiService.getBAJ3(tmp)
      .then(function (data: any) {
        const items = [] as any;
        let no = 1;
        const pass = ref();
        const testname = data.data.test;
        data.data.list.forEach((value: any) => {
          const k = value.baj3.max;
          let maxes = "";
          if (k) {
            Object.entries(dev.value).map((elem, key) => {
              if (elem[0] == k) maxes = elem[1];
            });
          }
          const gender = genderArray.find(
            (element) => (element.value = value.exam.gender)
          );
          if (Object.entries(passArray)[value.exam.pass]) {
            pass.value = Object.entries(passArray)[value.exam.pass][1];
          } else {
            pass.value = "";
          }
          items.push({
            number: no,
            email: value.exam.email,
            name: value.exam.name ? value.exam.name : "",
            kana: value.exam.kana ? value.exam.kana : "",
            password: value.pwd,
            age: value.age,
            gender: gender?.label ? gender.label : "",
            pass: pass.value,
            memo1: value.exam.memo1 ? value.exam.memo1 : "",
            memo2: value.exam.memo2 ? value.exam.memo2 : "",
            startdate: value.baj3.startdate ? value.baj3.startdate : "",
            starttimes: value.baj3.starttimes ? value.baj3.starttimes : "",
            timer: value.baj3.timer ? value.baj3.timer : "",
            q1: value.baj3.q1 ? value.baj3.q1 : "",
            q2: value.baj3.q2 ? value.baj3.q2 : "",
            q3: value.baj3.q3 ? value.baj3.q3 : "",
            q4: value.baj3.q4 ? value.baj3.q4 : "",
            q5: value.baj3.q5 ? value.baj3.q5 : "",
            q6: value.baj3.q6 ? value.baj3.q6 : "",
            q7: value.baj3.q7 ? value.baj3.q7 : "",
            q8: value.baj3.q8 ? value.baj3.q8 : "",
            q9: value.baj3.q9 ? value.baj3.q9 : "",
            q10: value.baj3.q10 ? value.baj3.q10 : "",
            q11: value.baj3.q11 ? value.baj3.q11 : "",
            q12: value.baj3.q12 ? value.baj3.q12 : "",
            q13: value.baj3.q13 ? value.baj3.q13 : "",
            q14: value.baj3.q14 ? value.baj3.q14 : "",
            q15: value.baj3.q15 ? value.baj3.q15 : "",
            q16: value.baj3.q16 ? value.baj3.q16 : "",
            q17: value.baj3.q17 ? value.baj3.q17 : "",
            q18: value.baj3.q18 ? value.baj3.q18 : "",
            q19: value.baj3.q19 ? value.baj3.q19 : "",
            q20: value.baj3.q20 ? value.baj3.q20 : "",
            q21: value.baj3.q21 ? value.baj3.q21 : "",
            q22: value.baj3.q22 ? value.baj3.q22 : "",
            q23: value.baj3.q23 ? value.baj3.q23 : "",
            q24: value.baj3.q24 ? value.baj3.q24 : "",
            q25: value.baj3.q25 ? value.baj3.q25 : "",
            q26: value.baj3.q26 ? value.baj3.q26 : "",
            q27: value.baj3.q27 ? value.baj3.q27 : "",
            q28: value.baj3.q28 ? value.baj3.q28 : "",
            q29: value.baj3.q29 ? value.baj3.q29 : "",
            q30: value.baj3.q30 ? value.baj3.q30 : "",
            q31: value.baj3.q31 ? value.baj3.q31 : "",
            q32: value.baj3.q32 ? value.baj3.q32 : "",
            q33: value.baj3.q33 ? value.baj3.q33 : "",
            q34: value.baj3.q34 ? value.baj3.q34 : "",
            q35: value.baj3.q35 ? value.baj3.q35 : "",
            q36: value.baj3.q36 ? value.baj3.q36 : "",
            dev1: value.baj3.dev1 ? value.baj3.dev1 : "",
            dev2: value.baj3.dev2 ? value.baj3.dev2 : "",
            dev3: value.baj3.dev3 ? value.baj3.dev3 : "",
            dev4: value.baj3.dev4 ? value.baj3.dev4 : "",
            dev5: value.baj3.dev5 ? value.baj3.dev5 : "",
            dev6: value.baj3.dev6 ? value.baj3.dev6 : "",
            dev7: value.baj3.dev7 ? value.baj3.dev7 : "",
            dev8: value.baj3.dev8 ? value.baj3.dev8 : "",
            dev9: value.baj3.dev9 ? value.baj3.dev9 : "",
            dev10: value.baj3.dev10 ? value.baj3.dev10 : "",
            dev11: value.baj3.dev11 ? value.baj3.dev11 : "",
            dev12: value.baj3.dev12 ? value.baj3.dev12 : "",
            max: value.baj3.max ? maxes : "",
          });
          no++;
        });

        downloadCSV(head, header, items, testname);
      })
      .catch((e) => {
        alert("csv error");
      });
  });
};

const downloadCSV = (head: any, header: string, items: any, testname: any) => {
  let csv = "";
  csv += "\ufeff" + head[0] + "," + testname["testname"] + "\n";
  csv += "\ufeff" + head[1] + "," + testname["partnername"] + "\n";
  csv += "\ufeff" + head[2] + "," + testname["customername"] + "\n";
  csv += "\ufeff" + header;
  items.forEach((el: any) => {
    const line =
      el["number"] +
      "," +
      el["email"] +
      "," +
      el["name"] +
      "," +
      el["kana"] +
      "," +
      el["password"] +
      "," +
      el["age"] +
      "," +
      el["gender"] +
      "," +
      el["pass"] +
      "," +
      el["memo1"] +
      "," +
      el["memo2"] +
      "," +
      el["startdate"] +
      "," +
      el["starttimes"] +
      "," +
      el["timer"] +
      "," +
      el["q1"] +
      "," +
      el["q2"] +
      "," +
      el["q3"] +
      "," +
      el["q4"] +
      "," +
      el["q5"] +
      "," +
      el["q6"] +
      "," +
      el["q7"] +
      "," +
      el["q8"] +
      "," +
      el["q9"] +
      "," +
      el["q10"] +
      "," +
      el["q11"] +
      "," +
      el["q12"] +
      "," +
      el["q13"] +
      "," +
      el["q14"] +
      "," +
      el["q15"] +
      "," +
      el["q16"] +
      "," +
      el["q17"] +
      "," +
      el["q18"] +
      "," +
      el["q19"] +
      "," +
      el["q20"] +
      "," +
      el["q21"] +
      "," +
      el["q22"] +
      "," +
      el["q23"] +
      "," +
      el["q24"] +
      "," +
      el["q25"] +
      "," +
      el["q26"] +
      "," +
      el["q27"] +
      "," +
      el["q28"] +
      "," +
      el["q29"] +
      "," +
      el["q30"] +
      "," +
      el["q31"] +
      "," +
      el["q32"] +
      "," +
      el["q33"] +
      "," +
      el["q34"] +
      "," +
      el["q35"] +
      "," +
      el["q36"] +
      "," +
      el["dev1"] +
      "," +
      el["dev2"] +
      "," +
      el["dev3"] +
      "," +
      el["dev4"] +
      "," +
      el["dev5"] +
      "," +
      el["dev6"] +
      "," +
      el["dev7"] +
      "," +
      el["dev8"] +
      "," +
      el["dev9"] +
      "," +
      el["dev10"] +
      "," +
      el["dev11"] +
      "," +
      el["dev12"] +
      "," +
      el["max"] +
      "\n";
    csv += line;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "Result.csv";
  link.click();
};
