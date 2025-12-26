<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import UserApiService from "@/services/UserApiService";
import { fromUnixTime } from "date-fns";
import { customer } from "@/plugins/const";
import TestApiService from "@/services/TestApiService";
import PdfOutputCronLogApiService from "@/services/PdfOutputCronLogApiService";
import AlertView from "@/components/AlertView.vue";

const user = useStoreUser();
const form = ref({
  partner: null as number | null,
  customer: null as number | null,
  test: null as number | null,
});
// パートナー一覧
interface SelectBoxType {
  id: number;
  name: string;
}

const partnerLists = ref<SelectBoxType[]>([]);
const customerLists = ref<SelectBoxType[]>([]);
const testLists = ref<SelectBoxType[]>([]);
const customerDisabled = ref(true);
const testDisabled = ref(true);
const messageFlag = ref(false);
// 企業情報一覧取得
const loadPartner = async () => {
  try {
    customerDisabled.value = true;
    UserApiService.getPartner({
      type: "partner",
    }).then((res) => {
      partnerLists.value = res.data;
    });
  } catch (error) {
    console.error(error);
  }
};
// 企業情報一覧取得
const loadCustomer = async () => {
  try {
    UserApiService.getCustomerList({ partner_id: form.value.partner }).then(
      (res) => {
        customerDisabled.value = false;
        customerLists.value = res.data;
      }
    );
  } catch (error) {
    console.log(error);
  }
};
// テスト一覧
const loadTest = async () => {
  try {
    TestApiService.getTestList({
      user_id: form.value.customer,
      partner_id: form.value.partner,
    }).then((res) => {
      testDisabled.value = false;
      testLists.value = res.data.map((t: any) => ({
        id: t.id,
        name: t.testname,
      }));
    });
  } catch (error) {
    console.log(error);
  }
};

type FormKey = "partner" | "customer" | "test";
const onChange = (value: string | number | null, type: FormKey) => {
  form.value[type] = value === null ? null : Number(value);
  if (type === "partner") {
    loadCustomer();
  }
  if (type === "customer") {
    loadTest();
  }
};
// PDF一括ダウンロード
const onPdfDownload = () => {
  const partner_id = form.value.partner;
  const customer_id = form.value.customer;
  const test_id = form.value.test;
  // PDFテーブル登録
  PdfOutputCronLogApiService.set({
    partner_id: partner_id,
    customer_id: customer_id,
    test_id: test_id,
  }).then((res) => {
    if (res.status) {
      messageFlag.value = true;
    }
  });
};

onMounted(async () => {
  loadPartner();
});
</script>
<template>
  <v-row justify="center">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.pdfoutputlog"></pankuzuAdmin>
  <section class="ma-2">
    <AlertView
      text="PDF一括ダウンロードの出力準備を行いました。ダウンロード実行迄お待ちください。"
      class="bg-red"
      v-show="messageFlag"
    ></AlertView>
    <p>
      パートナー名 / 企業名 /
      テスト名を選択してPDF一括ダウンロードを選択してください。<br />
      ダウンロードファイルが準備でき次第、通知されます。
    </p>
    <p class="text-h6 pa-2">{{ user.pdfoutputlog }}</p>
    <p class="text-h5">パートナー名選択</p>
    <SelectFieldView
      class="mt-1"
      label="パートナー名を選択してください"
      :items="partnerLists"
      :text="form.partner"
      @onChange="(e) => onChange(e, 'partner')"
    ></SelectFieldView>
    <p class="text-h5 mt-3">企業名選択</p>
    <SelectFieldView
      class="mt-1"
      label="企業名を選択してください"
      :items="customerLists"
      :text="form.customer"
      @onChange="(e) => onChange(e, 'customer')"
      :disabled="customerDisabled"
    ></SelectFieldView>
    <p class="text-h5 mt-3">テスト名選択</p>
    <SelectFieldView
      class="mt-1"
      label="テスト名を選択してください"
      :items="testLists"
      :text="form.test"
      @onChange="(e) => onChange(e, 'test')"
      :disabled="testDisabled"
    ></SelectFieldView>
    <ButtonView
      text="PDF一括ダウンロード"
      class="bg-primary mt-3"
      @onClick="onPdfDownload()"
      :disabled="form.customer && form.partner && form.test ? false : true"
    ></ButtonView>
  </section>
</template>
<style scoped lang="scss"></style>
