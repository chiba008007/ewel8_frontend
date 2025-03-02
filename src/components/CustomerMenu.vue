<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";
import { textString } from "@/plugins/const";
const router = useRouter();
const user = useStoreUser();
const userdata = user.userdata as any;
const id = userdata.id;

const route = useRoute();
const tmpid = route.params.id;
const pageClickMove = (pagename: string) => {
  router.push(router.resolve({ name: pagename }).href);
};
const pageClickMoveParam = (pagename: string) => {
  router.push(router.resolve({ name: pagename, params: { id: tmpid } }).href);
};
</script>
<template>
  <v-sheet width="76%">
    <div class="d-flex flex-row justify-center mt-5">
      <ComponentButton
        :text="textString.CompanyEdit"
        variant="outlined"
        density="compact"
        color="primary"
        class="w-25"
        @onClick="pageClickMoveParam('partnerEdit')"
      ></ComponentButton>
      <ComponentButton
        text="新規顧客登録"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
        @onClick="pageClickMove('customerAdd')"
      ></ComponentButton>
      <ComponentButton
        text="ダウンロード"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="PDFロゴ画像登録"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="企業登録フォーム"
        variant="outlined"
        density="compact"
        color="primary"
        class="w-25"
        @onClick="pageClickMove('partnerRegist')"
      ></ComponentButton>
    </div>
    <div class="d-flex flex-row justify-center mt-1">
      <ComponentButton
        text="検査申込み料金設定"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
        @onClick="pageClickMove('addPartner')"
      ></ComponentButton>
      <ComponentButton
        text="検査申込み履歴"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="実施件数確認"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text=""
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
        disabled
      ></ComponentButton>
      <ComponentButton
        text=""
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
        disabled
      ></ComponentButton>
    </div>
  </v-sheet>
</template>
