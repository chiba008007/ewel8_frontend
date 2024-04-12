<script setup lang="ts">
import userLogout from "@/services/UserLogout";
import { useStoreUser } from "../src/store/user";
import { useRouter } from "vue-router";
const usr = useStoreUser();
const router = useRouter();
const onLogout = () => {
  userLogout.logout();
  usr.IsLogout();
  router.push(router.resolve({ name: "Login" }).href);
};
</script>
<template>
  <v-app>
    <v-system-bar window dark>
      <v-icon>mdi-home</v-icon>
      <span>イノベーションゲート管理画面</span>
      <v-spacer></v-spacer>
      <a @click="onLogout()">ログアウト</a>
    </v-system-bar>
    <v-main>
      <router-view class="pa-1" />
    </v-main>
  </v-app>
</template>
