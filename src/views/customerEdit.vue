<script setup lang="ts">
import { ref } from "vue";
import { useStoreUser } from "../store/user";
import InfoAreaView from "../components/InfoAreaView.vue";
import { useRouter, useRoute } from "vue-router";
import addPartnerForm from "../components/addPartnerForm.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
import PrefApiService from "@/services/PrefApiService";
import addSwitchForm from "../components/addSwitchForm.vue";
import addImageForm from "../components/addImageForm.vue";
import addPrivacyForm from "../components/addPrivacyForm.vue";
import ComponentButton from "../components/ButtonView.vue";
import {
  checkLoginID,
  checkPasswordEdit,
  requiredValue,
  checkEmail,
  checkEmailRequired,
} from "../plugins/validate";
import UserApiService from "@/services/UserApiService";
import UserApiGetCustomerEdit from "@/services/UserApiGetCustomerEdit";
import { imagePath, displayStatus } from "@/plugins/const";
import ComponentAlert from "../components/AlertView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";

import ProgressView from "@/components/ProgressView.vue";
import TestMenu from "@/components/TestMenu.vue";

const router = useRouter();
const route = useRoute();
const user = useStoreUser();
const registButton = ref<boolean>(false);
const typeString = route.params.typeString;
const tmpid = route.params.id;
const editid = route.params.editid;

type ValidationResult = string | boolean;

// checkLoginID の戻り値（true | string | Promise<...>）を
// Vuetifyが期待する型（ValidationResult | PromiseLike<ValidationResult>）に正規化
const loginIdRule = (v: string): PromiseLike<ValidationResult> => {
  return Promise.resolve(
    checkLoginID(v, /* 重複チェックするなら true */ true, editid)
  ).then((res) => (res === true ? true : String(res)));
};

const loadingFlag = ref(true);
const inputData = ref({
  name: "",
  login_id: "",
  password: "",
  postCode: "",
  post1: "",
  post2: "",
  preftext: "",
  addressText: "",
  addressText2: "",
  tel: "",
  fax: "",
  displayTrendFlag: false,
  displayCsvFlag: false,
  displayPdfFlag: false,
  displayWeightFlag: false,
  displayExcelFlag: false,
  displayCustomFlag: false,
  displaySslFlag: true,
  logoImagePath: "",
  privacy: {
    checked: false,
    privacyText: user.privacyText,
  },
  customerDisplayFlag: false,
  tanto_name: "",
  tanto_address: "",
  tanto_busyo: "",
  tanto_tel1: "",
  tanto_tel2: "",
  tanto_name2: "",
  tanto_address2: "",
});
const prefs = ref();
const myimage_path = ref();

const pageBack = () => {
  if (typeString == "test") {
    router.push({ name: "testLists", params: { id: editid } });
  } else {
    router.push({ name: "customerList", params: { id: tmpid } });
  }
};
const onBlurButton = async () => {
  registButton.value = true; // まず無効化

  // 共通: true または "" を OK とみなす
  const isValid = (r: unknown) => r === true || r === "";
  console.log(inputData.value);
  // それぞれの結果を取得（非同期含む）
  const results = await Promise.all([
    checkLoginID(inputData.value.login_id, false), // true | string | Promise
    Promise.resolve(requiredValue(inputData.value.name, "顧客企業名")), // true | string
    Promise.resolve(requiredValue(inputData.value.tanto_name, "担当者氏名")),
    Promise.resolve(checkEmailRequired(inputData.value.tanto_address)),
  ]);

  // 全て OK ならボタンを有効化
  const allValid = results.every(isValid);
  registButton.value = !allValid; // true=無効, false=有効
};

const postBlur = (e: string, type: string) => {
  if (type === "post1") inputData.value.post1 = e;
  if (type === "post2") inputData.value.post2 = e;

  if (inputData.value.post1 && inputData.value.post2) {
    new YubinBangoCore(inputData.value.post1 + inputData.value.post2, function (
      addr: any
    ) {
      inputData.value.preftext = addr.region;
      inputData.value.addressText = addr.street;
      inputData.value.postCode =
        inputData.value.post1 + "-" + inputData.value.post2;
    });
  }
};

