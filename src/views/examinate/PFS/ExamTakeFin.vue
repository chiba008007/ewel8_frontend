<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamParts from "@/components/ExamParts.vue";

import ButtonView from "@/components/ButtonView.vue";
const router = useRouter();

const k = router.currentRoute.value.query.k;

const onMenuBack = () => {
  router.push({
    name: "examList",
    query: { k: k },
  });
};
</script>

<template>
  <ExamTitle />
  <ExamParts />
  <v-container fluid class="mt-0">
    <p>
      お疲れ様でした。以上で検査終了となります。<br />未受検の検査がないかメニュー画面に移動し、確認してください。
    </p>

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
