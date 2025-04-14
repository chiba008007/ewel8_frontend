<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";
import ExamPage from "./ExamPage.vue";
import ExamQuestion from "./ExamQuestion.vue";
import ButtonView from "@/components/ButtonView.vue";
import exampfs from "@/plugins/exampfs";
const page = 4;
const router = useRouter();
const route = useRoute();
const k = router.currentRoute.value.query.k;

const disabledFlag = ref(true);
const examObj = exampfs();
const questions = examObj.questions.value.question4;
const testparts_id = route.params.testparts_id;
const onMenuBack = () => {
  router.push({
    name: "examPfsTake3",
    params: { testparts_id: testparts_id, page: page },
    query: { k: k },
  });
};
const selectPoint: { [key: string]: number } = {};
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
const setLoop = () => {
  disabledFlag.value = false;
  for (let i = 31; i <= 36; i++) {
    if (!selectPoint[i]) disabledFlag.value = true;
  }
};
const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};
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
      @onSelected="(e:object) => onSelected(e)"
      @onClick="(key:number, value:number) => onclick(key, value)"
    />
    <ButtonView
      class="mt-3"
      text="前のページに戻る"
      :color="`red`"
      @onClick="onMenuBack()"
    ></ButtonView>
    <ButtonView
      class="mt-3"
      text="完了"
      :color="`blue`"
      :class="`ml-2`"
      :disabled="disabledFlag"
      @onClick="
        examObj.onStart(
          $route.params.testparts_id,
          k,
          parseInt(page.toString()) + 1,
          selectPoint
        )
      "
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
