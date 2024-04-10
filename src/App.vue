<template>
  <v-app>
    <v-system-bar window dark>
      <v-icon>mdi-home</v-icon>
      <span>イノベーションゲート管理画面</span>
      <v-spacer></v-spacer>
      <a href="">ログアウト</a>
    </v-system-bar>
    <v-main>
      <router-view class="pa-1" />
    </v-main>
    <v-bottom-navigation> Button Navigation </v-bottom-navigation>

    <v-footer color="primary" app> Footer </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",

  data() {
    return {
      //
    };
  },
});
</script>
