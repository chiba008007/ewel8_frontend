<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";

import ButtonView from "@/components/ButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import CardView from "@/components/CardView.vue";

const router = useRouter();
const route = useRoute();

const testparts_id = route.params.testparts_id as unknown as number;
const k = router.currentRoute.value.query.k as string;

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
  <v-container fluid class="mt-0">
    <ExamParts />
    <CardView
      v-if="resultFlag != 1"
      style="white-space: pre-wrap"
      :text1="`お疲れ様でした。以上で検査終了となります。
未受検の検査がないかメニュー画面に移動し、確認してください。`"
    ></CardView>

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
