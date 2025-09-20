<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import TestApiService from "@/services/TestApiService";
import pankuzuMain from "../components/pankuzuMain.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import csvDownload from "@/components/csvDownload.vue";
import excelDownload from "@/components/excelDownload.vue";
import ExamPfsView from "@/components/ExamPfsView.vue";
import ExamBAJ3View from "@/components/ExamBAJ3View.vue";
import { passArray, examStatusArray } from "@/plugins/const";
import ButtonView from "@/components/ButtonView.vue";
import ComponentImg from "@/components/imgView.vue";
import { pdfDownload, onCertficate } from "@/plugins/pdf";
import { useStoreUser } from "@/store/user";
import ProgressView from "@/components/ProgressView.vue";
import AlertView from "@/components/AlertView.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import DateView from "@/components/DateView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";

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
  {
    title: "生年月日\n(年齢)",
    sortable: false,
    key: "birth",
    cols: 1,
    row: 2,
  },
  { title: "合否", sortable: false, key: "passflag", cols: 1, row: 2 },
]);
const subHeaders = ref<Record<string, string[]>>({
  PFS: ["ステータス", "行動価値適合度", "ストレス共生レベル"],
  BAJ3: ["ステータス", "行動価値適合度", "ストレス共生レベル"],
});

const totalCols = computed(() =>
  headers.value.reduce(
    (sum, col) => sum + (subHeaders.value[col.key]?.length || 1),
    0
  )
);

const router = useRouter();
const detail = ref();
const user = useStoreUser();
const loadingFlag = ref(true);
const today = new Date(); // 今日の日時
const oneYearAgo = new Date(today); // 今日をコピー
const pdfstartday = ref();
const pdfendday = ref();
const pdfuseflag = ref();
oneYearAgo.setFullYear(today.getFullYear() - 1); // ← ここで1年前にずらす

const yearStr = oneYearAgo
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "-");

const todayStr = today
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "-");

const startDate = ref(yearStr); // ← 1年前
const endDate = ref(todayStr); // ← 今日

const params = router.currentRoute.value.params;
let tmp = {
  user_id: params.id,
  test_id: params.testid,
  partner_id: user.getSession("partner_id"),
};
const typed = { code: "" };
const testCount = ref(0);
const tableWidth = ref("100%");
TestApiService.getTestTableTh(tmp)
  .then(function (rlt) {
    if (rlt.data.length === 0) {
      throw new Error("データが取得できませんでした");
    }
    testCount.value = rlt.data.length;
    // tableWidth.value = 1600 + 200 * testCount.value + "px";
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

    headers.value.push({
      title: "機能",
      sortable: false,
      key: "no",
      cols: 1,
      row: 2,
    });
  })
  .catch((e) => {
    console.log("TestMenu ERROR " + e);
    //window.location.reload();
    location.href = "/error";
  });

const pagetitle = ref("");
const originalExamList = ref<any[]>([]);
const filteredExamList = ref<any[]>([]);
const filterText = reactive({
  email: "",
  name: "",
  kana: "",
  examStatus: "",
  started_at: "",
  memo1: "",
  memo2: "",
});

onMounted(async () => {
  try {
    const rlt = await TestApiService.getTest({
      user_id: params.id,
      test_id: params.testid,
    });
    pagetitle.value = rlt.data.testname;
    pdfstartday.value = rlt.data.pdfstartday;
    pdfendday.value = rlt.data.pdfendday;
    pdfuseflag.value = rlt.data.pdfuseflag;
    TestApiService.getExam(tmp).then(function (rlt) {
      detail.value = rlt;

      // パスフラグを変換してからリストに設定
      const exams = rlt.data.exams.map((value: any, index: number) => ({
        ...value,
        originalIndex: index + 1,
        passText: (passArray as any)[value.passflag],
      }));
      originalExamList.value = exams;
      filteredExamList.value = exams;
      loadingFlag.value = false;
    });
  } catch (error) {
    console.error("APIエラー:", error);
  }
});

const isButtonDisabled = (item: any) => {
  const endedAt = (item as any).ended_at;

  if (pdfuseflag.value === 0) {
    // フラグが0のときは ended_at だけで判定
    return !endedAt; // ended_at がなければ disabled
  }

  if (pdfuseflag.value === 1) {
    // フラグが1のときは ended_at + 開始日 + 終了日の全部が必要
    const startDate = pdfstartday.value;
    const endDate = pdfendday.value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    const allSatisfied = !!endedAt && today >= start && today <= end;

    return !allSatisfied; // 全部満たしていないときに disabled
  }

  // 想定外の値ならとりあえず disabled
  return true;
};

