<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import TestApiService from "@/services/TestApiService";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";

const user = useStoreUser();

const loading = ref(true);
interface DessertItem {
  testname: string;
  email: string;
  customer_name: string;
  partner_name: string;
  name: string;
  endtime: string;
}
const headers = [
  { title: "検査名", sortable: false, key: "testname" },
  { title: "ID", sortable: false, key: "id" },
  { title: "顧客企業名", sortable: false, key: "customer" },
  { title: "パートナー企業名", sortable: false, key: "partner" },
  { title: "氏名", sortable: false, key: "name" },
  { title: "受検日時", sortable: false, key: "date" },
];
const form = ref({
  id: "",
  customer_name: "",
  name: "",
  year: "",
  month: "",
  day: "",
});
const desserts = ref<DessertItem[]>([]);
const defaulted = ref<DessertItem[]>([]);
const page = ref(1);
const lastPage = ref(0);

const fetchData = () => {
  let date: string | null = null;

  if (form.value.year && form.value.month && form.value.day) {
    const y = form.value.year;
    const m = form.value.month.padStart(2, "0");
    const d = form.value.day.padStart(2, "0");
    date = `${y}-${m}-${d}`;
  }

  const params = {
    page: page.value,
    id: form.value.id,
    customer_name: form.value.customer_name,
    name: form.value.name,
    date: date,
  };
  TestApiService.getSearchExam(params).then(function (rlt) {
    if (rlt.data) {
      desserts.value = rlt.data.data;
      defaulted.value = rlt.data.data;
      lastPage.value = rlt.data.last_page;
      loading.value = false;
    }
  });
};

const changePage = (n: number) => {
  page.value = n;
  fetchData(); // API再取得
};
// 初回ロード
fetchData();

const onclick = () => {
  page.value = 1;
  fetchData();
};

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.examSearch"></pankuzuAdmin>
  <v-card subtitle="検索フォーム" width="100%" class="ma-0 px-3" elevation="0">
    <v-row no-gutters>
      <v-col cols="2" class="pa-0 ma-0">
        <ComponentTextField
          placeholder="IDを入力してください"
          text="IDで検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.id = e)"
        />
      </v-col>
      <v-col cols="2" class="pl-2">
        <ComponentTextField
          placeholder="顧客企業名を入力してください"
          text="顧客企業名で検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.customer_name = e)"
        />
      </v-col>
      <v-col cols="2" class="pl-2">
        <ComponentTextField
          placeholder="氏名を入力してください"
          text="氏名で検索"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.name = e)"
        />
      </v-col>
      <v-col cols="1" class="pl-2">
        <ComponentTextField
          placeholder="年入力"
          text="年入力"
          density="compact"
          variant="outlined"
          class="w-100"
          @onBlur="(e) => (form.year = e)"
        />
      </v-col>
      <v-col cols="1" class="d-flex">
        <ComponentTextField
          placeholder="月入力"
          text="月入力"
          density="compact"
          variant="outlined"
          class="w-50"
          @onBlur="(e) => (form.month = e)"
        />
        <ComponentTextField
          placeholder="日入力"
          text="日入力"
          density="compact"
          variant="outlined"
          class="w-50"
          @onBlur="(e) => (form.day = e)"
        />
      </v-col>
      <v-col cols="12">
        <ComponentButton
          text="検索"
          color="primary"
          class="mt-1"
          @onClick="onclick()"
        />
      </v-col>
    </v-row>
  </v-card>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="listable ma-2"
    :height="tableHeight"
    fixed-header
    :items-per-page="30"
    hide-default-footer
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.testname }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.customer_name }}</td>
        <td>{{ item.partner_name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.endtime }}</td>
      </tr>
    </template>
  </v-data-table>
  <div class="ma-2">
    <v-btn
      class="btn bg-blue mr-1"
      v-for="n in lastPage"
      :key="n"
      @click="changePage(n)"
    >
      {{ n }}
    </v-btn>
  </div>
</template>
<style lang="scss"></style>
