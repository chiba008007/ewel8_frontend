import { ref } from "vue";
import { d_Path } from "@/plugins/const";
export const pdfDownload = (id: number, code: string, birth: string) => {
  const path =
    d_Path +
    "/pdf/" +
    id +
    "/code/" +
    code +
    "/birth/" +
    birth.replace(/\//g, "-");
  location.href = path;
};
