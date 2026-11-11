<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import addPartnerForm from "@/components/addPartnerForm.vue";
import ButtonView from "@/components/ButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import UserApiService from "@/services/UserApiService";

const route = useRoute();

const token = String(route.query.token ?? "");
const loginId = String(route.query.login_id ?? "");

const password = ref("");
const passwordConfirm = ref("");
const submitting = ref(false);

const alertMessage = ref("");
const alertType = ref<"success" | "error">("error");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,15}$/;

const passwordRules = [
  (v: string) =>
    passwordPattern.test(v) ||
    "半角英数字8～15文字で、英大文字・英小文字・数字を含めてください。",
];

const confirmRules = [
  (v: string) => v === password.value || "確認用パスワードが一致しません。",
];

const isValid = computed(
  () =>
    !!token &&
    !!loginId &&
    passwordPattern.test(password.value) &&
    password.value === passwordConfirm.value
);

const onSubmit = async () => {
  if (!isValid.value || submitting.value) return;

  submitting.value = true;
  alertMessage.value = "";

  try {
    await UserApiService.passwordReset({
      login_id: loginId,
      token,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    });

    alertType.value = "success";
    alertMessage.value = "パスワードを変更しました。";

    password.value = "";
    passwordConfirm.value = "";
  } catch {
    alertType.value = "error";
    alertMessage.value =
      "パスワードを変更できませんでした。URLの有効期限をご確認ください。";
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-sheet class="ma-3" width="850">
      <v-card variant="outlined" class="pa-5">
        <v-card-title class="text-h6 text-center mb-3">
          パスワード再設定
        </v-card-title>

        <v-card-actions>
          <v-col>
            <AlertView
              v-if="!token || !loginId"
              type="error"
              text="再設定URLが正しくありません。"
              class="mb-4"
            />
            <div v-if="alertMessage === ''">
              <addPartnerForm
                title="新しいパスワード"
                type="password"
                :value="password"
                :rules="passwordRules"
                :maxlength="15"
                :passwordFlag="true"
                @onKeyup="(e: string) => (password = e)"
              />

              <addPartnerForm
                title="パスワード（確認）"
                type="password"
                :value="passwordConfirm"
                :rules="confirmRules"
                :maxlength="15"
                @onKeyup="(e: string) => (passwordConfirm = e)"
              />

              <ButtonView
                text="パスワードを変更"
                color="primary"
                variant="flat"
                class="w-100 mt-4"
                :disabled="!isValid || submitting"
                @onClick="onSubmit"
              />
            </div>
            <div v-else>
              <p class="text-center">
                下記からログイン画面に戻り、設定したパスワードでログインしてください。
              </p>
            </div>
            <div class="text-center mt-4">
              <router-link :to="{ name: 'Login' }">
                ログイン画面に戻る
              </router-link>
            </div>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-container>
</template>
