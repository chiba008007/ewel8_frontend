<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import InformationApiService from "@/services/InformationApiService";
import dayjs from "dayjs";
import AlertView from "@/components/AlertView.vue";

const user = useStoreUser();
const flashMessage = ref();
const error = ref();
const router = useRouter();

interface Info {
  id: number;
  title: string;
  started_at: string;
  ended_at: string;
  display_labels: string;
}
const selected = ref<Info[]>([]);
const items = ref<Info[]>([]);
const headers = [
  { title: "件名", sortable: false, key: "title", width: "300px" },
  { title: "表示期間", sortable: false, key: "started_at", width: "280px" },
  { title: "表示範囲", sortable: false, key: "display_labels" },
  { title: "機能", sortable: false, key: "function", width: "200px" },
];

const searchInfo = async () => {
  try {
    const response = await InformationApiService.getInfoList({});
    console.log(response);
    items.value = response.data;
  } catch (err) {
    console.error("検索失敗:", err);
  }
};

onMounted(async () => {
  // 一覧表示
  searchInfo();
});

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
// チェックした内容を削除
const deleteAll = () => {
  const ids = selected.value.map((row) => row.id);
  console.log(ids);
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.informationData"></pankuzuAdmin>

  <p class="text-h6 pa-2">{{ user.informationData }}</p>
  <div v-show="flashMessage">
    <AlertView :text="flashMessage" type="success"></AlertView>
  </div>
  <div class="ma-2">
    <ButtonView
      text="新規登録"
      class="btn bg-primary"
      @onClick="router.push({ name: 'informationNew' })"
    ></ButtonView>
    <ButtonView
      text="チェック一括削除"
      class="btn bg-red ml-2"
      @onClick="deleteAll()"
    ></ButtonView>

    <v-data-table
      :headers="headers"
      :items="items"
      class="listable ma-2 dataPartnerTableStyle dataTestList"
      :height="tableHeight"
      fixed-header
      :items-per-page="50"
      show-select
      v-model="selected"
      item-value="id"
      return-object
    >
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.started_at="{ item }">
        <span>
          {{ dayjs(item.started_at).format("YYYY/MM/DD HH:mm") }}～
          {{ dayjs(item.ended_at).format("YYYY/MM/DD HH:mm") }}
        </span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.display_labels="{ item }">
        <span>{{ item.display_labels }}</span>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template #item.function="{ item }">
        <span>{{ item.id }}</span>
        <ButtonView text="更新" class="bg-primary"></ButtonView>
        <ButtonView text="削除" class="bg-red ml-2"></ButtonView>
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
