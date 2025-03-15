<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ButtonView from "@/components/ButtonView.vue";
import exampfs from "@/plugins/exampfs";
import { setStartTime } from "@/plugins/examStartTime";

const router = useRouter();
const k = router.currentRoute.value.query.k;
const examObj = exampfs();
const route = useRoute();
const testparts_id = route.params.testparts_id;

const page = ref(1);
const onMenuBack = () => {
  router.push({
    name: "examList",
    query: { k: k },
  });
};
examObj.checkStatus(testparts_id, k);
setStartTime();
</script>

<template>
  <ExamTitle />
  <ExamParts />
  <v-container class="" fluid>
    <ol class="ml-3 w-100">
      <li>
        各設問に対し、現在のご自身が取るであろう傾向を選択肢の中から選択してください。
      </li>
      <li>質問は36問あります。受検時間の目安は10分です。</li>
      <li>回答を入力しないと次に進めません</li>
      <li>
        ブラウザの「戻る」ボタンは使えません。ページ下部の「戻る」ボタンで、前のページまで戻れます。
      </li>
      <li>
        <b
          >１つの質問には、AとBの２つの文があります。AとBを比較して、あなたに当てはまる程度を選択し、１つの質問に対し、１箇所のみチェックをしてください。</b
        >
      </li>
      <li>
        どちらにも当てはまっていない場合、あるいはまったく同じ程度当てはまっている場合には、「どちらともいえない」にチェックしてください。
      </li>
      <li>
        検査の途中で何らかの原因によりログアウトした場合や、検査を中断された場合は、再度ログインし直してください。
      </li>
      <li>
        本検査提供会社は、個人情報を適切な方法で管理し、お客様および受検者の同意なく、第三者に対し開示することはありません。ただし、研究開発または統計分析を目的として、
        受検者に関する検査結果を含む個人情報を、個人が識別または特定できないように編集加工し、無償で利用する場合があります。
      </li>
    </ol>
    <ButtonView
      class="mt-3"
      text="メニューに戻る"
      :color="`red`"
      @onClick="onMenuBack()"
    ></ButtonView>
    <ButtonView
      class="mt-3"
      text="検査を開始する"
      :color="`blue`"
      :class="`ml-2`"
      @onClick="examObj.onStart($route.params.testparts_id, k, page)"
    ></ButtonView>
  </v-container>
</template>
