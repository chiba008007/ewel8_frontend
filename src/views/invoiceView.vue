<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import DatePickerView from "@/components/DateView.vue";
import { d_Front, d_Path, openStatus } from "@/plugins/const";
import BillApiService from "@/services/BillApiService";
import { format } from "date-fns";
import AlertView from "@/components/AlertView.vue";

// openStatusをselectboxように置き換え
const openStatusSelect = [
  { id: 0, name: openStatus[0] },
  { id: 1, name: openStatus[1] },
  { id: "", name: "" },
];

const user = useStoreUser();
const flashMessage = ref();
const error = ref();
const router = useRouter();
interface Bill {
  id: number;
  bill_number: string;
  company_name: string;
  title: string;
  pay_date: string;
  function?: string;
  status?: string;
  open_status?: string;
  money: number;
}

const items = ref<Bill[]>([]);
const headers = [
  { title: "請求書番号", sortable: false, key: "bill_number", width: "140px" },
  { title: "発行先企業名", sortable: false, key: "company_name" },
  { title: "件名", sortable: false, key: "title" },
  { title: "発行日", sortable: false, key: "pay_date", width: "140px" },
  { title: "更新機能", sortable: false, key: "function", width: "160px" },
  { title: "ダウンロード機能", sortable: false, key: "dl", width: "160px" },
  { title: "ステータス", sortable: false, key: "open_status", width: "120px" },
  { title: "請求金額", sortable: false, key: "money", width: "140px" },
];
const formatMoney = (value: number | string | null | undefined): string => {
  if (value == null || value === "") return "-";
  const num = Math.floor(Number(value)); // 小数点以下を切り捨て
  return num.toLocaleString("ja-JP") + " 円"; // カンマ区切り＋円
};
const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  // 例：2025/10/31 の形式にする
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}月${String(d.getDate()).padStart(2, "0")}日`;
};
const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};

onMounted(async () => {
  searchBills();
});
// 検索フォーム条件取得
const searchForm = ref({
  bill_number: "",
  company_name: "",
  open_status: "",
  bill_date: "",
  pay_date: "",
  title: "",
});

const searchBills = async () => {
  try {
    const response = await BillApiService.get(searchForm.value);
    items.value = response.data.data;
  } catch (err) {
    console.error("検索失敗:", err);
  }
};
// 検索ボタンを押下
const onSearch = () => {
  searchBills();
};
// 請求書ダウンロード移動
const goToInvoice = (id: number, type?: string) => {
  if (type == "slip") {
    location.href = d_Path + "/bill/slip/download/" + id;
  } else {
    location.href = d_Path + "/bill/download/" + id;
  }
};
// 削除ボタン押下
const onDelete = async (id: number) => {
  var params = {
    id: id,
  };
  flashMessage.value = "";
  if (confirm("削除します。よろしいですか？")) {
    try {
      await BillApiService.delete(params);
      flashMessage.value = "削除を行いました。";
      searchBills();
    } catch (err) {
      console.error("検索失敗:", err);
    }
  }
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.billRowData"></pankuzuAdmin>
  <v-container>
    <v-row class="fixed-height">
      <v-col class="d-flex align-center">
        <span class="d-line-block textWidth">請求書番号</span>
        <TextFieldView
          density="compact"
          class="ml-2"
          @onKeyup="(e) => (searchForm.bill_number = e)"
        ></TextFieldView>
      </v-col>
      <v-col class="d-flex align-center">
        <span class="d-line-block textWidth">企業名</span>
        <TextFieldView
          density="compact"
          class="ml-2"
          @onKeyup="(e) => (searchForm.company_name = e)"
        ></TextFieldView>
      </v-col>
      <v-col class="d-flex align-center">
        <span class="d-line-block textWidth">ステータス</span>
        <SelectFieldView
          :items="openStatusSelect"
          :text="searchForm.open_status"
          @onChange="(e) => (searchForm.open_status = e)"
        ></SelectFieldView>
      </v-col>
    </v-row>
    <v-row class="fixed-height pt-3">
      <v-col class="d-flex align-center">
        <span class="d-line-block textWidth">発行日</span>
        <DatePickerView
          v-model:value="searchForm.pay_date"
          @update:value="(e) => (searchForm.pay_date = e)"
          :clearable="true"
          @onClear="searchForm.pay_date = ''"
        ></DatePickerView>
      </v-col>
      <v-col class="d-flex align-center">
        <span class="d-line-block textWidth">件名</span>
        <TextFieldView
          density="compact"
          class="ml-2"
          @onKeyup="(e) => (searchForm.title = e)"
        ></TextFieldView>
      </v-col>
      <v-col class="align-right">
        <ButtonView
          text="検索"
          class="bg-primary w-75"
          @onClick="onSearch()"
        ></ButtonView>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col>
        <ButtonView
          text="新規登録"
          class="bg-success"
          @onClick="router.push({ name: 'invoiceSetView' })"
        ></ButtonView>
      </v-col>
    </v-row>
  </v-container>
  <p class="text-h6 pa-2">{{ user.billRowData }}</p>
  <div v-show="flashMessage">
    <AlertView :text="flashMessage" type="success"></AlertView>
  </div>
  <div class="ma-2">
    <v-data-table
      :headers="headers"
      :items="items"
      class="listable ma-2 dataPartnerTableStyle dataTestList"
      :height="tableHeight"
      :search="``"
      fixed-header
      :items-per-page="50"
    >
      <!-- 日付カラムをフォーマット -->
      <template #[`item.pay_date`]="{ item }">
        {{ formatDate(item.pay_date) }}
      </template>
      <!-- 金額カラムをフォーマット -->
      <template #[`item.money`]="{ item }">
        {{ formatMoney(item.money) }}
      </template>
      <!-- ステータスカラムをフォーマット -->
      <template #[`item.open_status`]="{ item }">
        {{ openStatus[Number(item.open_status ?? 0)] }}
      </template>
      <!-- 機能カラムをフォーマット -->
      <template #[`item.function`]="{ item }">
        <div class="d-flex">
          <ButtonView
            text="請求書"
            class="bg-success ml-2"
            density="compact"
            @onClick="
              router.push({ name: 'invoiceSetView', params: { id: item.id } })
            "
          ></ButtonView>
          <ButtonView
            text="削除"
            class="bg-red ml-2"
            density="compact"
            @onClick="onDelete(item.id)"
          ></ButtonView>
        </div>
      </template>
      <template #[`item.dl`]="{ item }">
        <div class="d-flex">
          <ButtonView
            text="納品書DL"
            class="bg-amber-darken-1"
            density="compact"
            @onClick="goToInvoice(item.id, 'slip')"
          ></ButtonView>
          <ButtonView
            text="請求書DL"
            class="bg-green-lighten-2 ml-2"
            density="compact"
            @onClick="goToInvoice(item.id)"
          ></ButtonView>
        </div>
      </template>
    </v-data-table>
  </div>
</template>
<style scoped lang="scss">
.textWidth {
  width: 100px;
}
::v-deep(.v-field__field) {
  min-height: 30px !important;
  height: 30px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

::v-deep(.v-field__input) {
  min-height: 30px !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}
.v-row.fixed-height {
  align-items: center; /* 子を縦中央揃え */
}

.v-row.fixed-height .v-col {
  display: flex;
  align-items: center;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.v-row.fixed-height .v-col.bg-primary {
  color: white;
  justify-content: center;
  font-weight: bold;
}
</style>
