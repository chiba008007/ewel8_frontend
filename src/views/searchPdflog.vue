<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import { pdfArray } from "@/plugins/const";
import HistoryApiService from "@/services/HistoryApiService";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import dayjs from "dayjs";
import DatePicker from "@/components/DateView.vue";

const user = useStoreUser();
const pdfMap = Object.fromEntries(pdfArray.map((p) => [p.key, p.text]));
const loading = ref(true);

interface History {
  customer_name: string;
  partner_name: string;
  testtype: string;
  exam_id: string;
  exam_email: string;
  ip: string;
  pdf_id: string;
  testname: string;
  created_at: string;
}

const headers = [
  { title: "パートナ企業名", sortable: false, key: "partner_name" },
  { title: "顧客名", sortable: false, key: "customer_name" },
  { title: "検査名", sortable: false, key: "testtype" },
  { title: "受検者ID", sortable: false, key: "exam_id" },
  { title: "出力PDF", sortable: false, key: "pdf_id" },
  { title: "IP", sortable: false, key: "ip" },
  { title: "出力日時", sortable: false, key: "created_at" },
];

const getDateString = (offsetDays = 0, offsetMonths = 0): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setMonth(d.getMonth() + offsetMonths);
  return d.toISOString().slice(0, 10);
};

const form = ref({
  customer_name: "",
  year: "",
  month: "",
  day: "",
  year2: "",
  month2: "",
  day2: "",
  testname: "",
  startDate: getDateString(0, -1),
  endDate: getDateString(0, 0),
});

const histories = ref<History[]>([]);
async function loadHistory() {
  try {
    console.log(form.value);
    const response = await HistoryApiService.pdfhistory(form.value);
    histories.value = response.data;
    loading.value = false;
  } catch (error) {
    console.error("API エラー:", error);
  }
}
onMounted(() => {
  loadHistory();
});

const onclick = () => {
  loadHistory();
};
const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
const getPdfText = (key: string) => {
  return pdfMap[key] ?? key;
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.searchPdflog"></pankuzuAdmin>
  <v-card subtitle="検索フォーム" width="100%" class="ma-0 px-3" elevation="0">
    <v-row no-gutters>
      <v-col cols="4">
        <ComponentTextField
          placeholder="顧客企業名を入力してください"
          text="顧客企業名・パートナー企業で検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.customer_name = e)"
        />
      </v-col>
      <v-col cols="6" class="pl-2 d-flex">
        <DatePicker v-model:value="form.startDate" class="w-100" />
        <DatePicker v-model:value="form.endDate" class="w-100" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4">
        <ComponentTextField
          placeholder="検査名を入力してください"
          text="検査名で検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.testname = e)"
        />
      </v-col>
      <v-col cols="1">
        <ComponentButton
          text="検索"
          color="primary"
          @onClick="onclick()"
          class="ml-1"
        />
      </v-col>
    </v-row>
  </v-card>
  <v-data-table
    :headers="headers"
    :items="histories"
    :items-per-page="10"
    show-current-page
    show-items-per-page
    class="listable ma-2"
    :height="tableHeight"
    fixed-header
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.partner_name }}</td>
        <td>{{ item.customer_name }}</td>
        <td>{{ item.testname }}</td>
        <td>{{ item.exam_email }}</td>
        <td>{{ getPdfText(item.pdf_id) }}</td>
        <td>{{ item.ip }}</td>
        <td>{{ dayjs(item.created_at).format("YYYY/MM/DD HH:mm:ss") }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<style lang="scss"></style>
