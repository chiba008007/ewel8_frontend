<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const envcheckflag = ref();
const login_id = ref();
const k = router.currentRoute.value.query.k;
const pagemove = () => {
  router.push({ name: "examCheck", query: { k: k } }).then(() => {
    window.location.reload();
  });
};

const params = ref();

const setExamData = (rlt: any) => {
  params.value = rlt.params;
  envcheckflag.value = rlt.envcheckflag;
};

const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};
</script>

<template>
  <ExamTitle
    @onLoginId="(e) => (login_id = e)"
    @onTest="(e) => setExamData(e)"
    @enabledTest="(e) => enabledTest(e)"
  />

  <v-container>
    <div class="text-h6 font-weight-bold mb-4">動作環境チェック</div>
    <p class="mb-4">
      本検査受検前に、当ページで動作環境の確認をお願いします。<br />
      ※各ソフトウェアベンダーのサポート終了等により、システム条件が変更される場合がございます。予めご了承ください。<br />
      <br />
      ご利用中のパソコン端末情報は、以下「動作環境チェック」ボタンからご確認できます。
    </p>
    <ComponentButton
      text="動作環境チェック"
      color="primary"
      @onClick="pagemove()"
    />
  </v-container>
</template>
