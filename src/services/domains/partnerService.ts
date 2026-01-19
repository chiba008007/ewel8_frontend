import UserApiService from "@/services/UserApiService";
import { createPartnerForm } from "@/types/partner";

type PartnerForm = ReturnType<typeof createPartnerForm>;

const buildPayload = (form: PartnerForm) => {
  return {
    type: "partner",

    // 基本情報
    name: form.name,
    login_id: form.login_id,
    password: form.password,

    post_code: `${form.post1}-${form.post2}`,
    pref: form.pref,
    address1: form.address1,
    address2: form.address2,
    tel: form.tel,
    fax: form.fax,

    requestFlag: form.requestFlag,
    two_factor_enabled: form.two_factor_enabled,

    system_name: form.system_name,

    // 担当者
    person: form.person,
    person_address: form.person_address,
    person2: form.person2,
    person_address2: form.person_address2,
    person_tel: form.person_tel,

    // ライセンス
    licensesKey: form.licensesKey,
    licensesBody: form.licensesBody,

    // element1〜14
    ...Object.fromEntries(
      form.elements.map((value, index) => [`element${index + 1}`, value ?? ""])
    ),
  };
};

export const savePartner = async (
  form: PartnerForm,
  partnerId?: string | number
) => {
  const payload = buildPayload(form);
  if (partnerId) {
    return UserApiService.editPartnerData({
      ...payload,
      id: partnerId,
    });
  }

  return UserApiService.setPartner(payload);
};

export const fetchPartner = async (id: string) => {
  // API呼び出し
  const result = UserApiService.getUserData({ id: id });
  return result;
};
