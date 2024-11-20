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
</script>
<template>
  <v-row>
    <v-col class="ma-1">
      <p class="text-h6">印刷項目選択</p>
      <div>{{ origin }}</div>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
