<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { useStoreUser } from "../store/user";
//import SampleApiService from "@/services/SampleApiService";
import UserApiService from "@/services/UserApiService";
import UserLogout from "@/services/UserLogout";
const userId = ref<string>();
const password = ref<string>();
const user = useStoreUser();
if (user.isLogin) {
  UserLogout.logout();
  user.IsLogout();
}
UserApiService.checkTest()
  .then((response: any) => {
    console.log(response);
  })
  .catch((e) => {
    console.log("satus error");
    console.log(e);
    // alert("status ERROR");
  });
const onClick = () => {
  let data = {
    login_id: userId.value,
    password: password.value,
  };
  UserApiService.getPost(data)
    .then((response: any) => {
      console.log(response);
      user.setUserDataToken(response.data.token);
      user.setUserData(response.data.user);
      if (response.data.user.type === "partner") {
        router.push("/customerList/" + response.data.user.id);
      } else {
        // 管理者用ログイン画面
        router.push("/list");
      }
    })
    .catch((e) => {
      console.log(e);
      alert("LOGIN ERROR");
    });
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
