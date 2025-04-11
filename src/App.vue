<script setup lang="ts">
import { computed, ref } from "vue";
import userLogout from "@/services/UserLogout";
import { useStoreUser } from "../src/store/user";
import { useRouter } from "vue-router";
import { preventRapidReload } from "./reload-guard";

if (!preventRapidReload(1000)) {
  // 防止した場合はここで終了も可能
  throw new Error("連続リロード防止のため停止");
}

var uri = new URL(window.location.href);
const displayFlag = ref(true);
if (/testQr/.test(uri.pathname)) displayFlag.value = false;
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
    <v-system-bar window dark v-if="isLogin" v-show="displayFlag">
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
<style lang="scss">
.listable {
  table {
    th {
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      background-color: rgb(var(--v-theme-primary)) !important;
      color: #fff;
    }
    th,
    td {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
}

.v-text-field >>> input {
  font-size: 1.9em;
  padding: 0 !important;
}

.listable {
  &.dataTableStyle {
    table {
      th {
        background-color: rgb(6, 146, 6) !important;
        white-space: nowrap;
      }
    }
  }
}
</style>
