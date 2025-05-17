import CsvUploadApiService from "@/services/CsvUploadApiService";
interface tmpType {
  user_id?: number | string | string[] | number[];
  test_id?: number | string | string[] | number[];
}
export const updateCsvExam = (formDataTemp: FormData): Promise<any> => {
  return CsvUploadApiService.updateCsvExam(formDataTemp);
};
export const csvFormat = (params: tmpType) => {
  CsvUploadApiService.csvUploadFile(params).then((res) => {
    let csv = "";
    csv += "\ufeff" + "番号,ID,氏名,ふりがな,生年月日,メモ1,メモ2" + "\n";
    let no = 1;
    res.data.map(
      (value: {
        email: string;
        name: string;
        kana: string;
        birth: string;
        memo1: string;
        memo2: string;
      }) => {
        csv += "\ufeff" + no + ",";
        csv += "\ufeff" + value.email + ",";
        csv += "\ufeff" + value.name + ",";
        csv += "\ufeff" + value.kana + ",";
        csv += "\ufeff" + value.birth + ",";
        csv += "\ufeff" + value.memo1 + ",";
        csv += "\ufeff" + value.memo2 + ",";
        csv += "\n";
        no++;
      }
    );
    downloadCSV(csv);
  });
};
const downloadCSV = (csv: string) => {
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "Result.csv";
  link.click();
};
export const getCsvUploadList = (tmp: object) => {
  return CsvUploadApiService.getCsvUpload(tmp);
};
