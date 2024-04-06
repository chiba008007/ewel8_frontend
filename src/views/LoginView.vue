<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { useStoreUser } from "../store/user";
//import SampleApiService from "@/services/SampleApiService";
import UserApiService from "@/services/UserApiService";

const userId = ref<string>();
const password = ref<string>();
const user = useStoreUser();
const onClick = () => {
  let data = {
    email: "john@doe.com",
    password: "password",
  };
  let userdata = UserApiService.getPost(data);
  user.setUserData(userdata);
  // piniaを使ってみたサンプル
  //user.increment();
  // 本来はここでサーバと通信して認証可否を判断するはず
  // console.log(userId.value);
  // console.log(password.value);
  // router.push("/home");
};
</script>
<template>
  <v-container class="align-center justify-center fill-height">
    <v-sheet class="ma-3">
      <v-card class="mx-auto" variant="outlined" min-width="400px">
        <v-card-actions>
          <v-col>
            <p class="text-h6">E-WEL.COM</p>
            <div class="mt-2">
              <label>User ID</label>
              <v-text-field
                variant="outlined"
                density="compact"
                clearable
                placeholder="USER IDを入力してください"
                @keyup="userId = $event.target.value"
              >
              </v-text-field>
              <label>PASSWORD</label>
              <v-text-field
                variant="outlined"
                density="compact"
                clearable
                placeholder="パスワードを入力してください"
                type="password"
                @keyup="password = $event.target.value"
              >
              </v-text-field>
              <v-btn
                type="submit"
                color="primary"
                variant="flat"
                block
                class="mt-3"
                @click="onClick"
              >
                ログイン
              </v-btn>
            </div>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-container>
</template>
