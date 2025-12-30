<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { PDF_TYPE } from "@/plugins/const";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import UserApiService from "@/services/UserApiService";
import { format, parseISO } from "date-fns";
import TestApiService from "@/services/TestApiService";
import PdfDownloadApiService from "@/services/PdfDownloadApiService";
import AlertView from "@/components/AlertView.vue";
import { d_Path } from "@/plugins/const";

const tab = ref<string>("tab-1");
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
  PdfDownloadApiService.setOutPutLog({
    partner_id: partner_id,
    customer_id: customer_id,
    test_id: test_id,
    type: 1,
    code: 2, // zip化
  }).then((res) => {
    if (res.status) {
      messageFlag.value = true;
    }
  });
};

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
const testheaders = ref([
  { title: "検査名", align: undefined, key: "test.testname" },
  { title: "パートナー名", align: undefined, key: "partner.name" },
  { title: "企業名", align: undefined, key: "customer.name" },
  { title: "状態", align: undefined, key: "type_string" },
  { title: "作成開始時間", align: undefined, key: "created_at_formatted" },
  { title: "作成完了時間", align: undefined, key: "updated_at_formatted" },
  {
    title: "ダウンロードファイル",
    align: undefined,
    key: "admin_cronfile_path_text",
  },
]);
const pdfList = ref<any[]>([]);
// PDF出力状態一覧
const loadPdfLog = () => {
  PdfDownloadApiService.getOutPutLog({}).then((res) => {
    console.log(res.data);
    pdfList.value = res.data.map((row: any) => ({
      ...row,
      created_at_formatted: formatDate(row.created_at),
      updated_at_formatted: formatDate(row.updated_at),
      type_string: PDF_TYPE[row.type as keyof typeof PDF_TYPE],
    }));
  });
};

const pdfListView = computed(() => {
  return pdfList.value.map((row: any) => ({
    ...row,
    admin_cronfile_path_text: Array.isArray(row.admin_cronfile_path)
      ? row.admin_cronfile_path[0]
      : "",
  }));
});

const formatDate = (iso: string) => {
  return format(parseISO(iso), "yyyy/MM/dd HH:mm");
};
onMounted(async () => {
  loadPartner();
  loadPdfLog();
});

const downloadFile = (link: string) => {
  location.href = d_Path + "/storage/uploads/" + link;
  return;
};
</script>
<template>
  <v-row justify="center">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.pdfoutputlog"></pankuzuAdmin>
  <section class="ma-2">
    <v-tabs v-model="tab">
      <v-tab value="tab-1">出力確認一覧</v-tab>
      <v-tab value="tab-2">PDF出力フォーム</v-tab>
    </v-tabs>
    <v-window
      v-model="tab"
      class="mt-3"
      transition="none"
      reverse-transition="none"
    >
      <v-window-item value="tab-1" v-resize="onResize">
        <v-data-table
          :headers="testheaders"
          :items="pdfListView"
          :height="tableHeight"
          fixed-header
          color="green"
        >
          <!-- ダウンロードファイル列 -->
          <template #item="{ item }">
            <tr>
              <td>{{ item.test.testname }}</td>
              <td>{{ item.partner.name }}</td>
              <td>{{ item.customer.name }}</td>
              <td>{{ item.type_string }}</td>
              <td>{{ item.created_at_formatted }}</td>
              <td>{{ item.updated_at_formatted }}</td>

              <!-- ダウンロードファイル列 -->
              <td>
                <v-btn
                  v-if="item.admin_cronfile_path_text"
                  variant="text"
                  color="primary"
                  @click="downloadFile(item.admin_cronfile_path_text)"
                >
                  ダウンロード
                </v-btn>
                <span v-else class="text-grey">なし</span>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-window-item>
      <v-window-item value="tab-2">
        <AlertView
          text="PDF一括ダウンロードの出力準備を行いました。ダウンロード実行迄お待ちください。"
          class="bg-red"
          v-show="messageFlag"
        ></AlertView>
        <p>
          パートナー名 / 企業名 /
          テスト名を選択してPDF一括ダウンロードを選択してください。<br />
          準備完了後「ダウンロードファイル」欄のファイル名をクリックしてください。
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
      </v-window-item>
    </v-window>
  </section>
</template>
<style scoped lang="scss"></style>
