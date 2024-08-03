<script setup lang="ts">
import ComponentButton from "../components/ButtonView.vue";
import { useRouter } from "vue-router";
import { useStoreUser } from "../store/user";

const router = useRouter();
const user = useStoreUser();
const userdata = user.userdata as any;
const id = userdata.id;

const pageClickMove = (pagename: string) => {
  router.push(router.resolve({ name: pagename }).href);
};
const pageClickMoveParam = (pagename: string, id: number) => {
  router.push(router.resolve({ name: pagename, params: { id: id } }).href);
};
</script>
<template>
  <v-sheet width="76%">
    <div class="d-flex flex-row justify-center mt-5">
      <ComponentButton
        text="企業情報変更"
        variant="outlined"
        density="compact"
        color="primary"
        class="w-25"
        @onClick="pageClickMoveParam('partnerEdit', id)"
      ></ComponentButton>
      <ComponentButton
        text="新規顧客登録"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
        @onClick="pageClickMove('addCustomer')"
      ></ComponentButton>
      <ComponentButton
        text="受検者検索"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
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
    </div>
    <div class="d-flex flex-row justify-center mt-1">
      <ComponentButton
        text="企業登録フォーム"
        variant="outlined"
        density="compact"
        color="primary"
        class="w-25"
        @onClick="pageClickMove('partnerRegist')"
      ></ComponentButton>
      <ComponentButton
        text="検査申込み料金設定"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
        @onClick="pageClickMove('addPertner')"
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
        :disabled="true"
      ></ComponentButton>
    </div>
  </v-sheet>
</template>
