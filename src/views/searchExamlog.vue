<script setup lang="ts">
import { ref, onMounted } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import { examLogStatus } from "@/plugins/const";
import HistoryApiService from "@/services/HistoryApiService";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import dayjs from "dayjs";

const user = useStoreUser();

const loading = ref(true);
const page = ref(1);
const lastPage = ref(0);

interface History {
  customer_name: string;
  partner_name: string;
  testtype: string;
  status: string;
  created_at: string;
  testname: string;
  num: string;
}

const headers = [
  { title: "パートナ企業名", sortable: false, key: "partner_name" },
  { title: "顧客名", sortable: false, key: "customer_name" },
  { title: "更新検査種別", sortable: false, key: "testtype" },
  { title: "件数(登録/削除)", sortable: false, key: "status" },
  { title: "変更日時", sortable: false, key: "created_at" },
  { title: "パートナ更新検査名", sortable: false, key: "testname" },
];
const form = ref({
  id: "",
  customer_name: "",
  name: "",
  year: "",
  month: "",
  day: "",
});
const histories = ref<History[]>([]);
async function loadHistory(
  params: {
    search?: string;
    year?: string;
    month?: string;
    day?: string;
  } = {}
) {
  try {
    loading.value = true;

    const response = await HistoryApiService.testhistory({
      page: page.value,
      ...params,
    });
    console.log(response);
    histories.value = response.data.data;
    lastPage.value = response.data.last_page;
    loading.value = false;
  } catch (error) {
    console.error("API エラー:", error);
    loading.value = false;
  }
}
onMounted(() => {
  loadHistory();
});
const changePage = (n: number) => {
  page.value = n;

  loadHistory({
    search: form.value.customer_name,
    year: form.value.year,
    month: form.value.month,
    day: form.value.day,
  });
};
const onclick = () => {
  page.value = 1;

  loadHistory({
    search: form.value.customer_name,
    year: form.value.year,
    month: form.value.month,
    day: form.value.day,
  });
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
  <pankuzuAdmin :pageName="user.searchExamlog"></pankuzuAdmin>
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
      <v-col cols="2" class="pl-2">
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
      <v-col cols="1">
        <ComponentButton
          text="検索"
          color="primary"
          class="ml-2 mt-1"
          @onClick="onclick()"
        />
      </v-col>
    </v-row>
  </v-card>
  <v-data-table
    :headers="headers"
    :items="histories"
    show-current-page
    show-items-per-page
    class="listable ma-2"
    :height="tableHeight"
    :items-per-page="100"
    fixed-header
    hide-default-footer
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.partner_name }}</td>
        <td>{{ item.customer_name }}</td>
        <td>{{ item.testtype }}</td>
        <td>{{ item.num }}件 {{ examLogStatus[item.status] }}</td>
        <td>{{ dayjs(item.created_at).format("YYYY/MM/DD HH:mm:ss") }}</td>
        <td>{{ item.testname }}</td>
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
