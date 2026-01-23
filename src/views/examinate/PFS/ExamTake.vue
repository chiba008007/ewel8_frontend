<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import { EXAMS } from "@/plugins/const";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ExamPage from "./ExamPage.vue";
import ExamQuestion from "./ExamQuestion.vue";
import ButtonView from "@/components/ButtonView.vue";
import exampfs from "@/plugins/exampfs";
import ExamApiService from "@/services/ExamApiService";
const router = useRouter();
const route = useRoute();
const page = ref(Number(route.params.page));

const k = route.query.k;
const testparts_id = route.params.testparts_id;
const disabledFlag = ref(true);
const examObj = exampfs();
const questions = ref();
const selectPoint = reactive<Record<number, number>>({});

const examObjct = {
  questions: [
    examObj.questions.question1,
    examObj.questions.question2,
    examObj.questions.question3,
    examObj.questions.question4,
  ],
};
// 回答選択
const setLoop = () => {
  disabledFlag.value = false;

  const start = (page.value - 1) * 10 + 1;
  const end = page.value == 4 ? questions.value?.length : page.value * 10;
  for (let i = start; i <= end; i++) {
    if (!(i in selectPoint)) {
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
    code: EXAMS.PFS,
  });
};
const onMenuBack = () => {
  if (page.value <= 1) return;
  router.push({
    name: "examPfsTake",
    params: {
      testparts_id,
      page: page.value - 1,
    },
    query: { k },
  });
};

const loadAnswer = async () => {
  const res = await ExamApiService.getPFS({
    params: k,
    testparts_id: testparts_id,
  });
  if (!res) return;

  const data = res.data as Record<string, number>;
  for (let i = 1; i <= 36; i++) {
    selectPoint[i] = data["q" + i];
  }
};

onMounted(loadAnswer);
</script>

<template>
  <ExamTitle @enabledTest="(e) => enabledTest(e)" />
  <v-container fluid class="mt-0" v-if="enabledFlag">
    <ExamParts />
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
      :text="page == 4 ? `完了` : `次のページ`"
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
