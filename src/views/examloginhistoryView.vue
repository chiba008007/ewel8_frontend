<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import ExamLoginApiService from "@/services/ExamLoginApiService";
import pageClickMove from "../plugins/pagemove";
import { d_Path } from "@/plugins/const";

const user = useStoreUser();
const flashMessage = ref();
const error = ref();
const router = useRouter();
const move = pageClickMove();
const page = ref(1);
const ceil = ref(0);
interface Info {
  logged_in_at: string;
  partner_name: string;
  customer_name: string;
  test_name: string;
  name: string;
  email: string;
  platform: string;
  browser: string;
}
const items = ref<Info[]>([]);
const headers = [
  {
    title: "アクセス時間",
    sortable: false,
    key: "logged_in_at",
    width: "200px",
  },
  {
    title: "パートナー名",
    sortable: false,
    key: "partner_name",
    width: "280px",
  },
  { title: "顧客名", sortable: false, key: "customer_name", width: "280px" },
  { title: "テスト名", sortable: false, key: "test_name", width: "200px" },
  { title: "利用者名", sortable: false, key: "name", width: "160px" },
  { title: "利用者ID", sortable: false, key: "email", width: "160px" },
  {
    title: "プラットフォーム",
    sortable: false,
    key: "platform",
    width: "160px",
  },
  { title: "ブラウザ", sortable: false, key: "browser", width: "160px" },
];

const searchExamLogin = async () => {
  try {
    const response = await ExamLoginApiService.getExamLoginList({
      page: page.value,
    });

    items.value = response.data.data;
    ceil.value = response.data.ceil;
    console.log(response);
  } catch (err) {
    console.error("検索失敗:", err);
  }
};

onMounted(async () => {
  // 一覧表示
  searchExamLogin();
});

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};

const csvDownload = () => {
  location.href = d_Path + "/examLoginHistory/download/";
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.examLiginHistory"></pankuzuAdmin>
  <p class="text-h6 pa-2">{{ user.examLiginHistory }}</p>
  <div class="d-flex ma-2">
    <ButtonView
      text="前のページ"
      class="bg-primary"
      :disabled="page <= 1 ? true : false"
      @onClick="
        page -= 1;
        searchExamLogin();
      "
    ></ButtonView>
    <ButtonView
      text="次のページ"
      :disabled="page >= ceil ? true : false"
      class="ml-2 bg-primary"
      @onClick="
        page += 1;
        searchExamLogin();
      "
    ></ButtonView>
    <ButtonView
      text="CSV出力"
      class="ml-2 bg-success ml-auto"
      @onClick="csvDownload()"
    ></ButtonView>
  </div>
  <div class="ma-2">
    <v-data-table
      :headers="headers"
      :items="items"
      class="listable ma-2 dataPartnerTableStyle dataTestList"
      :height="tableHeight"
      fixed-header
      hide-default-footer
      server-items-length="total"
    >
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
