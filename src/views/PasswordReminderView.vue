<script setup lang="ts">
import { ref, computed } from "vue";
import TextFieldView from "@/components/TextFieldView.vue";
import ButtonView from "@/components/ButtonView.vue";
import UserApiService from "@/services/UserApiService";
import AlertView from "@/components/AlertView.vue";

const loginId = ref("");
const email = ref("");

const emailRules = [
  (v: string) => !!v || "メールアドレスを入力してください。",
  (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
    "正しいメールアドレスを入力してください。",
];

const isValid = computed(
  () =>
    loginId.value.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
);

const alertType = ref<"success" | "error">("success");
const alertMessage = ref("");
const isSubmitting = ref(false);

const onSubmit = async () => {
  alertMessage.value = "";
  isSubmitting.value = true;

  try {
    await UserApiService.passwordRemind({
      login_id: loginId.value,
      email: email.value,
    });

    alertType.value = "success";
    alertMessage.value =
      "申請を受け付けました。登録情報が一致する場合、パスワード再設定メールを送信します。";
  } catch (error) {
    alertType.value = "error";
    alertMessage.value =
      "申請を受け付けられませんでした。時間をおいて再度お試しください。";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-sheet class="ma-3" width="450">
      <v-card variant="outlined" class="pa-5">
        <v-card-title class="text-h6 text-center mb-3">
          パスワード再設定
        </v-card-title>

        <v-card-text>
          <p class="text-body-2 mb-5">
            ログインIDとご登録のメールアドレスを入力してください。<br />
            登録情報が一致した場合、パスワード再設定用のURLをメールでご案内します。
          </p>
          <AlertView
            v-if="alertMessage"
            :type="alertType"
            :text="alertMessage"
            class="mb-4"
          />
          <TextFieldView
            text="ログインID"
            placeholder="ログインIDを入力してください"
            :value="loginId"
            :maxlength="8"
            @onInput="(value) => (loginId = value)"
          />

          <TextFieldView
            text="メールアドレス"
            placeholder="example@example.com"
            type="email"
            :value="email"
            :rules="emailRules"
            :maxlength="255"
            class="mt-3"
            @onInput="(value) => (email = value)"
          />

          <ButtonView
            text="再設定メールを送信"
            color="primary"
            variant="flat"
            class="w-100 mt-4"
            :disabled="!isValid"
            @onClick="onSubmit"
          />
          <p>※パスワード発行URLの有効期限は発行から30分です。</p>
          <div class="text-center mt-4">
            <router-link :to="{ name: 'Login' }">
              ログイン画面に戻る
            </router-link>
          </div>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-container>
</template>
