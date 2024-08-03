<script setup lang="ts">
import { ref, defineEmits } from "vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";

const route = useRoute();
const regex = /(\d+)(?!.*\d)/;
const isPortal = ref(route.path.match(regex));
const paramId = isPortal.value ? isPortal.value[0] : 0;
const router = useRouter();
const user = useStoreUser();
const userid = (user.userdata as any).id;
// ログインした人のIDとパラメータのIDが同じ確認
if (!user.sameIdChecked(userid, paramId as number)) {
  router.push(router.resolve({ name: "error" }).href);
}

const pankuzu = [
  {
    title: "顧客情報一覧",
    href: router.resolve({ name: "customerList", params: { id: paramId } })
      .href,
  },
  { title: "企業情報変更" },
];
</script>
<template>
  <v-row align="center" justify="center">
    <CustomerMenu />
  </v-row>
  <v-row>
    <v-col class="ma-1">
      <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
      <div class="text-h5">企業情報変更</div>
      aaa
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
