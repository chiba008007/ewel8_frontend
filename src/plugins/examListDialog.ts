import { ref } from "vue";
import { useRoute } from "vue-router";
import TestApiService from "@/services/TestApiService";

const pfsDialogText = ref({
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
});

const dialogFlag = ref(false);

export const usePfsDialog = () => {
  const route = useRoute();

  const pfsDialog = async (e: number) => {
    const tmp = {
      exam_id: e,
      testparts_id: Number(route.params.testid),
    };

    const rlt = await TestApiService.getPFSTestDetail(tmp);

    pfsDialogText.value.text1 = rlt.data[0];
    pfsDialogText.value.text2 = rlt.data[1];
    pfsDialogText.value.text3 = rlt.data[2];
    pfsDialogText.value.text4 = rlt.data[3];
    pfsDialogText.value.text5 = rlt.data[4];

    dialogFlag.value = true;
  };

  const baj3Dialog = async (e: number) => {
    const tmp = {
      exam_id: e,
      testparts_id: Number(route.params.testid),
    };

    const rlt = await TestApiService.getBaj3TestDetail(tmp);

    pfsDialogText.value.text1 = rlt.data[0];
    pfsDialogText.value.text2 = rlt.data[1];
    pfsDialogText.value.text3 = rlt.data[2];
    pfsDialogText.value.text4 = rlt.data[3];
    pfsDialogText.value.text5 = rlt.data[4];

    dialogFlag.value = true;
  };

  return {
    pfsDialog,
    baj3Dialog,
    pfsDialogText,
    dialogFlag,
  };
};
