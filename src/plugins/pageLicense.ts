import { ref } from "vue";
import UserApiService from "@/services/UserApiService";
export default function () {
  const lisenceView = ref();
  const getUserLisence = (tmpid: string | string[]) => {
    UserApiService.getUserLisence({
      user_id: tmpid,
    })
      .then((res: any) => {
        lisenceView.value = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return lisenceView;
  };
  const getUserLisenceCalc = (tmpid: string | string[]) => {
    const lisenceViewCalc = ref();
    UserApiService.getUserLisenceCalc({
      user_id: tmpid,
    })
      .then((res: any) => {
        lisenceViewCalc.value = res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    return lisenceView;
  };

  const getPartnerDetail = async (
    tmpid: string | string[] | number | number[],
    typeStr: string
  ) => {
    const partnerDetail = ref();
    const partner_id = ref();
    const tmp = {
      editId: tmpid,
      type: typeStr,
    };

    const result = UserApiService.getPartnerDetail(tmp);
    if (result !== false) {
      await result.then((res) => {
        partnerDetail.value = res.data;
        partner_id.value = res.data.id;
      });
    }
    return {
      partnerDetail: partnerDetail.value,
      partner_id: partner_id.value,
    };
  };
  return {
    getUserLisence,
    getUserLisenceCalc,
    getPartnerDetail,
  };
}
