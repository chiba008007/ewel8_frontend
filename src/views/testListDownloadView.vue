<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuMain from "../components/pankuzuMain.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useStoreUser } from "../store/user";
import { pagelink } from "@/plugins/pagelink";
import FileuploadApiService from "@/services/FileuploadApiService";
import { d_filePath, openStatus } from "@/plugins/const";
import ProgressView from "@/components/ProgressView.vue";

const router = useRouter();
const params = router.currentRoute.value.params;
const user = useStoreUser();
const loadingFlag = ref(true);

const onBack = () => {
  router.push({
    name: "testLists",
    params: { id: params.id },
  });
};

const headers = [
  { title: "登録日", sortable: true, key: "name" },
  { title: "ファイル名", sortable: false, key: "speed" },
  { title: "サイズ", sortable: false, key: "length" },
  { title: "ステータス", sortable: false, key: "price" },
];

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};

type DataType = {
  key: number;
  registdate: string;
  filename: string;
  filepath: string;
  size: string;
  openflag: string;
  checked: boolean;
  id: number;
};

const desserts = ref<DataType[]>([]);

onMounted(() => {
  reading();
});
const reading = () => {
  let tmp = {
    customer_id: params.id,
    partner_id: user.getSession("partner_id"),
  };
  FileuploadApiService.getList(tmp).then((res) => {
    desserts.value = [];
    let i = 0;
    res?.data.map((val: any) => {
      desserts.value.push({
        key: i,
        registdate: val.date,
        filename: val.filename,
        filepath: d_filePath + "" + val.filepath,
        size: commaSeparated(val.size),
        openflag: openStatus[val.openflag],
        checked: false,
        id: val.id,
      });
      i++;
    });
    loadingFlag.value = false;
  });
};
const commaSeparated = (value: number) => {
  return new Intl.NumberFormat().format(value);
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customer" />
  <v-row justify="center">
    <TestMenu />
  </v-row>
  <pankuzuMain
    :adminhref="{
      pageName: 'testList',
      href: 'testLists',
      params: { id: params.id },
    }"
    :adminhref2="{ pageName: 'testListsDownload' }"
  ></pankuzuMain>
  <div class="mx-3">
    <h4 class="mt-2">{{ user["testListsDownload"] }}</h4>
    <p>ダウンロードしたいファイル名を選択してください。</p>
    <v-row v-resize="onResize">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="listable ma-2"
          :height="tableHeight"
          fixed-header
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-left">{{ item.registdate }}</td>
              <td class="text-xs-right">
                <a
                  @click="pagelink(item.filepath, item.id, item.key)"
                  class="links"
                  >{{ item.filename }}</a
                >
              </td>
              <td class="text-right">{{ item.size }}</td>
              <td class="text-center">{{ item.openflag }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <div class="my-3">
      <ButtonView text="戻る" color="primary" @onClick="onBack()"></ButtonView>
    </div>
  </div>
</template>
<style scoped>
::v-deep(.v-data-table thead th) {
  background-color: #4caf50 !important;
  color: white !important;
}
</style>
