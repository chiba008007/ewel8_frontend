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
// const pageClickMove = (pagename: string) => {
//   router.push(router.resolve({ name: pagename }).href);
// };
const pageClickMoveParam = (pagename: string) => {
  router.push(router.resolve({ name: pagename, params: { id: tmpid } }).href);
};
</script>
<template>
  <v-sheet width="96%">
    <div class="d-flex flex-row mt-5">
      <ComponentButton
        :text="textString.CompanyEdit"
        variant="outlined"
        density="compact"
        color="primary"
        class="w-20"
        @onClick="pageClickMoveParam('partnerEdit')"
      ></ComponentButton>
      <ComponentButton
        text="新規顧客登録"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-20"
        @onClick="pageClickMoveParam('customerAdd')"
      ></ComponentButton>
      <ComponentButton
        text="ダウンロード"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-20"
        @onClick="pageClickMoveParam('customerDown')"
      ></ComponentButton>
      <ComponentButton
        text="PDFロゴ画像登録"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-20"
        @onClick="pageClickMoveParam('pdflogo')"
      ></ComponentButton>
      <ComponentButton
        text="実施件数確認"
        variant="outlined"
        density="compact"
        color="primary"
        class="ml-1 w-20"
        @onClick="pageClickMoveParam('testExec')"
      ></ComponentButton>
    </div>
  </v-sheet>
</template>
<style lang="scss">
.w-20 {
  width: 19.8%;
}
</style>
