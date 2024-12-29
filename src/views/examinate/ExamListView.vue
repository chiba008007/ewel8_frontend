<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentAlert from "@/components/AlertView.vue";
import ComponentRadio from "@/components/RadioView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import TestApiService from "@/services/TestApiService";
import ExamApiService from "@/services/ExamApiService";
import { useRouter } from "vue-router";

const tab = ref(1);
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
ExamApiService.getTestExamMenu(params).then(function (rlt) {
  console.log(rlt);
  examList.value = rlt?.data;
  let done = 0;
  rlt?.data.map(function (val: object | any) {
    console.log(val);
    if (val.examstatus == 1) done += 1;
  });
  testLength.value = rlt?.data.length - done;
});

const registerAnswer = () => {
  console.log(answerList.value);
  successAlertFlag.value = true;
};

const test_id = ref(0);
const setExamData = (e: object | any) => {
  test_id.value = e.id;
};
const openTest = (code: string, testparts_id: number) => {
  let name = "";
  if (code == "PFS") name = "examPfsGuide";
  if (name == "") alert("error");
  router.push({
    name: name,
    params: { testparts_id: testparts_id },
    query: { k: k },
  });
};
</script>

<template>
  <ExamTitle :loginflag="false" @onTest="(e) => setExamData(e)" />
  <!--
  <v-tabs v-model="tab" align-tabs="center" color="primary">
    <v-tab :value="1">検査一覧</v-tab>
    <v-tab :value="2">アンケート</v-tab>
  </v-tabs>
-->

  <v-container>
    <div class="text-h6 mb-4">検査選択メニュー</div>
    <div class="mb-4 text-left">
      <div>
        受検して頂く検査は{{ testLength }}つです。<br />
        下記の検査名をクリックして検査をはじめて下さい。
      </div>
      <div>
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
    <div class="text-center w-100 ma-auto">
      <iframe
        width="100%"
        height="200"
        src="https://www.youtube.com/embed/rxKmGgpWibc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen="true"
      ></iframe>
    </div>
  </v-container>
</template>
