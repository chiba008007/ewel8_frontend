<script setup lang="ts">
import { ref, onMounted } from "vue";
import { EXAMS } from "@/plugins/const";
import { useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ButtonView from "@/components/ButtonView.vue";
import examvfj from "@/plugins/examVFJ";
import { setStartTime } from "@/plugins/examStartTime";
import { onMenuBack } from "@/plugins/menuBack";
import { useRouter } from "vue-router";
//import ExamApiService from "@/services/ExamApiService";
import { examPersonName } from "@/services/VFJ/examPersonName";
import "@/assets/styles/question_menu.scss";

const router = useRouter();
const route = useRoute();
const k = route.query.k;
const examObj = examvfj();
const testparts_id = route.params.testparts_id;
const heads = examObj.heads;
const page = ref(1);
const name = ref("");
examObj.checkStatus(testparts_id, k);
setStartTime();

const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};

const handleStart = () => {
  examObj.onStart({
    testparts_id,
    params: k,
    page: page.value,
    selectPoint: {},
    code: EXAMS.VFJ,
  });
};

onMounted(async () => {
  name.value = await examPersonName();
});
</script>

<template>
  <ExamTitle @enabledTest="(e) => enabledTest(e)" />

  <v-container class="pa-0 ma-0 px-4" fluid v-if="enabledFlag">
    <ExamParts class="mt-0" />
    <p>
      本検査は、貴社の組織に所属する{{
        name
      }}として、リスクの高い人材を明確にするための検査です。<br />
      貴社の{{ name }} として、
      AとBの行動のどちらを取って欲しくないですか。取って欲しくない行動を想定し、設問に回答してください。
    </p>
    <ol class="ml-6 mt-3 w-100">
      <li>回答を入力しないと次ページに進めません。</li>
      <li>
        ブラウザの戻るボタンは使えません。ページ下部の「戻る」で、前のページに戻れます。
      </li>
      <li>質問は、全部で66問あります。受検時間の目安は20分です。</li>
      <li>
        1つの質問には「A」と「B」の２つの文があります。「A」と「B」を比較して、当てはまる程度を選択し、1個所だけチェックをして下さい。
      </li>
      <li>
        検査を途中終了した場合は、再度ログインし直してください。検査は最初から表示されますが、前回の回答が記入されておりますので、途中からご受検頂けます。
      </li>
      <li>
        検査の途中で何らかの原因によりログアウトされた場合や、検査を中断された場合は、再度ログインし直してください。
      </li>
    </ol>
    <hr />
    <p class="mt-3">
      ※ 例
      ：「責任逃れをする」社員が、「人の話を聞かない」社員より、リスクと強く感じる場合は「明確にA」にチェックをしてください。
    </p>
    <div class="table-display mt-2">
      <div class="table-row hques bg-blue pc">
        <div class="table-col text-center vertical-middle">A</div>
        <div class="table-col wAns-vfj" v-for="head in heads" :key="head.value">
          {{ head.label }}
        </div>
        <div class="table-col text-center vertical-middle">B</div>
      </div>

      <div class="table-row">
        <div class="table-col text-center vertical-middle">責任逃れをする</div>
        <div class="table-col wAns-vfj">
          <input type="radio" name="sample" />
        </div>
        <div class="table-col wAns-vfj">
          <input type="radio" name="sample" />
        </div>
        <div class="table-col wAns-vfj">
          <input type="radio" name="sample" />
        </div>
        <div class="table-col wAns-vfj">
          <input type="radio" name="sample" />
        </div>
        <div class="table-col text-center vertical-middle">
          人の話を聞かない
        </div>
      </div>
    </div>
    <ButtonView
      class="mt-3"
      text="メニューに戻る"
      :color="`red`"
      @onClick="onMenuBack(router, k)"
    ></ButtonView>
    <ButtonView
      class="mt-3"
      text="検査を開始する"
      :color="`blue`"
      :class="`ml-2`"
      @onClick="handleStart"
    ></ButtonView>
  </v-container>
</template>
