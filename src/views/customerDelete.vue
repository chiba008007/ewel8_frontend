<script setup lang="ts">
import { ref } from "vue";
import { useStoreUser } from "../store/user";
import InfoAreaView from "../components/InfoAreaView.vue";
import { useRouter, useRoute } from "vue-router";
import addPartnerForm from "../components/addPartnerForm.vue";
import ComponentButton from "../components/ButtonView.vue";
import UserApiGetCustomerEdit from "@/services/UserApiGetCustomerEdit";
import { displayStatus } from "@/plugins/const";
import ComponentAlert from "../components/AlertView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";

import ProgressView from "@/components/ProgressView.vue";
import TestMenu from "@/components/TestMenu.vue";
import UserApiService from "@/services/UserApiService";

const router = useRouter();
const route = useRoute();
const user = useStoreUser();
const registButton = ref<boolean>(false);
const typeString = route.params.typeString;
const tmpid = route.params.id;
const editid = route.params.editid;

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
  two_factor_enabled: false,
  tanto_name: "",
  tanto_address: "",
  tanto_busyo: "",
  tanto_tel1: "",
  tanto_tel2: "",
  tanto_name2: "",
  tanto_address2: "",
});
const myimage_path = ref();

const successAlertFlag = ref(false);

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
    inputData.value.two_factor_enabled = rst?.data.two_factor_enabled;
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
const deleteData = () => {
  let deleteTmp = {
    type: "customer",
    partner_id: tmpid,
    id: editid,
  };
  UserApiService.editUserDeleteDate(deleteTmp).then((rst) => {
    console.log(rst);
    successAlertFlag.value = true;
  });
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
        text="削除"
        color="red"
        class="ml-2"
        @onClick="deleteData()"
        :disabled="registButton"
      />
    </v-col>
  </v-row>

  <v-row no-gutters>
    <v-col cols="12" class="pa-2 ma-2 mt-0 pt-0">
      <ComponentAlert
        v-if="successAlertFlag"
        type="error"
        text="データの削除をおこないました。"
        class="my-2"
      ></ComponentAlert>
      <p class="my-2">以下の情報を削除します。</p>
      <addPartnerForm
        :color="backColor()"
        title="顧客企業名"
        :displayTextValue="inputData.name"
      ></addPartnerForm>
      <addPartnerForm
        title="ログインID"
        :displayTextValue="inputData.login_id"
      ></addPartnerForm>
      <addPartnerForm
        title="郵便番号"
        :displayTextValue="inputData.postCode"
      ></addPartnerForm>
      <addPartnerForm
        title="都道府県"
        :displayTextValue="inputData.preftext ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="住所"
        :displayTextValue="inputData.addressText ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="建物名"
        :displayTextValue="inputData.addressText2 ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="電話番号"
        :displayTextValue="inputData.tel ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="FAX番号"
        :displayTextValue="inputData.fax ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="受検者傾向確認ボタン表示"
        :displayTextValue="displayString(inputData.displayTrendFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="CSVアップロードボタン表示"
        :displayTextValue="displayString(inputData.displayCsvFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="PDFボタン表示"
        :displayTextValue="displayString(inputData.displayPdfFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="PDF重みマスタ表示"
        :displayTextValue="displayString(inputData.displayWeightFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="エクセル重みマスタ表示"
        :displayTextValue="displayString(inputData.displayExcelFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="顧客ファイルアップロード表示"
        :displayTextValue="displayString(inputData.displayCustomFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="SSL設定"
        :displayTextValue="displayString(inputData.displaySslFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="顧客の表示/非表示"
        :displayTextValue="displayString(inputData.customerDisplayFlag)"
      ></addPartnerForm>
      <addPartnerForm
        title="2段階認証有効可否"
        :displayTextValue="displayString(inputData.two_factor_enabled)"
      ></addPartnerForm>
    </v-col>
  </v-row>

  <v-row no-gutters class="mt-5">
    <v-col cols="12" class="pa-2 ma-2">
      <addPartnerForm
        title="担当者氏名"
        :displayTextValue="inputData.tanto_name ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="担当者アドレス"
        :displayTextValue="inputData.tanto_address ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="部署名"
        :displayTextValue="inputData.tanto_busyo ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="連絡先1"
        :displayTextValue="inputData.tanto_tel1 ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="連絡先2"
        :displayTextValue="inputData.tanto_tel2 ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="担当者氏名2"
        :displayTextValue="inputData.tanto_name2 ?? '-'"
      ></addPartnerForm>
      <addPartnerForm
        title="担当者アドレス2"
        :displayTextValue="inputData.tanto_address2 ?? '-'"
      ></addPartnerForm>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
