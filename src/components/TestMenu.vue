<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";
import { D_CUSTOMER, textString } from "@/plugins/const";
import UserApiService from "@/services/UserApiService";
import { D_ADMIN, D_PARTNER } from "@/plugins/const";

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
    console.log("TestMenu ERROR" + e);
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
  const partnerId =
    userdata.type === "customer"
      ? userdata.partner_id
      : user.getSession("partner_id");

  router.push({
    name: pagename,
    params: {
      id: String(partnerId),
      editid: String(tmpid),
      typeString: "test",
    },
  });
};
</script>
<template>
  <v-sheet width="98%">
    <div class="d-flex flex-row justify-left pl-2 pr-5 pb-2">
      <ComponentButton
        v-if="
          user.userdata.type === D_ADMIN || user.userdata.type === D_PARTNER
        "
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
        v-if="
          user.userdata.type === D_ADMIN || user.userdata.type === D_CUSTOMER
        "
        text="ダウンロード"
        variant="elevated"
        density="compact"
        color="lime"
        class="w-25 ml-1"
        @onClick="pageClickMoveParam('testListsDownload')"
      ></ComponentButton>
      <ComponentButton
        v-if="
          user.userdata.type === D_ADMIN || user.userdata.type === D_PARTNER
        "
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
