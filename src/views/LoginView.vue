<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { useStoreUser } from "../store/user";
//import SampleApiService from "@/services/SampleApiService";
import UserApiService from "@/services/UserApiService";
import UserLogout from "@/services/UserLogout";
import TwoFactorView from "@/components/TwoFactorView.vue";
import ProgressView from "@/components/ProgressView.vue";

const userId = ref<string>();
const password = ref<string>();
const twoFactorCode = ref<string>();
const twoFactorShow = ref<boolean>(false);
const progressFlag = ref<boolean>(false);
const user = useStoreUser();
if (user.isLogin) {
  UserLogout.logout();
  user.IsLogout();
}
// UserApiService.checkTest()
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((e) => {
//     console.log("satus error");
//     console.log(e);
//     // alert("status ERROR");
//   });
const onLoginID = (e: Event) => {
  let target = e.target as HTMLInputElement;
  userId.value = target?.value;
};
const onLoginPassword = (e: Event) => {
  let target = e.target as HTMLInputElement;
  password.value = target?.value;
};
const onClick = () => {
  let data = {
    login_id: userId.value,
    password: password.value,
    two_factor: twoFactorCode.value,
  };
  progressFlag.value = true;

  UserApiService.getPost(data)
    .then((response: any) => {
      // 2段階認証表示用モーダルの表示
      if (response.data.two_factor_required && !twoFactorCode.value) {
        twoFactorShow.value = true;
      } else {
        user.setUserDataToken(response.data.token);
        user.setUserData(response.data.user);
        if (response.data.user.type === "partner") {
          router.push({
            name: "customerList",
            params: { id: response.data.user.id },
          });
        } else {
          // 管理者用ログイン画面
          router.push("/list");
        }
      }
      progressFlag.value = false;
    })
    .catch((e) => {
      progressFlag.value = false;
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
                @blur="(e:Event) => onLoginID(e)"
              >
              </v-text-field>
              <label>PASSWORD</label>
              <v-text-field
                variant="outlined"
                density="compact"
                clearable
                placeholder="パスワードを入力してください"
                type="password"
                @blur="(e:Event) => onLoginPassword(e)"
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
      <progress-view v-if="progressFlag"></progress-view>
      <two-factor-view
        v-model="twoFactorShow"
        @onKeyup="(e) => (twoFactorCode = e)"
        @onClick="onClick"
      ></two-factor-view>
    </v-sheet>
  </v-container>
</template>
