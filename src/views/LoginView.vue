<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { useStoreUser } from "../store/user";

const userId = ref<string>();
const password = ref<string>();
const user = useStoreUser();
const onClick = () => {
  user.increment();
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
