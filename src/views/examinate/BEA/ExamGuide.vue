<script setup lang="ts">
import { ref, onMounted } from "vue";
import { EXAMS } from "@/plugins/const";
import { useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ButtonView from "@/components/ButtonView.vue";
import exambea from "@/plugins/examBEA";
import { setStartTime } from "@/plugins/examStartTime";
import { onMenuBack } from "@/plugins/menuBack";
import { useRouter } from "vue-router";
import { examTestParts } from "@/services/VFJ/examPersonName";

const router = useRouter();
const route = useRoute();
const k = route.query.k;
const examObj = exambea();
const testparts_id = route.params.testparts_id;
const page = ref(1);
const timelimit = ref(0);
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
    code: EXAMS.BEA,
  });
};

onMounted(async () => {
  const rlt = await examTestParts();
  timelimit.value = rlt.timelimit;
});
</script>

<template>
  <ExamTitle @enabledTest="(e) => enabledTest(e)" />

  <v-container class="pa-0 ma-0 px-4" fluid v-if="enabledFlag">
    <ExamParts class="mt-0" />

    <ol class="ml-6 mt-3 w-100">
      <li>
        各質問に対し、ご自身が感じる「自社の状況」や「仕事に関するご自身の考えや状況」にあった回答を選択肢の中から選択してください。
      </li>
      <li>回答を入力しないと次ページに進めません。</li>
      <li>
        ブラウザの「戻る」ボタンは使えません。ページ下部の「1つ前のページに戻る」で、1ページ前にだけ戻れます。
      </li>
      <li>設問は106問で、受検時間の目安は10分です。</li>
      <li>
        受検の制限時間は
        {{ timelimit }}
        分です。各ページの右上に残り時間が表示されます。この値が0になるとその時点で強制ログアウトされます。
      </li>
      <li>
        検査の途中で何らかの原因によりログアウトされた場合や、検査を途中で中断された場合は、
        再度ログインし直し、前回回答したところからご受検頂けます。
      </li>
      <li>
        当社は、個人情報を適切な方法で管理し、お客様および受検者の同意なく、第三者に対し開示することはありません。<br />
        ただし、研究開発または統計分析を目的として、
        受検者に関する検査結果を含む個人情報を、
        個人が識別または特定できないように編集加工し、無償で利用する場合があります。
      </li>
      <li>
        上記をお読みいただいた上で同意頂ける方は、『検査を開始する』をクリックして回答画面にお進みください。
      </li>
    </ol>

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