const applyFilter = () => {
  filteredExamList.value = originalExamList.value.filter((item) => {
    const nameMatch = !filterText.name || item.name?.includes(filterText.name);
    const emailMatch =
      !filterText.email || item.email?.includes(filterText.email);
    const kanaMatch = !filterText.kana || item.kana?.includes(filterText.kana);

    const memo1Match =
      !filterText.memo1 || item.memo1?.includes(filterText.memo1);
    const memo2Match =
      !filterText.memo2 || item.memo2?.includes(filterText.memo2);

    // examStatus（数値化）
    const rawStatus = filterText.examStatus;
    const status =
      rawStatus === "" || rawStatus === undefined || rawStatus === null
        ? null
        : Number(rawStatus);
    let examStatusMatch = true;

    if (status === 0) {
      examStatusMatch = !item.started_at && !item.ended_at;
    } else if (status === 1) {
      examStatusMatch = !!item.started_at && !item.ended_at;
    } else if (status === 2) {
      examStatusMatch = !!item.started_at && !!item.ended_at;
    } else if (status === 3) {
      examStatusMatch = true; // 未指定: フィルタ無効
    }
    let startedAtMatch = true;
    if (item.started_at && startDate.value && endDate.value) {
      const itemDate = item.started_at.slice(0, 10);
      startedAtMatch = itemDate >= startDate.value && itemDate <= endDate.value;
    }

    return (
      nameMatch &&
      emailMatch &&
      kanaMatch &&
      examStatusMatch &&
      startedAtMatch &&
      memo1Match &&
      memo2Match
    );
  });
};
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

