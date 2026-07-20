<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import { EXAMS } from "@/plugins/const";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ExamPage from "./ExamPage.vue";
import ExamQuestion from "./ExamQuestion.vue";
import ButtonView from "@/components/ButtonView.vue";
import examVFJ from "@/plugins/examVFJ";
import ExamVFJApiService from "@/services/VFJ/ExamVFJApiService";
const router = useRouter();
const route = useRoute();
const page = ref(Number(route.params.page));
const k = route.query.k;
const testparts_id = route.params.testparts_id;
const disabledFlag = ref(true);
const examObj = examVFJ();
const questions = ref();
const selectPoint = reactive<Record<number, number>>({});

const examObjct = {
  questions: [
    examObj.questions.question1,
    examObj.questions.question2,
    examObj.questions.question3,
    examObj.questions.question4,
    examObj.questions.question5,
    examObj.questions.question6,
    examObj.questions.question7,
  ],
};
// 回答選択
const setLoop = () => {
  disabledFlag.value = false;

  const start = (page.value - 1) * 10 + 1;
  const end =
    page.value == 7 ? start + questions.value?.length - 1 : page.value * 10;
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
  async (newPage) => {
    page.value = Number(newPage);
    setQuestions();

    // URLのページ変更時にもアクセス可否を確認する
    await loadAnswer();
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
  // 現在ページの設問範囲を取得する
  const start = (page.value - 1) * 10 + 1;
  const end = page.value === 7 ? 66 : page.value * 10;

  // 現在ページの回答だけを送信する
  const currentAnswers: Record<number, number> = {};

  for (let i = start; i <= end; i++) {
    currentAnswers[i] = selectPoint[i];
  }

  examObj.onStart({
    testparts_id,
    params: k,
    page: page.value + 1,
    selectPoint: currentAnswers,
    code: EXAMS.VFJ,
  });
};

const onMenuBack = () => {
  if (page.value <= 1) return;
  router.push({
    name: "examVFJTake",
    params: {
      testparts_id,
      page: page.value - 1,
    },
    query: { k },
  });
};

const loadAnswer = async () => {
  try {
    const res = await ExamVFJApiService.getVFJ({
      params: k,
      testparts_id,
      // 表示しようとしているページを送信する
      page: page.value,
    });

    const data = res.data as Record<string, number>;

    for (let i = 1; i <= 66; i++) {
      selectPoint[i] = data["q" + i];
    }

    setLoop();
  } catch (error) {
    // 先のページへ直接アクセスした場合
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      await router.replace({
        name: "examVFJTake",
        params: {
          testparts_id,
          page: error.response.data.allowed_page,
        },
        query: { k },
      });

      return;
    }

    await router.replace({ name: "error" });
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
      :text="page == 7 ? `完了` : `次のページ`"
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
