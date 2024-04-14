<script setup lang="ts">
import { computed } from "vue";
import userLogout from "@/services/UserLogout";
import { useStoreUser } from "../src/store/user";
import { useRouter } from "vue-router";
const usr = useStoreUser();
const router = useRouter();
const isLogin = computed(() => {
  return usr?.isLogin;
});
const system_name = computed(() => {
  let usrdata = usr.getUserData();
  return usrdata.system_name;
});
const onLogout = () => {
  userLogout.logout();
  usr.IsLogout();
  location.href = router.resolve({ name: "Login" }).href;
};
</script>
<template>
  <v-app>
    <v-system-bar window dark v-if="isLogin">
      <v-icon>mdi-home</v-icon>
      <span>{{ system_name }}管理画面</span>
      <v-spacer></v-spacer>
      <a @click="onLogout()">ログアウト</a>
    </v-system-bar>
    <v-main>
      <router-view class="pa-1" />
    </v-main>
  </v-app>
</template>