const onCsvUpload = () => {
  router.push({
    name: "testExamListCsvupload",
    params: { id: params.id, testid: params.testid },
  });
};
const onPdfDownload = () => {
  router.push({
    name: "testExamListPdf",
    params: { id: params.id, testid: params.testid },
  });
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customer" />
  <pankuzuMain
    :adminhref="{
      pageName: 'testList',
      href: 'testLists',
      params: { id: params.id },
    }"
    :adminhref2="{ pageName: 'testExamList' }"
  ></pankuzuMain>

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
    <AlertView :border="`top`" color="green" :text="pagetitle"></AlertView>

    <v-row v-resize="onResize" style="width: auto">
      <v-col class="ma-1" style="overflow: scroll">
        <v-card class="pa-3 ma-2">
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="2">
                ID
                <TextFieldView
                  density="compact"
                  @onKeyup="(e) => (filterText.email = e)"
                ></TextFieldView>
              </v-col>
              <v-col cols="2">
                氏名
                <TextFieldView
                  density="compact"
                  @onKeyup="(e) => (filterText.name = e)"
                ></TextFieldView>
              </v-col>
              <v-col cols="2">
                ふりがな
                <TextFieldView
                  density="compact"
                  @onKeyup="(e) => (filterText.kana = e)"
                ></TextFieldView>
              </v-col>
              <v-col cols="2">
                ステータス
                <SelectFieldView
                  :items="examStatusArray"
                  :text="filterText.examStatus"
                  @onChange="(e) => (filterText.examStatus = e)"
                ></SelectFieldView>
              </v-col>
              <v-col cols="2">
                受検日(開始)
                <DateView
                  v-model:value="startDate"
                  name="start"
                  density="compact"
                />
              </v-col>
              <v-col cols="2">
                受検日(終了)
                <DateView
                  v-model:value="endDate"
                  name="end"
                  :min="startDate"
                  density="compact"
                />
              </v-col>
              <v-col cols="5">
                メモ1
                <TextFieldView
                  density="compact"
                  @onKeyup="(e) => (filterText.memo1 = e)"
                ></TextFieldView>
              </v-col>
              <v-col cols="5">
                メモ2
                <TextFieldView
                  density="compact"
                  @onKeyup="(e) => (filterText.memo2 = e)"
                ></TextFieldView>
              </v-col>
              <v-col cols="2" class="text-right">
                <ButtonView
                  text="検索"
                  class="bg-blue mt-5 w-50"
                  @onClick="applyFilter"
                ></ButtonView>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-data-table
          :headers="headers"
          :items="filteredExamList"
          class="listable ma-2 dataTableStyle"
          id="testTable"
          :height="tableHeight"
          fixed-header
          color="green"
          items-per-page-text="表示数"
          :items-per-page="50"
          :style="`min-width:` + tableWidth"
          no-data-text=""
        >
          <template v-slot:headers="{ columns }">
            <tr>
              <template v-for="column in columns as any" :key="column.key">
                <th
                  :colspan="column.cols"
                  :rowspan="column.row"
                  class="text-center"
                  style="white-space: pre-line"
                >
                  {{ column.title }}
                </th>
              </template>
            </tr>
            <tr>
              <template v-for="col in columns" :key="col.key">
                <th
                  v-for="(sub, idx) in subHeaders[col.key as string] || []"
                  :key="`${col.key}-${idx}`"
                  class="text-center"
                >
                  {{ sub }}
                </th>
              </template>
            </tr>
          </template>
          <template v-slot:item="{ item, index }">
            <tr :class="index % 2 === 0 ? 'bg-light-gray' : ''">
              <td width="40" rowspan="2">{{ (item as any).originalIndex }}</td>
              <td width="80">{{ (item as any).email }}</td>
              <td class="text-xs-right">{{ (item as any).name }}</td>
              <td class="text-xs-right">{{ (item as any).kana }}</td>
              <td class="text-center">
                {{ (item as any).birth }}
                <div v-if="(item as any).birth">({{ (item as any).age }})</div>
              </td>
              <td class="text-xs-right text-center">
                {{ (item as any).passText }}
              </td>
              <ExamPfsView
                v-if="headers.some((item) => item.title === 'PFS')"
                :starttime="((item as any)['pfs']).starttime"
                :endtime="((item as any)['pfs']).endtime"
                :id="((item as any)['pfs'] ).id"
                :level="((item as any)['pfs'] ).level"
                :lv="((item as any)['pfs'] ).lv"
                @onClick="pfsDialog((item as any)['id'])"
              ></ExamPfsView>
              <ExamBAJ3View
                v-if="headers.some((item) => item.title === 'BAJ3')"
                @onClick="(e:any) => baj3Dialog(e)"
              ></ExamBAJ3View>
              <td class="text-xs-right text-center d-flex pt-3 justify-center">
                <ButtonView
                  text="更新"
                  variant="tonal"
                  density="compact"
                  color="primary"
                  @onClick="
                    router.push({
                      name: 'testExamEdit',
                      params: {
                        id: params.id,
                        test_id: params.testid,
                        exam_id: (item as any).id,
                      },
                    })
                  "
                ></ButtonView>
                <ButtonView
                  :disabled="isButtonDisabled(item)"
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
                  v-show="(item as any).lisencedownloadflag"
                  :disabled="(item as any).ended_at ? false : true"
                  text="証書"
                  variant="tonal"
                  density="compact"
                  color="purple"
                  class="ml-1"
                  @click="
                    onCertficate(
                      (item as any).id,
                      (item as any).email,
                      (item as any).birth
                    )
                  "
                ></ButtonView>
              </td>
            </tr>
            <tr :class="index % 2 === 0 ? 'bg-light-gray' : ''">
              <td :colspan="totalCols - 2" class="text-caption">
                <div v-if="item.memo1">メモ1: {{ item.memo1 }}</div>
                <div v-if="item.memo2">メモ2: {{ item.memo2 }}</div>
              </td>
              <td class="text-xs-right text-center">
                <span v-if="item.pdf_histories_count">出力済</span>
                <span v-else>未出力</span>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="pa-2">
          <div class="d-flex">
            <excelDownload text="エクセルダウンロード"></excelDownload>
            <csvDownload text="CSVダウンロード"></csvDownload>
            <ButtonView
              text="CSVアップロード"
              color="secondary"
              @onClick="onCsvUpload()"
            ></ButtonView>
            <ButtonView
              class="ml-2"
              text="PDF一括ダウンロード"
              color="secondary"
              @onClick="onPdfDownload()"
            ></ButtonView>
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
.bg-light-gray {
  background-color: #e7e5e5; /* ごく薄いグレー */
}
</style>
