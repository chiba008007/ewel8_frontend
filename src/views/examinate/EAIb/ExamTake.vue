<script setup lang="ts">
import { ref, watch, reactive, onMounted } from "vue";
import { EXAMS } from "@/plugins/const";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ExamPage from "./ExamPage.vue";
import ExamQuestion from "./ExamQuestion.vue";
import ButtonView from "@/components/ButtonView.vue";
import examEAIB from "@/plugins/examEAIB";
import ExamEAIBApiService from "@/services/EAIB/ExamEAIBApiService";
import { startCountdown } from "@/plugins/timer";
import type { EAIBQuestion } from "@/constants/eaibQuestions";

const router = useRouter();
const route = useRoute();

const page = ref(Number(route.params.page));
const k = route.query.k;
const testparts_id = route.params.testparts_id;

const disabledFlag = ref(true);
const enabledFlag = ref(false);
const timer = ref("");

const examObj = examEAIB();

// 現在ページの設問
const questions = ref<EAIBQuestion[]>([]);

// 選択済み回答
const selectPoint = reactive<Record<number, number>>({});

// 現在ページの全設問に回答済みか確認する
const setLoop = () => {
  // 現在ページに含まれる回答キーを取得
  const answerKeys = questions.value.flatMap((question) =>
    question.ans.map((row) => row.key)
  );

  // 未回答が1件でもあれば次へボタンを無効化
  disabledFlag.value =
    answerKeys.length === 0 ||
    answerKeys.some((key) => selectPoint[key] == null);
};

// ページ番号から設問を取得する
const setQuestions = () => {
  const pageQuestions = examObj.questions[page.value];

  if (!pageQuestions) {
    router.replace({ name: "error" });
    return;
  }

  questions.value = pageQuestions;
  setLoop();
};

// ページ切替を監視する
watch(
  () => route.params.page,
  (newPage) => {
    page.value = Number(newPage);
    setQuestions();
  },
  {
    immediate: true,
  }
);

// 回答を保存する
const onclick = (key: number, point: number) => {
  selectPoint[key] = point;
  setLoop();
};

// 試験表示を有効にする
const enabledTest = (enabled: boolean) => {
  enabledFlag.value = enabled;
};

// 次のページへ進む
const handleNext = () => {
  examObj.onStart({
    testparts_id,
    params: k,
    page: page.value + 1,
    selectPoint,
    code: EXAMS.EAIb,
  });
};

// 前のページへ戻る
const onMenuBack = async () => {
  const previousPage = Number(route.params.page) - 1;

  if (previousPage < 1) {
    return;
  }

  await router.push({
    // 現在のルート名を使用する
    name: route.name as string,

    // 必須パラメータを維持してpageだけ変更する
    params: {
      ...route.params,
      page: String(previousPage),
    },

    // kなどのクエリを維持する
    query: {
      ...route.query,
    },
  });
};

// 保存済み回答を取得する
const loadAnswer = async () => {
  // 保存済み回答を取得
  const res = await ExamEAIBApiService.getEAIB({
    params: k,
    testparts_id,
    page: page.value,
  });

  // falseを除外する
  if (res === false || !res.data) {
    return;
  }

  if (!res?.data) {
    return;
  }

  // 先にタイマーを開始する
  startCountdown(
    res.data.limittime,
    (time: string) => {
      timer.value = time;
    },
    () => {
      router.push({ name: "examList" });
    }
  );

  const requestedPage = Number(route.params.page);
  const currentPage = Number(res.data.current_page ?? 1);

  // 未到達ページへ直接移動した場合は進行可能ページへ戻す
  if (requestedPage > currentPage) {
    await router.replace({
      name: "examEAIbTake",
      params: {
        testparts_id,
        page: currentPage,
      },
      query: { k },
    });

    return;
  }

  const data = res.data as Record<string, number | undefined>;

  // 保存済み回答を反映
  for (let i = 1; i <= 143; i++) {
    const answer = data[`q${i}`];

    if (answer != null) {
      selectPoint[i] = answer;
    }
  }

  setLoop();
};

onMounted(loadAnswer);
</script>

<template>
  <ExamTitle @enabledTest="enabledTest" />

  <v-container v-if="enabledFlag" fluid class="mt-0">
    <ExamParts />

    <div class="text-right">{{ timer }}</div>

    <ExamPage :page="page" />

    <ExamQuestion
      :questions="questions"
      :selectPoint="selectPoint"
      @onClick="onclick"
    />

    <ButtonView
      v-if="page > 1"
      class="mt-3"
      text="前のページに戻る"
      color="red"
      @onClick="onMenuBack"
    />

    <ButtonView
      class="mt-3 ml-2"
      :text="page === 32 ? '完了' : '次のページ'"
      color="blue"
      :disabled="disabledFlag"
      @onClick="handleNext"
    />
  </v-container>
</template>

<style lang="scss">
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
