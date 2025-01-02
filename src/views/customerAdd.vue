<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStoreUser } from "../store/user";
import CustomerMenu from "../components/CustomerMenu.vue";
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
  checkPassword,
  requiredValue,
  checkEmail,
} from "../plugins/validate";
import UserApiService from "@/services/UserApiService";
import { imagePath, customer } from "@/plugins/const";
import ComponentAlert from "../components/AlertView.vue";

const router = useRouter();
const route = useRoute();
const user = useStoreUser();
const registButton = ref<boolean>(true);

const tmpid = route.params.id;

interface typed {
  type: string;
}
let type = user.userdata as typed;
const pankuzu = ref();
if (type.type == "partner") {
  pankuzu.value = [
    {
      title: user.home,
      href: router.resolve({ name: "customerList" }).href,
    },
    { title: user.customerRegist },
  ];
} else {
  pankuzu.value = [
    { title: user.home, href: router.resolve({ name: "List" }).href },
    {
      title: user.customerInfoList,
      href: router.resolve({ name: "customerList" }).href,
    },
    { title: user.customerRegist },
  ];
}
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

const onBlurButton = async () => {
  registButton.value = true;
  if (
    !requiredValue(inputData.value.name, "顧客企業名") &&
    ((await checkLoginID(inputData.value.login_id, false)) as
      | boolean
      | string) == true &&
    !checkPassword(inputData.value.password) &&
    !requiredValue(inputData.value.tanto_name, "担当者氏名") &&
    !checkEmail(inputData.value.tanto_address)
  ) {
    registButton.value = false;
  }
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

const onUpdate = (e: any) => {
  let blob: Blob;
  let formData = new FormData();
  let imageUrl: string;

  blob = new Blob([e[0]], { type: "image/jpeg" });
  imageUrl = window.URL.createObjectURL(blob);
  formData.append("photo", blob, "image.jpg");
  myimage_path.value = imageUrl;

  UserApiService.onUpload(formData)
    .then((res: any) => {
      inputData.value.logoImagePath = imagePath + res.data;
    })
    .catch((e) => {
      alert("editUserData ERROR" + e);
    });
};
const successAlertFlag = ref(false);
const addRegist = () => {
  console.log(inputData.value);
  let userdata = user.userdata as any;
  let tmp = {
    type: customer,
    admin_id: userdata.id,
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
    displayFlag: 1,
    tanto_name: inputData.value.tanto_name,
    tanto_address: inputData.value.tanto_address,
    tanto_busyo: inputData.value.tanto_busyo,
    tanto_tel1: inputData.value.tanto_tel1,
    tanto_tel2: inputData.value.tanto_tel2,
    tanto_name2: inputData.value.tanto_name,
    tanto_address2: inputData.value.tanto_address2,
  };

  UserApiService.setCustomerAdd(tmp)
    .then((res) => {
      console.log("success");
      successAlertFlag.value = true;
    })
    .catch(function (e) {
      alert(e);
    });
};
</script>
<template>
  <InfoAreaView />
  <v-row justify="center">
    <CustomerMenu />
  </v-row>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>

  <v-row no-gutters>
    <v-col cols="12" class="pa-2 ma-2">
      <ComponentButton
        text="登録"
        color="primary"
        class="my-3"
        @onClick="addRegist()"
        :disabled="registButton"
      />
      <ComponentAlert
        v-if="successAlertFlag"
        type="success"
        text="登録に成功しました"
      ></ComponentAlert>
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col cols="12" class="pa-2 ma-2 mt-0 pt-0">
      顧客企業情報を入力してください。
      <addPartnerForm
        title="顧客企業名"
        text="顧客企業名を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        type="name"
        :value="inputData.name"
        :requriredIcon="true"
        :rules="requiredValue(inputData.name, '顧客企業名')"
        @onBlur="(ev) => ((inputData.name = ev), onBlurButton())"
      ></addPartnerForm>
      <addPartnerForm
        title="ログインID"
        text="ログインIDを入力してください"
        class="w-50"
        :hideDetails="`auto`"
        type="login_id"
        :value="inputData.login_id"
        :requriredIcon="true"
        messages="4文字以上8文字以下で入力してください"
        @onBlur="(ev) => ((inputData.login_id = ev), onBlurButton())"
        :rules="checkLoginID(inputData.login_id) as any"
      ></addPartnerForm>
      <addPartnerForm
        title="パスワード"
        text="パスワードを入力してください"
        class="w-50"
        :hideDetails="`auto`"
        type="password"
        :value="inputData.password"
        :requriredIcon="true"
        :rules="checkPassword(inputData.password)"
        @onBlur="(e) => ((inputData.password = e), onBlurButton())"
      ></addPartnerForm>
      <addPostCodeForm
        title="郵便番号"
        class="w-100"
        :hideDetails="true"
        :value="inputData.postCode"
        @onBlur="(e, type) => postBlur(e, type)"
      ></addPostCodeForm>
      <addPrefCodeForm
        title="都道府県"
        label="都道府県を選択"
        class="w-50"
        :hideDetails="true"
        :items="prefs"
        :value="inputData.preftext ?? ``"
        type="pref"
        @onBlur="(e) => (inputData.preftext = e)"
      ></addPrefCodeForm>
      <addPartnerForm
        title="住所"
        text="住所を入力してください"
        class="w-100"
        :hideDetails="true"
        :value="inputData.addressText ?? ``"
        @onBlur="(e) => (inputData.addressText = e)"
      ></addPartnerForm>
      <addPartnerForm
        title="建物名"
        text="建物名を入力してください"
        class="w-100"
        :hideDetails="true"
        type="address2"
        :value="inputData.addressText2 ?? ``"
        @onBlur="(e) => (inputData.addressText2 = e)"
      ></addPartnerForm>
      <addPartnerForm
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
        title="受検者傾向確認ボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayTrendFlag"
        :tooltipflag="true"
        tooltipMessage="受検者傾向確認ボタンの表示可否を選択します。"
        :model="inputData.displayTrendFlag"
        @onClick="
          () =>
            (inputData.displayTrendFlag = inputData.displayTrendFlag
              ? false
              : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        title="CSVアップロードボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayCsvFlag"
        :tooltipflag="true"
        tooltipMessage="CSVアップロードボタンの表示可否を選択します。"
        :model="inputData.displayCsvFlag"
        @onClick="
          () =>
            (inputData.displayCsvFlag = inputData.displayCsvFlag ? false : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        title="PDFボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayPdfFlag"
        :model="inputData.displayPdfFlag"
        :tooltipflag="true"
        tooltipMessage="PDFボタンの表示可否を選択します。"
        @onClick="
          () =>
            (inputData.displayPdfFlag = inputData.displayPdfFlag ? false : true)
        "
      ></addSwitchForm>
      <addSwitchForm
        title="PDF重みマスタ表示"
        :label="`表示する`"
        density="compact"
        type="displayWeightFlag"
        :model="inputData.displayWeightFlag"
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
        title="エクセル重みマスタ表示"
        :label="`表示する`"
        density="compact"
        type="displayExcelFlag"
        :model="inputData.displayExcelFlag"
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
        title="顧客ファイルアップロード表示"
        :label="`表示する`"
        density="compact"
        type="displayCustomFlag"
        :model="inputData.displayCustomFlag"
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
        title="SSL設定"
        :label="`設定する`"
        density="compact"
        type="displaySslFlag"
        :model="inputData.displaySslFlag"
        :tooltipflag="true"
        tooltipMessage="受検ページをhttps://で利用します。"
        @onClick="
          (e) =>
            (inputData.displaySslFlag = inputData.displaySslFlag ? false : true)
        "
      ></addSwitchForm>
      <addImageForm
        title="ロゴ画像"
        density="compact"
        label="アップロード画像選択"
        v-model="inputData.logoImagePath"
        :myimage_path="myimage_path"
        :model="inputData.logoImagePath"
        @onUpdate="(e) => ((inputData.logoImagePath = e), onUpdate(e))"
      ></addImageForm>
      <addPrivacyForm
        variant="outlined"
        :hideDetails="`auto`"
        :height="15"
        :disabled="inputData.privacy.checked ? true : false"
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
        title="顧客の表示/非表示"
        :label="`表示する`"
        density="compact"
        type="customerDisplayFlag"
        :tooltipflag="true"
        tooltipMessage="顧客を非表示にする場合は、登録検査をすべて非表示にしてください。"
        :model="inputData.customerDisplayFlag"
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
        title="担当者氏名"
        text="担当者氏名を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :requriredIcon="true"
        :rules="requiredValue(inputData.tanto_name, '担当者氏名')"
        :value="inputData.tanto_name"
        @onBlur="(e) => ((inputData.tanto_name = e), onBlurButton())"
      ></addPartnerForm>
      <addPartnerForm
        title="担当者アドレス"
        text="担当者アドレスを入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :value="inputData.tanto_address"
        :requriredIcon="true"
        :rules="checkEmail(inputData.tanto_address)"
        @onBlur="(e) => ((inputData.tanto_address = e), onBlurButton())"
      ></addPartnerForm>
      <addPartnerForm
        title="部署名"
        text="部署名を入力してください"
        class="w-50"
        :hideDetails="`auto`"
        :value="inputData.tanto_busyo"
        @onBlur="(e) => (inputData.tanto_busyo = e)"
      ></addPartnerForm>
      <addPartnerForm
        title="連絡先1"
        text="連絡先1を入力してください"
        class="w-50"
        :hideDetails="`auto`"
        :value="inputData.tanto_tel1"
        messages="例)03-0000-0000"
        @onBlur="(e) => (inputData.tanto_tel1 = e)"
      ></addPartnerForm>
      <addPartnerForm
        title="連絡先2"
        text="連絡先2を入力してください"
        class="w-50"
        :hideDetails="`auto`"
        :value="inputData.tanto_tel2"
        messages="例)03-0000-0000"
        @onBlur="(e) => (inputData.tanto_tel2 = e)"
      ></addPartnerForm>
      <addPartnerForm
        title="担当者氏名2"
        text="担当者氏名2を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        :value="inputData.tanto_name2"
        @onBlur="(e) => (inputData.tanto_name2 = e)"
      ></addPartnerForm>
      <addPartnerForm
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