PrefApiService.getPrefData().then((res) => {
  prefs.value = res;
});

const onUpdate = async () => {
  const file = inputData.value.logoImagePath as unknown as File;
  if (!(file instanceof File)) {
    alert("画像ファイルが不正です");
    return;
  }
  const formData = new FormData();
  formData.append("photo", file, file.name);
  try {
    const res = (await UserApiService.onUpload(formData)) as { data: string };
    const uploadedUrl = imagePath + res.data;

    myimage_path.value = uploadedUrl;
    inputData.value.logoImagePath = uploadedUrl;
  } catch (e) {
    alert("editUserData ERROR: " + e);
  }
};
const successAlertFlag = ref(false);
const editData = () => {
  loadingFlag.value = true;
  let tmp = {
    id: editid,
    partner_id: tmpid,
    name: inputData.value.name,
    // email: inputData.value.login_id,
    password: inputData.value.password,
    company_name: inputData.value.name,
    login_id: inputData.value.login_id,
    post_code: inputData.value.post1 + "-" + inputData.value.post2,
    pref: inputData.value.preftext,
    address1: inputData.value.addressText,
    address2: inputData.value.addressText2,
    tel: inputData.value.tel,
    fax: inputData.value.fax,
    trendFlag: inputData.value.displayTrendFlag ? 1 : 0,
    csvFlag: inputData.value.displayCsvFlag ? 1 : 0,
    pdfFlag: inputData.value.displayPdfFlag ? 1 : 0,
    weightFlag: inputData.value.displayWeightFlag ? 1 : 0,
    excelFlag: inputData.value.displayExcelFlag ? 1 : 0,
    customFlag: inputData.value.customerDisplayFlag ? 1 : 0,
    sslFlag: inputData.value.displaySslFlag ? 1 : 0,
    logoImagePath: inputData.value.logoImagePath,
    privacy: inputData.value.privacy.checked ? 1 : 0,
    privacyText: inputData.value.privacy.privacyText,
    tanto_name: inputData.value.tanto_name,
    tanto_address: inputData.value.tanto_address,
    tanto_busyo: inputData.value.tanto_busyo,
    tanto_tel1: inputData.value.tanto_tel1,
    tanto_tel2: inputData.value.tanto_tel2,
    tanto_name2: inputData.value.tanto_name,
    tanto_address2: inputData.value.tanto_address2,
  };

  UserApiService.customerEdit(tmp)
    .then((res) => {
      loadingFlag.value = false;
      successAlertFlag.value = true;
    })
    .catch(function (e) {
      loadingFlag.value = false;
      alert(e);
    });
};

let editTmp = {
  type: "customer",
  partner_id: editid,
  edit_id: tmpid,
};
UserApiGetCustomerEdit.getCustomerEdit(editTmp)
  .then((rst) => {
    inputData.value.name = rst?.data.name;
    inputData.value.login_id = rst?.data.login_id;
    inputData.value.postCode = rst?.data.post_code;
    inputData.value.preftext = rst?.data.pref;
    inputData.value.addressText = rst?.data.address1;
    inputData.value.addressText2 = rst?.data.address2;
    inputData.value.tel = rst?.data.tel;
    inputData.value.fax = rst?.data.fax;
    inputData.value.displayTrendFlag = rst?.data.trendFlag;
    inputData.value.displayCsvFlag = rst?.data.csvFlag;
    inputData.value.displayPdfFlag = rst?.data.pdfFlag;
    inputData.value.displayWeightFlag = rst?.data.weightFlag;
    inputData.value.displayExcelFlag = rst?.data.excelFlag;
    inputData.value.displayCustomFlag = rst?.data.customFlag;
    inputData.value.displaySslFlag = rst?.data.sslFlag;
    myimage_path.value = rst?.data.logoImagePath;
    inputData.value.logoImagePath = rst?.data.logoImagePath;
    inputData.value.customerDisplayFlag = rst?.data.displayFlag;
    inputData.value.privacy.privacyText = rst?.data.privacyText;
    inputData.value.tanto_name = rst?.data.tanto_name;
    inputData.value.tanto_address = rst?.data.tanto_address;
    inputData.value.tanto_busyo = rst?.data.tanto_busyo;
    inputData.value.tanto_tel1 = rst?.data.tanto_tel1;
    inputData.value.tanto_tel2 = rst?.data.tanto_tel2;
    inputData.value.tanto_name2 = rst?.data.tanto_name2;
    inputData.value.tanto_address2 = rst?.data.tanto_address2;

    loadingFlag.value = false;
  })
  .catch((e) => {
    loadingFlag.value = false;
  });

