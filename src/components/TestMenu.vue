<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";
import { textString } from "@/plugins/const";
import UserApiService from "@/services/UserApiService";

const router = useRouter();
const user = useStoreUser();
const userdata = user.userdata as any;
const id = userdata.id;
const route = useRoute();
const editid = route.params.editid;
const tmpid = editid ? editid : route.params.id;

let tmp = { id: tmpid, type: "customer" };
const partnerid = ref();
const typed = ref() as any;
UserApiService.getPartnerid(tmp)
  .then((res: typeof typed) => {
    partnerid.value = res.data;
  })
  .catch((e) => {
    alert("TestMenu ERROR" + e);
    // location.href = "/error";
  });
const pageClickMoveParam = (pagename: string) => {
  router
    .push(router.resolve({ name: pagename, params: { id: tmpid } }).href)
    .then(() => {
      window.location.reload();
    });
};
const pageCustomerEditParam = (pagename: string) => {
  router.push(
    router.resolve({
      name: pagename,
      params: { id: tmpid, editid: partnerid.value, typeString: "test" },
    }).href
  );
};
</script>
<template>
  <v-sheet width="98%">
    <div class="d-flex flex-row justify-left pl-2 pr-5 pb-2">
      <ComponentButton
        text="検査登録"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25"
        @onClick="pageClickMoveParam('testAdd')"
      ></ComponentButton>
      <ComponentButton
        :text="textString.CompanyEdit"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageCustomerEditParam('customerEdit')"
      ></ComponentButton>
      <ComponentButton
        text="ダウンロード"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageClickMoveParam('partnerEdit')"
      ></ComponentButton>
      <ComponentButton
        text="重み付けマスタ登録"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageClickMoveParam('weightMaster')"
      ></ComponentButton>
    </div>
  </v-sheet>
</template>
