<script setup lang="ts">
import ComponentButton from "../components/ButtonView.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const pageClickMove = (pagename: string) => {
  router.push(router.resolve({ name: pagename }).href);
};
</script>
<template>
  <v-sheet height="120px" width="70%">
    <div class="d-flex flex-row justify-center mt-5">
      <ComponentButton
        text="企業情報変更"
        variant="outlined"
        density="compact"
        color="primary"
        class="w-25"
        @onClick="pageClickMove('partnerRegist')"
      ></ComponentButton>
      <ComponentButton
        text="新規パートナー登録"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="受検者検索"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="検査ログ"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="PDF出力ログ"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
    </div>
    <div class="d-flex flex-row justify-center mt-1">
      <ComponentButton
        text="検査種別ROWデータ"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="請求書一覧"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="ライセンス一覧"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="トライアルID"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="お知らせ情報"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
    </div>
    <div class="d-flex flex-row justify-center mt-1">
      <ComponentButton
        text="受検者ログイン状況"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="管理者ログイン状況"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="企業一覧"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="PDF一覧"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
      <ComponentButton
        text="セキュリティログ"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-25"
      ></ComponentButton>
    </div>
  </v-sheet>
</template>
