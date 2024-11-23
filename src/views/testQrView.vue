<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import TestApiService from "@/services/TestApiService";
var uri = new URL(window.location.href);
const origin = ref();
const route = useRoute();
const ex = route.path.split("/");
let tmp = {
  user_id: ex[2],
  test_id: ex[3],
};
TestApiService.getQRParam(tmp).then(function (res) {
  origin.value = uri.origin + "/exam/?k=" + res.data.params;
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
</script>
<template>
  <v-row>
    <v-col class="ma-1">
      <p class="text-h6">印刷項目選択</p>
      <div>{{ origin }}</div>
    </v-col>
  </v-row>

  <v-data-table-virtual
    :headers="headers"
    :items="examList"
    height="300"
    fixed-header="true"
  ></v-data-table-virtual>
</template>
<style lang="scss"></style>
