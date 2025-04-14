<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";

import ButtonView from "@/components/ButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import CardView from "@/components/CardView.vue";
import exampfs from "@/plugins/exampfs";
const router = useRouter();
const route = useRoute();
const examObj = exampfs();
const testparts_id = route.params.testparts_id as unknown as number;
const k = router.currentRoute.value.query.k as string;

const result = ref({
  text1: "",
  text2: "",
  text3: "",
  text4: "",
  image: "",
});
examObj.getPFS(k, testparts_id).then((res) => {
  console.log(res);
  result.value.text1 = res.result[0];
  result.value.text2 = res.result[1];
  result.value.text3 = res.result[2];
  result.value.text4 = res.result[4];
  result.value.image = res.result[3];
});

const resultFlag = ref();
const onResultFlag = (e: number) => {
  resultFlag.value = e;
};
const onMenuBack = () => {
  router.push({
    name: "examList",
    query: { k: k },
  });
};
const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};
</script>

<template>
  <ExamTitle
    @onResultFlag="(e) => onResultFlag(e)"
    @enabledTest="(e) => enabledTest(e)"
  />
  <v-container fluid class="mt-0" v-if="enabledFlag">
    <ExamParts />
    <CardView
      v-if="resultFlag != 1"
      style="white-space: pre-wrap"
      :text1="`お疲れ様でした。以上で検査終了となります。
未受検の検査がないかメニュー画面に移動し、確認してください。`"
    ></CardView>

    <CardView
      v-else
      :text1="result.text1"
      :text2="result.text2"
      :text3="result.text3"
      :text4="result.text4"
      :image="result.image"
    >
    </CardView>

    <AlertView
      class="mt-3"
      type="warning"
      style="white-space: pre-wrap"
      :text="`注意：通信等の問題でまれに受検終了していないことがあります。
必ずメニュー画面に戻り、未受検検査がないか確認してください。`"
    ></AlertView>

    <ButtonView
      class="mt-3"
      text="メニューに戻る"
      :color="`blue`"
      @onClick="onMenuBack()"
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
