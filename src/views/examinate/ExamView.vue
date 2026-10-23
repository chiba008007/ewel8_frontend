<script setup lang="ts">
import { ref } from "vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import BirthComponent from "@/components/BirthComponent.vue";

import ComponentButton from "@/components/ButtonView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import AlertView from "@/components/AlertView.vue";
import { useRouter } from "vue-router";
import ExamApiService from "@/services/ExamApiService";
import { requiredValue, checkBirth, zeroPadding } from "@/plugins/validate";
import { useStoreUser } from "@/store/user";
import userLogout from "@/services/UserLogout";
import RecommendView from "@/components/RecommendView.vue";
import AdminPageLogService from "@/services/AdminPageLogService";

const user = useStoreUser();
const recomendflag = ref(false);
const logintext = ref("");
if (user.isExamLogin) {
  //  userLogout.logout();
  user.IsLogoutExam();
}
const router = useRouter();
const k = router.currentRoute.value.query.k;
const errorflag = ref(false);
const test_id = ref(0);

const setExamData = (e: object | any) => {
  test_id.value = e.id;
  recomendflag.value = e.recomendflag === 1;
  logintext.value = e.logintext;
};

const validForm = ref(false);
const inputData = ref({
  login_id: "",
  birth_date: "",
  birth_year: "",
  birth_month: "1",
  birth_day: "1",
});

const onClick = () => {
  errorflag.value = false;
  const password =
    inputData.value.birth_year +
    "/" +
    zeroPadding(inputData.value.birth_month) +
    "/" +
    zeroPadding(inputData.value.birth_day);
  if (requiredValue(inputData.value.login_id, "ログインID") === true) {
    let tmp = {
      email: inputData.value.login_id,
      password: password,
      test_id: test_id.value,
    };
    ExamApiService.examLogin(tmp)
      .then(function (response) {
        user.setUserDataExamToken(response.data.token);
        user.setUserExamData(response.data.user);
        errorflag.value = false;

        AdminPageLogService.setPageLog({
          route_name: "exam",
          title: "受検者ログイン",
          path: "/exam/",
          params: {},
        }).catch((error) => {
          console.error("アクセスログ登録失敗", error);
        });

        router.push({ name: "examProfile", query: { k: k } }).then(() => {
          window.location.reload();
        });
      })
      .catch(function () {
        errorflag.value = true;
      });
  } else {
    errorflag.value = true;
  }
};
const enabledFlag = ref(false);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};
</script>

<template>
  <ExamTitle
    :loginflag="false"
    @onTest="(e) => setExamData(e)"
    @enabledTest="(e) => enabledTest(e)"
  />

  <v-container v-if="enabledFlag">
    <p class="pt-4 pb-6 text-center" v-if="logintext">{{ logintext }}</p>
    <p class="pt-4 pb-6 text-center" v-else>
      検査を実施します。<br />
      指示された「ログインID」「生年月日」を入力後ログインを行ってください。
    </p>

    <v-card max-width="500" class="mx-auto pa-6">
      <v-form v-model="validForm">
        <ComponentTextField
          text="ログインID"
          name="login_id"
          density="compact"
          variant="outlined"
          :hideDetails="`auto`"
          @onBlur="(val) => (inputData.login_id = val)"
          class="mb-6"
          :rules="[(e) => requiredValue(e, 'ログインID')]"
        />

        <BirthComponent
          :monthValue="inputData.birth_month"
          :dayValue="inputData.birth_day"
          :yearValue="inputData.birth_year"
          @onMonthChange="(e) => (inputData.birth_month = e)"
          @onDayChange="(e) => (inputData.birth_day = e)"
          @onYear="(e) => (inputData.birth_year = e)"
        ></BirthComponent>
        <div class="text-center mt-5">
          <AlertView
            text="ログイン失敗"
            class="mb-2"
            type="error"
            v-show="errorflag"
          ></AlertView>
          <ComponentButton
            text="ログイン"
            class="w-100"
            color="primary"
            @onClick="onClick()"
            :disabled="!validForm"
          />
        </div>
      </v-form>
    </v-card>
    <RecommendView :recomendflag="recomendflag"></RecommendView>
  </v-container>
</template>
