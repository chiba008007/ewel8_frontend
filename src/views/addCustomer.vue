<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStoreUser } from "../store/user";
import CustomerMenu from "../components/CustomerMenu.vue";
import InfoAreaView from "../components/InfoAreaView.vue";
import { useRouter } from "vue-router";
import addPartnerForm from "../components/addPartnerForm.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
import PrefApiService from "@/services/PrefApiService";
import addSwitchForm from "../components/addSwitchForm.vue";
import addImageForm from "../components/addImageForm.vue";
import addPrivacyForm from "../components/addPrivacyForm.vue";

const router = useRouter();
const user = useStoreUser();

const pankuzu = [
  { title: user.home, href: router.resolve({ name: "List" }).href },
  {
    title: user.customerInfoList,
    href: router.resolve({ name: "customerList" }).href,
  },
  { title: user.customerRegist },
];

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};

const name = ref();
const login_id = ref();

const onBlur = (e: string | boolean, type: string) => {
  console.log("blur");
};

const pdfs = ref();
const post1 = ref();
const post2 = ref();
const preftext = ref();
const addressText = ref();
const addressText2 = ref();
const prefs = ref();
const displayTrendFlag = ref<boolean>(false);
const displayCsvFlag = ref<boolean>(false);
const displayPdfFlag = ref<boolean>(false);
const displayWeightFlag = ref<boolean>(false);
const displayExcelFlag = ref<boolean>(false);
const displayCustomFlag = ref<boolean>(false);
const displayExamFlag = ref<boolean>(false);
const displaySslFlag = ref<boolean>(true);
const logoImagePath = ref();

const privacy = ref(user.privacyText);

const postBlur = (e: string, type: string) => {
  if (type === "post1") post1.value = e;
  if (type === "post2") post2.value = e;
  if (post1.value && post2.value) {
    new YubinBangoCore(post1.value + post2.value, function (addr: any) {
      preftext.value = addr.region;
      addressText.value = addr.street;
    });
  }
};
PrefApiService.getPrefData().then((res) => {
  prefs.value = res;
});