const displayString = (type: boolean) => {
  return type ? displayStatus[1] : displayStatus[0];
};
const backColor = () => {
  return typeString == "test" ? "bg-lime" : "bg-primary";
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <InfoAreaView />
  <v-row justify="center">
    <TestMenu v-if="typeString === 'test'" />
    <CustomerMenu v-else />
  </v-row>
  <pankuzuMain
    class="pt-2"
    v-if="typeString === 'test'"
    :adminhref="{
      pageName: 'testList',
      href: 'testLists',
      params: { id: editid },
    }"
    :adminhref2="{ pageName: 'customerEdit', href: 'customerEdit' }"
  ></pankuzuMain>
  <pankuzuMain
    v-else
    class="pt-2"
    :partnerid="tmpid"
    :adminhref="{
      pageName: 'editPartner',
      href: 'editPartner',
      params: { id: 0 },
    }"
  ></pankuzuMain>
  <v-row class="ml-2">
    <v-col cols="12">
      <ComponentButton
        :text="typeString === 'test' ? '検査一覧' : '顧客企業一覧'"
        color="red"
        variant="outlined"
        @onClick="pageBack()"
      />
      <ComponentButton
        text="編集"
        color="primary"
        class="ml-2"
        @onClick="editData()"
        :disabled="registButton"
      />
      <ComponentAlert
        v-if="successAlertFlag"
        type="success"
        text="編集に成功しました"
      ></ComponentAlert>
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col cols="12" class="pa-2 ma-2 mt-0 pt-0">
      顧客企業情報を入力してください。
      <addPartnerForm
        :color="backColor()"
        title="顧客企業名"
        text="顧客企業名を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        type="name"
        :value="inputData.name"
        :requriredIcon="true"
        :rules="[(v) => requiredValue(v, '顧客企業名')]"
        @onBlur="(ev) => ((inputData.name = ev), onBlurButton())"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="ログインID"
        text="ログインIDを入力してください"
        class="w-50"
        :hideDetails="`auto`"
        type="login_id"
        :value="inputData.login_id"
        :requriredIcon="true"
        :maxlength="8"
        messages="4文字以上8文字以下で入力してください"
        @onBlur="(ev) => ((inputData.login_id = ev), onBlurButton())"
        :rules="[loginIdRule]"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="パスワード"
        text="パスワード未入力時は変更されません"
        class="w-50"
        :hideDetails="`auto`"
        type="password"
        :value="inputData.password"
        @onBlur="(e) => ((inputData.password = e), onBlurButton())"
        :rules="[(e) => checkPasswordEdit(e)]"
      ></addPartnerForm>
      <addPostCodeForm
        :color="backColor()"
        title="郵便番号"
        class="w-100"
        :hideDetails="true"
        :value="inputData.postCode"
        @onBlur="(e, type) => postBlur(e, type)"
      ></addPostCodeForm>
      <addPrefCodeForm
        :color="backColor()"
        title="都道府県"
        label="都道府県を選択"
        class="w-50"
        :hideDetails="true"
        :items="prefs"
        :value="inputData.preftext"
        type="pref"
        @onChange="(e) => (inputData.preftext = prefs.find((pref: { id: string; name: string }) => pref.id === e || pref.name === e).name)"
      ></addPrefCodeForm>
      <addPartnerForm
        :color="backColor()"
        title="住所"
        text="住所を入力してください"
        class="w-100"
        :hideDetails="true"
        :value="inputData.addressText ?? ``"
        @onBlur="(e) => (inputData.addressText = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="建物名"
        text="建物名を入力してください"
        class="w-100"
        :hideDetails="true"
        type="address2"
        :value="inputData.addressText2 ?? ``"
        @onBlur="(e) => (inputData.addressText2 = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="電話番号"
        text="電話番号を入力してください"
        class="w-100"
        :hideDetails="false"
        messages="例)03-0000-0000"
        type="tel"
        :value="inputData.tel"
        @onBlur="(e) => (inputData.tel = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="FAX番号"
        text="FAX番号を入力してください"
        class="w-100"
        :hideDetails="false"
        messages="例)03-0000-0000"
        type="fax"
        :value="inputData.fax"
        @onBlur="(e) => (inputData.fax = e)"
      ></addPartnerForm>
      <addSwitchForm
        :color="backColor()"
        title="受検者傾向確認ボタン表示"
        :label="displayString(inputData.displayTrendFlag)"
        density="compact"
        type="displayTrendFlag"
        :tooltipflag="true"
        tooltipMessage="受検者傾向確認ボタンの表示可否を選択します。"
        :model="inputData.displayTrendFlag ? true : false"
        @onClick="
          () =>
            (inputData.displayTrendFlag = inputData.displayTrendFlag
              ? false
              : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        :color="backColor()"
        title="CSVアップロードボタン表示"
        :label="displayString(inputData.displayCsvFlag)"
        density="compact"
        type="displayCsvFlag"
        :tooltipflag="true"
        tooltipMessage="CSVアップロードボタンの表示可否を選択します。"
        :model="inputData.displayCsvFlag ? true : false"
        @onClick="
          () =>
            (inputData.displayCsvFlag = inputData.displayCsvFlag ? false : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        :color="backColor()"
        title="PDFボタン表示"
        :label="displayString(inputData.displayPdfFlag)"
        density="compact"
        type="displayPdfFlag"
        :model="inputData.displayPdfFlag ? true : false"
        :tooltipflag="true"
        tooltipMessage="PDFボタンの表示可否を選択します。"
        @onClick="
          () =>
            (inputData.displayPdfFlag = inputData.displayPdfFlag ? false : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        :color="backColor()"
        title="PDF重みマスタ表示"
        :label="displayString(inputData.displayWeightFlag)"
        density="compact"
        type="displayWeightFlag"
        :model="inputData.displayWeightFlag ? true : false"
        :tooltipflag="true"
        tooltipMessage="PDF重みマスタの表示可否を選択します。"
        @onClick="
          () =>
            (inputData.displayWeightFlag = inputData.displayWeightFlag
              ? false
              : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        :color="backColor()"
        title="エクセル重みマスタ表示"
        :label="displayString(inputData.displayExcelFlag)"
        density="compact"
        type="displayExcelFlag"
        :model="inputData.displayExcelFlag ? true : false"
        :tooltipflag="true"
        tooltipMessage="エクセル重みマスタの表示可否を選択します。"
        @onClick="
          () =>
            (inputData.displayExcelFlag = inputData.displayExcelFlag
              ? false
              : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        :color="backColor()"
        title="顧客ファイルアップロード表示"
        :label="displayString(inputData.displayCustomFlag)"
        density="compact"
        type="displayCustomFlag"
        :model="inputData.displayCustomFlag ? true : false"
        :tooltipflag="true"
        tooltipMessage="顧客ファイルアップロードの表示可否を選択します。"
        @onClick="
          () =>
            (inputData.displayCustomFlag = inputData.displayCustomFlag
              ? false
              : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        :color="backColor()"
        title="SSL設定"
        :label="displayString(inputData.displaySslFlag)"
        density="compact"
        type="displaySslFlag"
        :model="inputData.displaySslFlag ? true : false"
        :tooltipflag="true"
        tooltipMessage="受検ページをhttps://で利用します。"
        @onClick="
          (e) =>
            (inputData.displaySslFlag = inputData.displaySslFlag ? false : true)
        "
      ></addSwitchForm>
      <addImageForm
        :color="backColor()"
        ref="preview"
        title="ロゴ画像"
        density="compact"
        label="アップロード画像選択"
        v-model="inputData.logoImagePath"
        :myimage_path="myimage_path"
        @onUpdate="(e) => ((inputData.logoImagePath = e as  File | File[] | any), onUpdate())"
      ></addImageForm>

      <addPrivacyForm
        :color="backColor()"
        variant="outlined"
        :hideDetails="`auto`"
        :height="15"
        :disabled="inputData.privacy.checked ? true : false"
        :value="inputData.privacy.checked ? 0 : 1"
        :textarea="inputData.privacy.privacyText"
        :privacyModel="inputData.privacy.checked"
        @onClick="
          (e) =>
            (inputData.privacy.checked = inputData.privacy.checked
              ? false
              : true)
        "
        @onBlur="(e) => (inputData.privacy.privacyText = e)"
      ></addPrivacyForm>
      <addSwitchForm
        :color="backColor()"
        title="顧客の表示/非表示"
        :label="displayString(inputData.customerDisplayFlag)"
        density="compact"
        type="customerDisplayFlag"
        :tooltipflag="true"
        tooltipMessage="顧客を非表示にする場合は、登録検査をすべて非表示にしてください。"
        :model="inputData.customerDisplayFlag ? true : false"
        @onClick="
          (e) =>
            (inputData.customerDisplayFlag = inputData.customerDisplayFlag
              ? false
              : true)
        "
      ></addSwitchForm>
    </v-col>
  </v-row>

  <v-row no-gutters class="mt-5">
    <v-col cols="12" class="pa-2 ma-2">
      <addPartnerForm
        :color="backColor()"
        title="担当者氏名"
        text="担当者氏名を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :requriredIcon="true"
        :rules="[(v) => requiredValue(v, '担当者氏名')]"
        :value="inputData.tanto_name"
        @onBlur="(e) => ((inputData.tanto_name = e), onBlurButton())"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="担当者アドレス"
        text="担当者アドレスを入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :value="inputData.tanto_address"
        :requriredIcon="true"
        :rules="[(v) => checkEmailRequired(v)]"
        @onBlur="(e) => ((inputData.tanto_address = e), onBlurButton())"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="部署名"
        text="部署名を入力してください"
        class="w-50"
        :hideDetails="`auto`"
        :value="inputData.tanto_busyo"
        @onBlur="(e) => (inputData.tanto_busyo = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="連絡先1"
        text="連絡先1を入力してください"
        class="w-50"
        :hideDetails="`auto`"
        :value="inputData.tanto_tel1"
        messages="例)03-0000-0000"
        @onBlur="(e) => (inputData.tanto_tel1 = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="連絡先2"
        text="連絡先2を入力してください"
        class="w-50"
        :hideDetails="`auto`"
        :value="inputData.tanto_tel2"
        messages="例)03-0000-0000"
        @onBlur="(e) => (inputData.tanto_tel2 = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="担当者氏名2"
        text="担当者氏名2を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :value="inputData.tanto_name2"
        @onBlur="(e) => (inputData.tanto_name2 = e)"
      ></addPartnerForm>
      <addPartnerForm
        :color="backColor()"
        title="担当者アドレス2"
        text="担当者アドレス2を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :value="inputData.tanto_address2"
        @onBlur="(e) => (inputData.tanto_address2 = e)"
      ></addPartnerForm>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
