<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStoreUser } from "../store/user";

import InfoAreaView from "../components/InfoAreaView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const user = useStoreUser();
// const userdata = user.userdata;
// console.log(user.userdata);
const pankuzu = ref();
if ((user.userdata as any).type === "partner") {
  pankuzu.value = [{ title: user.customerInfoList }];
} else {
  pankuzu.value = [
    { title: user.home, href: router.resolve({ name: "List" }).href },
    { title: user.customerInfoList },
  ];
}

const tab = ref(0);
</script>
<template>
  <PartnerAdmin />
  <InfoAreaView />
  <v-row justify="center">
    <CustomerMenu />
  </v-row>

  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-row>
    <v-col class="ma-1">
      <v-tabs v-model="tab">
        <v-tab value="1">顧客一覧</v-tab>
        <v-tab value="2">検査一覧</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="1"> aaa </v-window-item>
        <v-window-item value="2"> bbb </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
