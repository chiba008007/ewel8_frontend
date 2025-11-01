<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import { d_Front, d_Path } from "@/plugins/const";
import BillApiService from "@/services/BillApiService";
import { format } from "date-fns";

const user = useStoreUser();

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
  money: number;
}

const items = ref<Bill[]>([]);
const moveToInvoice = () => {
  router.push({ name: "invoiceSetView" });
};
const headers = [
  { title: "請求書番号", sortable: false, key: "bill_number", width: "180px" },
  { title: "発行先企業名", sortable: false, key: "company_name" },
  { title: "件名", sortable: false, key: "title" },
  { title: "発行日", sortable: false, key: "pay_date", width: "140px" },
  { title: "更新機能", sortable: false, key: "function", width: "260px" },
  { title: "ダウンロード機能", sortable: false, key: "dl", width: "160px" },
  { title: "ステータス", sortable: false, key: "status", width: "120px" },
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
  try {
    const response = await BillApiService.get({});
    items.value = response.data.data;
  } catch (err) {
    error.value = err;
    console.error("取得失敗:", err);
  }
});

// 請求書ダウンロード移動
const goToInvoice = (id: number) => {
  location.href = d_Path + "/bill/download/" + id;
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.billRowData"></pankuzuAdmin>
  <v-container>
    <v-row class="border-t">
      <v-col class="border-e border-s bg-primary d-flex align-center">
        請求書番号
      </v-col>
      <v-col class="border-e">
        <TextFieldView density="compact"></TextFieldView>
      </v-col>
      <v-col class="border-e bg-primary d-flex align-center"> 企業名 </v-col>
      <v-col class="border-e">
        <TextFieldView density="compact"></TextFieldView>
      </v-col>
      <v-col class="border-e bg-primary d-flex align-center">
        ステータス
      </v-col>
      <v-col class="border-e">
        <TextFieldView density="compact"></TextFieldView>
      </v-col>
    </v-row>
    <v-row class="border-t border-b">
      <v-col cols="3" class="border-e border-s bg-primary d-flex align-center">
        発行日
      </v-col>
      <v-col cols="3" class="border-e">
        <TextFieldView density="compact"></TextFieldView>
      </v-col>
      <v-col cols="3" class="border-e bg-primary d-flex align-center">
        件名
      </v-col>
      <v-col cols="3" class="border-e">
        <TextFieldView density="compact"></TextFieldView>
      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col>
        <ButtonView
          text="新規登録"
          class="bg-success"
          @onClick="moveToInvoice"
        ></ButtonView>
      </v-col>
      <v-col class="text-end">
        <ButtonView text="検索" class="bg-primary"></ButtonView>
      </v-col>
    </v-row>
  </v-container>
  <p class="text-h6 pa-2">{{ user.billRowData }}</p>
  <div class="ma-2">
    <v-data-table
      :headers="headers"
      :items="items"
      class="listable ma-2 dataPartnerTableStyle dataTestList"
      :height="tableHeight"
      :search="``"
      fixed-header
    >
      <!-- 日付カラムをフォーマット -->
      <template #[`item.pay_date`]="{ item }">
        {{ formatDate(item.pay_date) }}
      </template>
      <!-- 金額カラムをフォーマット -->
      <template #[`item.money`]="{ item }">
        {{ formatMoney(item.money) }}
      </template>
      <!-- 機能カラムをフォーマット -->
      <template #[`item.function`]="{ item }">
        <div class="d-flex">
          <ButtonView
            text="納品書"
            class="bg-primary"
            density="compact"
          ></ButtonView>
          <ButtonView
            text="請求書"
            class="bg-success ml-2"
            density="compact"
            @onClick="goToInvoice(item.id)"
          ></ButtonView>
          <ButtonView
            text="削除"
            class="bg-red ml-2"
            density="compact"
          ></ButtonView>
        </div>
      </template>
      <template #[`item.dl`]="{ item }">
        <div class="d-flex">
          <ButtonView
            text="納品書DL"
            class="bg-amber-darken-1"
            density="compact"
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
<style scoped lang="scss"></style>