const onUpdate = (e: boolean, type: string) => {
  if (type == "trend") {
    displayTrendFlag.value = e;
  }
  if (type == "csv") {
    displayCsvFlag.value = e;
  }
  if (type == "pdf") {
    displayPdfFlag.value = e;
  }
  if (type == "weight") {
    displayWeightFlag.value = e;
  }
  if (type == "excel") {
    displayExcelFlag.value = e;
  }
  if (type == "custom") {
    displayCustomFlag.value = e;
  }
  if (type == "exam") {
    displayExamFlag.value = e;
  }
  if (type == "ssl") {
    displaySslFlag.value = e;
  }
  if (type == "logoImagePath") {
    logoImagePath.value = e;
  }
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
      顧客企業情報を入力してください。
      <addPartnerForm
        title="顧客企業名"
        text="顧客企業名を入力してください"
        class="w-100"
        :hideDetails="`auto`"
        type="name"
        :value="name"
        :rules="(val:string|any) => rules(val, '顧客企業名は必須入力です')"
        @onBlur="(ev, type) => onBlur(ev, type)"
      ></addPartnerForm>
      <addPartnerForm
        title="ログインID"
        text="ログインIDを入力してください"
        class="w-50"
        :hideDetails="`auto`"
        type="login_id"
        :value="login_id"
        :rules="(val:string|any) => rules(val, 'ログインIDは必須入力です')"
        @onBlur="(ev, type) => onBlur(ev, type)"
      ></addPartnerForm>
      <addPartnerForm
        title="パスワード"
        text="パスワードを入力してください"
        class="w-50"
        :hideDetails="`auto`"
        type="login_id"
        :value="login_id"
        :rules="(val:string|any) => rules(val, 'パスワードは必須入力です')"
        @onBlur="(ev, type) => onBlur(ev, type)"
      ></addPartnerForm>
      <addPostCodeForm
        title="郵便番号"
        class="w-100"
        :hideDetails="true"
        @onBlur="(e, type) => postBlur(e, type)"
      ></addPostCodeForm>
      <addPrefCodeForm
        title="都道府県"
        label="都道府県を選択"
        class="w-50"
        :hideDetails="true"
        :items="prefs"
        :value="preftext ?? ``"
        type="pref"
        @onBlur="(e, type) => onBlur(e, type)"
      ></addPrefCodeForm>
      <addPartnerForm
        title="住所"
        text="住所を入力してください"
        class="w-100"
        :hideDetails="true"
        :value="addressText ?? ``"
        type="address"
        @onBlur="(e, type) => onBlur(e, type)"
      ></addPartnerForm>
      <addPartnerForm
        title="建物名"
        text="建物名を入力してください"
        class="w-100"
        :hideDetails="true"
        type="address2"
        @onBlur="(e, type) => onBlur(e, type)"
      ></addPartnerForm>
      <addPartnerForm
        title="電話番号"
        text="電話番号を入力してください"
        class="w-100"
        :hideDetails="false"
        messages="例)03-0000-0000"
        type="tel"
        @onBlur="(e, type) => onBlur(e, type)"
      ></addPartnerForm>
      <addPartnerForm
        title="FAX番号"
        text="FAX番号を入力してください"
        class="w-100"
        :hideDetails="false"
        messages="例)03-0000-0000"
        type="fax"
        @onBlur="(e, type) => onBlur(e, type)"
      ></addPartnerForm>

      <addSwitchForm
        title="受検者傾向確認ボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayTrendFlag"
        :model="displayTrendFlag"
        :tooltipflag="true"
        tooltipMessage="受検者傾向確認ボタンの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'trend')"
      ></addSwitchForm>
      <addSwitchForm
        title="CSVアップロードボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayCsvFlag"
        :model="displayCsvFlag"
        :tooltipflag="true"
        tooltipMessage="CSVアップロードボタンの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'csv')"
      ></addSwitchForm>
      <addSwitchForm
        title="PDFボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayPdfFlag"
        :model="displayPdfFlag"
        :tooltipflag="true"
        tooltipMessage="PDFボタンの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'pdf')"
      ></addSwitchForm>
      <addSwitchForm
        title="PDF重みマスタ表示"
        :label="`表示する`"
        density="compact"
        type="displayWeightFlag"
        :model="displayWeightFlag"
        :tooltipflag="true"
        tooltipMessage="PDF重みマスタの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'weight')"
      ></addSwitchForm>
      <addSwitchForm
        title="エクセル重みマスタ表示"
        :label="`表示する`"
        density="compact"
        type="displayExcelFlag"
        :model="displayExcelFlag"
        :tooltipflag="true"
        tooltipMessage="エクセル重みマスタの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'excel')"
      ></addSwitchForm>
      <addSwitchForm
        title="顧客ファイルアップロード表示"
        :label="`表示する`"
        density="compact"
        type="displayCustomFlag"
        :model="displayCustomFlag"
        :tooltipflag="true"
        tooltipMessage="顧客ファイルアップロードの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'custom')"
      ></addSwitchForm>
      <addSwitchForm
        title="検査申込ボタン表示"
        :label="`表示する`"
        density="compact"
        type="displayExamFlag"
        :model="displayExamFlag"
        :tooltipflag="true"
        tooltipMessage="検査申込ボタンの表示可否を選択します。"
        @onUpdate="(e) => onUpdate(e, 'exam')"
      ></addSwitchForm>
      <addSwitchForm
        title="SSL設定"
        :label="`設定する`"
        density="compact"
        type="displaySslFlag"
        :model="displaySslFlag"
        :tooltipflag="true"
        tooltipMessage="受検ページをhttps://で利用します。"
        @onUpdate="(e) => onUpdate(e, 'ssl')"
      ></addSwitchForm>
      <addImageForm
        title="ロゴ画像"
        density="compact"
        label="アップロード画像選択"
        type="logoImagePath"
        @onUpdate="(e:boolean) => onUpdate(e, 'logoImagePath')"
      ></addImageForm>
      <addPrivacyForm
        name="privacy"
        variant="outlined"
        :hideDetails="`auto`"
        height="15"
        :value="privacy"
        :disabled="true"
      ></addPrivacyForm>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
