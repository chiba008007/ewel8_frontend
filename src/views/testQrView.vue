<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { D_TEST_VGATE } from "@/plugins/const";
import TestApiService from "@/services/TestApiService";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import AlertView from "@/components/AlertView.vue";
import CheckboxView from "@/components/CheckboxView.vue";
import VueQrcode from "vue-qrcode";
import ButtonView from "@/components/ButtonView.vue";
var uri = new URL(window.location.href);
const origin = ref();
const route = useRoute();
const router = useRouter();
const testname = ref();
let key = router.currentRoute.value.params.id;
let testid = router.currentRoute.value.params.testid;
let tmp = {
  user_id: key,
  test_id: testid,
};
TestApiService.getQRParam(tmp).then(function (res) {
  testname.value = res.data.testname;
  if (location.hostname == "localhost") {
    origin.value = uri.origin + "/exam/?k=" + res.data.params;
  } else {
    origin.value = D_TEST_VGATE + "/?k=" + res.data.params;
  }
});
const examList = ref();
TestApiService.getQRLists(tmp).then(function (res) {
  examList.value = res.data;
});
const headers = [
  { title: "項番", align: "start", key: "no" },
  { title: "受検ID", align: "start", key: "exam_id" },
  { title: "名前", align: "start", key: "name" },
];
const windowPrint = () => {
  window.print();
};
const displayQrCodeFlag = ref(true);
const displayQRCode = () => {
  displayQrCodeFlag.value = displayQrCodeFlag.value ? false : true;
};
const displayListFlag = ref(true);
const displayList = () => {
  displayListFlag.value = displayListFlag.value ? false : true;
};
</script>
<template>
  <div class="pl-5 pr-5">
    <PartnerAdmin coded="customer" class="print_none" />
    <v-card class="pa-3 mt-3 bg-primary print_none"> 印刷項目選択 </v-card>
    <v-card class="pa-3 mt-3 print_none">
      <p class="text-caption">選択した項目が印刷対象となります</p>
      <CheckboxView
        label="QRコード"
        class="pa-0 ma-0"
        style="height: 30px"
        :value="displayQrCodeFlag"
        @onChange="displayQRCode()"
      ></CheckboxView>
      <CheckboxView
        label="受検者一覧"
        class="pa-0 ma-0"
        :value="displayListFlag"
        @onChange="displayList()"
      ></CheckboxView>
    </v-card>
    <v-card class="pa-3 mt-3 bg-primary">
      {{ testname }}
    </v-card>
    <p class="mt-3">{{ origin }}</p>
    <VueQrcode
      :value="origin"
      :options="{ width: 200 }"
      v-if="displayQrCodeFlag"
    />
    <div class="ml-2">
      <ButtonView
        text="印刷する"
        @click="windowPrint()"
        class="bg-blue print_none"
      ></ButtonView>
    </div>
    <div class="inputArea print_enable">ID</div>
    <v-divider class="mt-3"></v-divider>
    <v-data-table-virtual
      v-if="displayListFlag"
      :headers="headers"
      :items="examList"
      :fixed-header="true"
      class="mt-2 printLists"
    ></v-data-table-virtual>
  </div>
</template>
<style lang="scss">
.print_enable {
  display: none;
}
.inputArea {
  border-bottom: 1px solid #000;
  padding: 10px;
}
.printLists {
  height: 300px !important;
}
@media print {
  .print_none {
    display: none;
  }
  .print_enable {
    display: block;
  }
  .printLists {
    height: auto !important;
  }
}
</style>
