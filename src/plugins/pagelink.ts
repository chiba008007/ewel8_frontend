import { useRouter } from "vue-router";
import FileuploadApiService from "@/services/FileuploadApiService";

export const pagelink = (link: string, id: number, key: number) => {
  const tmp = {
    id: id,
  };
  FileuploadApiService.openFlag(tmp).then((rlt) => {
    window.open(link, "_blank");
    //  desserts.value[key].openflag = openStatus[1];
  });
};

export const deleteStatus = (id: number, key: number): Promise<number> => {
  const tmp = {
    id: id,
  };
  return FileuploadApiService.deleteStatus(tmp).then((rlt) => {
    return key;
  });
};
