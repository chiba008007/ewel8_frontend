<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import TestApiService from "@/services/TestApiService";
import UserApiService from "@/services/UserApiService";
import pankuzuTest from "../components/pankuzuTest.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import csvDownload from "@/components/csvDownload.vue";
import ExamPfsView from "@/components/ExamPfsView.vue";
import ExamBAJ3View from "@/components/ExamBAJ3View.vue";
import { passArray, d_Path } from "@/plugins/const";
import ButtonView from "@/components/ButtonView.vue";
import ComponentImg from "@/components/imgView.vue";
import { pfsOutput } from "@/plugins/PDF/pfs";
import { pdfDownload } from "@/plugins/pdf";

const pdfcode = ref();
const onPDfOutput = (id: number, code: string, birth: string) => {
  pdfcode.value = id;
  pdfDownload(id, code, birth);
};

const headers = ref([
  { title: "番号", sortable: false, key: "no", cols: 1, row: 2, width: "20px" },
  { title: "ID", sortable: true, key: "email", cols: 1, row: 2, width: "30px" },
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
const testCount = ref(0);
const tableWidth = ref("100%");
TestApiService.getTestTableTh(tmp).then(function (rlt) {
  testCount.value = rlt.data.length;
  tableWidth.value = 1600 + 200 * testCount.value + "px";
  rlt.data.forEach((x: typeof typed) => {
    if (x.code === "PFS" || x.code === "BAJ3") {
      headers.value.push({
        title: x.code,
        sortable: false,
        key: x.code,
        cols: 3, //pfs用
        row: 1, //pfs用
      });
    }
  });

  headers.value.push(
    { title: "メモ1", sortable: false, key: "no", cols: 1, row: 2 },
    { title: "メモ2", sortable: false, key: "no", cols: 1, row: 2 },
    { title: "PDF", sortable: false, key: "no", cols: 1, row: 2 },
    { title: "機能", sortable: false, key: "no", cols: 1, row: 2 }
  );
});

TestApiService.getExam(tmp).then(function (rlt) {
  detail.value = rlt;
  // title.value = detail.value.data.detail.testname;
  examList.value = detail.value.data.exams;
  examList.value.map((value: any, k: number) => {
    examList.value[k]["passText"] = (passArray as any)[value.passflag];
  });
});

const tableHeight = ref(100);
const dialogFlag = ref(false);
const pfsDialogText = ref({
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  text5: "",
});
const pfsDialog = (e: number) => {
  let tmp = {
    exam_id: e,
    testparts_id: params.testid,
  };
  TestApiService.getPFSTestDetail(tmp).then((rlt) => {
    pfsDialogText.value.text1 = rlt.data[0];
    pfsDialogText.value.text2 = rlt.data[1];
    pfsDialogText.value.text3 = rlt.data[2];
    pfsDialogText.value.text4 = rlt.data[3];
    pfsDialogText.value.text5 = rlt.data[4];
  });
  dialogFlag.value = true;
};
const baj3Dialog = (e: number) => {
  alert("BAJ3");
  /*
  let tmp = {
    exam_id: e,
    testparts_id: params.testid,
  };
  TestApiService.getPFSTestDetail(tmp).then((rlt) => {
    pfsDialogText.value.text1 = rlt.data[0];
    pfsDialogText.value.text2 = rlt.data[1];
    pfsDialogText.value.text3 = rlt.data[2];
    pfsDialogText.value.text4 = rlt.data[3];
    pfsDialogText.value.text5 = rlt.data[4];
  });
  dialogFlag.value = true;
  */
};

const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 320;
};

const dialog = ref(false);
</script>
<template>
  <PartnerAdmin coded="customer" />
  <pankuzuTest
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref2="{ pageName: 'testExamList' }"
  ></pankuzuTest>
  <div class="text-center pa-4" v-if="dialogFlag">
    <v-dialog v-model="dialogFlag" width="auto">
      <v-card max-width="400" class="pa-4">
        <p>{{ pfsDialogText.text1 }}</p>
        <p class="text-center">{{ pfsDialogText.text2 }}</p>
        <p class="text-center">{{ pfsDialogText.text3 }}</p>
        <p class="text-center">
          <ComponentImg
            v-if="pfsDialogText.text4"
            :maxHeight="140"
            :src="require('@/assets/exam/pfs/' + pfsDialogText.text4)"
          ></ComponentImg>
        </p>
        <p>{{ pfsDialogText.text5 }}</p>
      </v-card>
    </v-dialog>
  </div>

  <div id="divoverflow">
    <v-row v-resize="onResize" style="width: auto">
      <v-col class="ma-1" style="overflow: scroll">
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
          :style="`min-width:` + tableWidth"
        >
          <template v-slot:headers="{ columns }">
            <tr>
              <template v-for="column in columns as any" :key="column.key">
                <th
                  :colspan="column.cols"
                  :rowspan="column.row"
                  class="text-center"
                >
                  {{ column.title }}
                </th>
              </template>
            </tr>
            <tr>
              <template v-if="columns.some((column) => column.key === 'PFS')">
                <th class="text-center">ステータス</th>
                <th class="text-center">行動価値適合度</th>
                <th class="text-center">ストレス強制レベル</th>
              </template>
              <template v-if="columns.some((column) => column.key === 'BAJ3')">
                <th class="text-center">ステータス</th>
                <th class="text-center">行動価値適合度</th>
                <th class="text-center">ストレス強制レベル</th>
              </template>
            </tr>
          </template>
          <template v-slot:item="{ item, index }">
            <tr>
              <td width="40">{{ index + 1 }}</td>
              <td width="80">{{ (item as any).email }}</td>
              <td class="text-xs-right">{{ (item as any).name }}</td>
              <td class="text-xs-right">{{ (item as any).kana }}</td>
              <td class="text-xs-right">{{ (item as any).birth }}</td>
              <td class="text-xs-right text-center">
                {{ (item as any).passText }}
              </td>
              <ExamPfsView
                v-if="headers.some((item) => item.title === 'PFS')"
                :endtime="((item as any)['pfs']).endtime"
                :id="((item as any)['pfs'] ).id"
                :level="((item as any)['pfs'] ).level"
                :lv="((item as any)['pfs'] ).lv"
                @onClick="(e:any) => pfsDialog(e)"
              ></ExamPfsView>
              <ExamBAJ3View
                v-if="headers.some((item) => item.title === 'BAJ3')"
                @onClick="(e:any) => baj3Dialog(e)"
              ></ExamBAJ3View>
              <td class="text-xs-right text-center">
                {{ (item as any).memo1 }}
              </td>
              <td class="text-xs-right text-center">
                {{ (item as any).memo2 }}
              </td>
              <td class="text-xs-right text-center">未出力</td>
              <td class="text-xs-right text-center d-flex pt-3 justify-center">
                <ButtonView
                  text="更新"
                  variant="tonal"
                  density="compact"
                  color="primary"
                ></ButtonView>
                <ButtonView
                  :disabled="(item as any).endtime ? false : true"
                  text="PDF"
                  variant="tonal"
                  density="compact"
                  color="success"
                  class="ml-1"
                  @onClick="
                    onPDfOutput(
                      (item as any).id,
                      (item as any).email,
                      (item as any).birth
                    )
                  "
                ></ButtonView>
                <ButtonView
                  text="証書"
                  variant="tonal"
                  density="compact"
                  color="purple"
                  class="ml-1"
                ></ButtonView>
              </td>
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
  overflow: hidden;
}
</style>
