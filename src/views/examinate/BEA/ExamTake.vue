<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import { EXAMS } from "@/plugins/const";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ExamPage from "./ExamPage.vue";
import ExamQuestion from "./ExamQuestion.vue";
import ButtonView from "@/components/ButtonView.vue";
import examBEA from "@/plugins/examBEA";
import ExamBEAApiService from "@/services/BEA/ExamBEAApiService";
import { startCountdown } from "@/plugins/timer";
const router = useRouter();
const route = useRoute();
const page = ref(Number(route.params.page));
const k = route.query.k;
const testparts_id = route.params.testparts_id;
const disabledFlag = ref(true);
const examObj = examBEA();
const questions = ref();
const selectPoint = reactive<Record<number, number>>({});
const timer = ref("");

const examObjct = {
  questions: [
    examObj.questions.question1,
    examObj.questions.question2,
    examObj.questions.question3,
    examObj.questions.question4,
    examObj.questions.question5,
    examObj.questions.question6,
    examObj.questions.question7,
    examObj.questions.question8,
    examObj.questions.question9,
    examObj.questions.question10,
    examObj.questions.question11,
  ],
};
// 回答選択
const setLoop = () => {
  disabledFlag.value = false;

  const start = (page.value - 1) * 10 + 1;
  const end =
    page.value == 11 ? start + questions.value?.length - 1 : page.value * 10;
  for (let i = start; i <= end; i++) {
    if (selectPoint[i] == null) {
      disabledFlag.value = true;
      break;
    }
  }
};
const setQuestions = () => {
  const q = examObjct.questions[page.value - 1];
  if (!q) {
    router.replace({ name: "error" });
    return;
  }
  questions.value = q;
  // 次へボタン状態を再計算
  setLoop();
};

setQuestions();
// ページ切替のためにroute.params.pageを監視する
watch(
  () => route.params.page,
  (newPage) => {
    page.value = Number(newPage);
    setQuestions();
    setLoop();
  }
);

const onSelected = (sel: any) => {
  sel.value.map(function (value: number, key: number) {
    if (key > 0) selectPoint[key] = value;
  });
  setLoop();
};
const onclick = (key: number, point: number) => {
  selectPoint[key] = point;
  setLoop();
};

const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};

const handleNext = () => {
  examObj.onStart({
    testparts_id,
    params: k,
    page: page.value + 1,
    selectPoint,
    code: EXAMS.VFJ,
  });
};
const onMenuBack = () => {
  if (page.value <= 1) return;
  router.push({
    name: "examBEATake",
    params: {
      testparts_id,
      page: page.value - 1,
    },
    query: { k },
  });
};

const loadAnswer = async () => {
  const res = await ExamBEAApiService.getBEA({
    params: k,
    testparts_id: testparts_id,
  });
  if (!res) return;

  startCountdown(
    res.data.limittime,
    (t: string) => {
      timer.value = t;
    },
    () => {
      router.push({ name: "examList" });
    }
  );

  const data = res.data as Record<string, number>;
  for (let i = 1; i <= 106; i++) {
    selectPoint[i] = data["q" + i];
  }

  setLoop();
};

onMounted(loadAnswer);
</script>

<template>
  <ExamTitle @enabledTest="(e) => enabledTest(e)" />
  <v-container fluid class="mt-0" v-if="enabledFlag">
    <ExamParts />
    <div class="text-right">{{ timer }}</div>
    <ExamPage :page="page" />
    <ExamQuestion
      :params="k"
      :testparts_id="testparts_id"
      :questions="questions"
      :selectPoint="selectPoint"
      @onSelected="(e:object) => onSelected(e)"
      @onClick="(key:number, value:number) => onclick(key, value)"
    />
    <ButtonView
      v-if="page > 1"
      class="mt-3"
      text="前のページに戻る"
      :color="`red`"
      @onClick="onMenuBack"
    ></ButtonView>
    <ButtonView
      class="mt-3"
      :text="page == 11 ? `完了` : `次のページ`"
      :color="`blue`"
      :class="`ml-2`"
      :disabled="disabledFlag"
      @onClick="handleNext"
    ></ButtonView>
  </v-container>
</template>
<style type="text\css" scss>
.pfs-table {
  border-collapse: collapse;
  th.min {
    width: 40px;
    padding: 5px;
    &.ver {
      writing-mode: vertical-rl;
      text-orientation: upright;
    }
  }
}
</style>
