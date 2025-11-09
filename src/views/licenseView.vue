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
import LicenseApiService from "@/services/LicenseApiService";
import { format } from "date-fns";
import AlertView from "@/components/AlertView.vue";

const user = useStoreUser();
const flashMessage = ref();
const error = ref();
const router = useRouter();
interface Lisence {
  code: number;
  bill_number: string;
  company_name: string;
  title: string;
  pay_date: string;
  function?: string;
  status?: string;
  open_status?: string;
  money: number;
}

const items = ref<Lisence[]>([]);
const headers = [
  { title: "検査種別", sortable: false, key: "code" },
  {
    title: "購入ライセンス",
    sortable: false,
    key: "total_num",
    width: "140px",
  },
  {
    title: "販売可能ライセンス",
    sortable: false,
    key: "available_license",
    width: "140px",
  },
  { title: "受検者総数", sortable: false, key: "exam_count", width: "140px" },
  { title: "処理数", sortable: false, key: "syori_count", width: "160px" },
  { title: "残数", sortable: false, key: "zan", width: "160px" },
];

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};

onMounted(async () => {
  searchLicense();
});

const searchLicense = async () => {
  try {
    const response = await LicenseApiService.getLicenseList();
    console.log(response);
    items.value = response.data.data;
  } catch (err) {
    console.error("検索失敗:", err);
  }
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.lisenceList"></pankuzuAdmin>

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
