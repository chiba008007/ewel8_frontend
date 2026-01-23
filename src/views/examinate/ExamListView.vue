<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamApiService from "@/services/ExamApiService";
import { useRouter } from "vue-router";
import { pdfDownload } from "@/plugins/pdf";

const tab = ref("one");
const examList = ref();
const answerList = ref({
  1: { value: 0 },
  2: { value: 0, comment: "" },
  3: { value: 0 },
  4: { value: 0 },
  5: { value: 0, comment: "" },
  6: { value: 0, comment: "" },
});
const validForm = ref(false);
const successAlertFlag = ref(false);

const router = useRouter();
const k = router.currentRoute.value.query.k;
let params = {
  params: k,
};
const testLength = ref(0);
const testLengthFlag = ref(false);

const movietype = ref(0);
const moviedisplayurl = ref();
// ExamApiService.getTestExamMenu(params).then(function (rlt) {
//   examList.value = rlt?.data;
//   movietype.value = rlt?.data[0].movietype;
//   moviedisplayurl.value = rlt?.data[0].moviedisplayurl;
//   let done = 0;
//   rlt?.data.map(function (val: object | any) {
//     if (val.examstatus == 1) done += 1;
//   });
//   testLength.value = rlt?.data.length - done;
//   testLengthFlag.value = true;
// });

ExamApiService.getTestExamMenu(params).then((rlt) => {
  if (!Array.isArray(rlt?.data)) {
    return;
  }

  const list = rlt.data;

  examList.value = list;

  if (list.length > 0) {
    movietype.value = list[0].movietype;
    moviedisplayurl.value = list[0].moviedisplayurl;
  }

  let done = 0;
  list.forEach((val: any) => {
    if (val.examstatus === 1) done += 1;
  });

  testLength.value = list.length - done;
  testLengthFlag.value = true;
});

const registerAnswer = () => {
  console.log(answerList.value);
  successAlertFlag.value = true;
};

const test_id = ref(0);
const examlistdownloadflag = ref(0);
const enqflag = ref(0);

const setExamData = (e: object | any) => {
  console.log(e);
  test_id.value = e.id;
  examlistdownloadflag.value = e.examlistdownloadflag;
  enqflag.value = e.enqflag;
};
const openTest = (code: string, testparts_id: number) => {
  let name = "";
  if (code == "PFS") name = "examPfsGuide";
  if (name == "") alert("error");
  router
    .push({
      name: name,
      params: { testparts_id: testparts_id },
      query: { k: k },
    })
    .then(() => {
      window.location.reload();
    });
};

const onDownload = () => {
  ExamApiService.downloadExam({}).then(function (rlt) {
    pdfDownload(rlt.data.id, rlt.data.code, rlt.data.decript);
  });
};
const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};
</script>

<template>
  <ExamTitle
    :loginflag="false"
    @onTest="(e) => setExamData(e)"
    @enabledTest="(e) => enabledTest(e)"
  />

  <v-tabs v-model="tab" align-tabs="center" color="primary" v-if="enqflag">
    <v-tab value="one">検査一覧</v-tab>
    <v-tab value="two">アンケート</v-tab>
  </v-tabs>

  <v-container v-if="enabledFlag">
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="one">
        <div class="text-h6 mb-4">検査選択メニュー</div>
        <div class="mb-4 text-left" v-if="testLengthFlag">
          <div v-if="testLength != 0">
            受検して頂く検査は{{ testLength }}つです。<br />
            下記の検査名をクリックして検査をはじめて下さい。
          </div>
          <div v-if="testLength === 0">
            すべての検査が完了しました。<br />
            おつかれさまでした。
          </div>
        </div>
        <div class="text-left mb-4">
          <ComponentButton
            v-for="exam in examList"
            :key="exam.testparts_id"
            :text="exam.code"
            color="primary"
            class="w-100 mb-2"
            :status="exam.examstatus ? 1 : ''"
            :disabled="exam.examstatus ? true : false"
            @onClick="openTest(exam.code, exam.testparts_id)"
          ></ComponentButton>
        </div>

        <v-card
          subtitle="検査結果ダウンロード"
          variant="tonal"
          v-if="examlistdownloadflag && testLength == 0"
        >
          <v-card-text>
            下記のボタンを押し、検査結果をダウンロードしてください。<br />
            ※ダウンロードができない場合は主管部門にお問い合わせてください。
            <p class="mt-3 text-caption text-red">
              ■注意<br />
              ダウンロードしたファイルをご自身のPCに保存し、結果を確認してください。
              ブラウザで確認した場合、表示が乱れる可能性があります。
            </p>
          </v-card-text>
          <v-card-actions class="mx-3">
            <ComponentButton
              text="ダウンロード"
              class="bg-green w-100"
              variant="tonal"
              @onClick="onDownload()"
            ></ComponentButton>
          </v-card-actions>
        </v-card>

        <div
          class="text-center w-100 ma-auto"
          v-if="
            (movietype == 1 && moviedisplayurl) ||
            (movietype == 2 && testLength === 0 && moviedisplayurl)
          "
        >
          <iframe
            width="100%"
            height="400"
            :src="moviedisplayurl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen="true"
          ></iframe>
        </div>
      </v-tabs-window-item>
      <v-tabs-window-item value="two">bb</v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
