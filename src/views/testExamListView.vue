<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TestApiService from "@/services/TestApiService";
import UserApiService from "@/services/UserApiService";
import pankuzuTestList from "../components/pankuzuTestList.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import csvDownload from "@/components/csvDownload.vue";
import ExamPfsView from "@/components/ExamPfsView.vue";
import { passArray } from "@/plugins/const";

const headers = ref([
  { title: "番号", sortable: false, key: "no", cols: 1, row: 2 },
  { title: "ID", sortable: true, key: "email", cols: 1, row: 2 },
  { title: "氏名", sortable: true, key: "name", cols: 1, row: 2 },
  { title: "ふりがな", sortable: false, key: "kana", cols: 1, row: 2 },
  { title: "生年月日", sortable: false, key: "birth", cols: 1, row: 2 },
  { title: "合否", sortable: false, key: "passflag", cols: 1, row: 2 },
]);
const examList = ref();
const router = useRouter();
const detail = ref();
const title = ref("");
const params = router.currentRoute.value.params;
let tmp = {
  user_id: params.id,
  test_id: params.testid,
};
const typed = { code: "" };
TestApiService.getTestTableTh(tmp).then(function (rlt) {
  rlt.data.forEach((x: typeof typed) => {
    headers.value.push({
      title: x.code,
      sortable: false,
      key: x.code,
      cols: 3, //pfs用
      row: 1, //pfs用
    });
  });
});
TestApiService.getExam(tmp).then(function (rlt) {
  console.log(rlt);
  detail.value = rlt;
  title.value = detail.value.data.detail.testname;
  examList.value = detail.value.data.exams;
  examList.value.map((value: any, k: number) => {
    examList.value[k]["passText"] = (passArray as any)[value.passflag];
  });
});
const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
</script>
<template>
  <PartnerAdmin coded="customer" />
  <pankuzuTestList></pankuzuTestList>
  <div id="divoverflow">
    <v-row v-resize="onResize" style="width: auto">
      <v-col class="ma-1">
        <v-data-table
          :headers="headers"
          :items="examList"
          class="listable ma-2 dataTableStyle"
          id="testTable"
          :height="tableHeight"
          fixed-header
          color="green"
          items-per-page-text="表示数"
          :items-per-page="50"
        >
          <template v-slot:headers="{ columns }">
            <tr>
              <template v-for="column in columns" :key="column.key">
                <th :colspan="column.cols" :rowspan="column.row">
                  {{ column.title }}
                </th>
              </template>
            </tr>
            <tr>
              <template v-for="column in columns" :key="column.key">
                <th class="text-center" v-if="column.key == 'PFS'">
                  ステータス
                </th>
                <th class="text-center" v-if="column.key == 'PFS'">
                  行動価値適合度
                </th>
                <th class="text-center" v-if="column.key == 'PFS'">
                  ストレス強制レベル
                </th>
              </template>
            </tr>
          </template>
          <template v-slot:item="{ item, index }">
            <tr>
              <td width="40">{{ index + 1 }}</td>
              <td width="80">{{ item.email }}</td>
              <td class="text-xs-right">{{ item.name }}</td>
              <td class="text-xs-right">{{ item.kana }}</td>
              <td class="text-xs-right">{{ item.birth }}</td>
              <td class="text-xs-right text-center">{{ item.passText }}</td>
              <ExamPfsView
                :endtime="item.endtime"
                :level="item.level"
                :lv="item.lv"
              ></ExamPfsView>
            </tr>
          </template>
        </v-data-table>
        <div class="pa-2">
          <div class="d-flex">
            <csvDownload text="CSVダウンロード"></csvDownload>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss">
.v-data-table-footer {
  justify-content: flex-start;
}
#divoverflow {
  overflow-x: hidden;
}
</style>
