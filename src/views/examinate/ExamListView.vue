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
  console.log(rlt.data);
  examList.value = rlt.data;
  testLength.value = rlt.data.length;
});
/*
// NOTE: サンプル検査データ
for (let i of [1, 2, 3]) {
  examList.value.push({
    id: i,
    title: `BA-J${i}`,
    isComplete: i === 3,
  });
}
*/

const registerAnswer = () => {
  console.log(answerList.value);
  successAlertFlag.value = true;
};

const test_id = ref(0);
const setExamData = (e: object | any) => {
  test_id.value = e.id;
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
    <div class="mb-4 text-center">
      <div>
        受検して頂く検査は{{ testLength }}つです。<br />
        下記の検査名をクリックして検査をはじめて下さい。
      </div>
      <div>
        すべての検査が完了しました。<br />
        おつかれさまでした。
      </div>
    </div>
    <div class="text-center mb-4">
      <v-btn
        v-for="exam in examList"
        :key="exam.testparts_id"
        color="primary"
        class="w-75 mb-2"
      >
        <span class="text-red mr-4">受検済み</span>
        {{ exam.code }}
      </v-btn>
    </div>
    <div class="text-center w-75 ma-auto">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/rxKmGgpWibc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen="true"
      ></iframe>
    </div>
  </v-container>
</template>
