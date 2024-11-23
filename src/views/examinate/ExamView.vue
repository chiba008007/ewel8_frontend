<script setup lang="ts">
import { ref } from "vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentButton from "@/components/ButtonView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import AlertView from "@/components/AlertView.vue";
import { useRouter } from "vue-router";
import ExamApiService from "@/services/ExamApiService";
import { requiredValue, checkBirth } from "@/plugins/validate";
import { useStoreUser } from "@/store/user";
const user = useStoreUser();

const router = useRouter();
const k = router.currentRoute.value.query.k;

const errorflag = ref(false);
const test_id = ref(0);
const setExamData = (e: object | any) => {
  test_id.value = e.id;
};

const validForm = ref(false);
const inputData = ref({
  login_id: "",
  birth_date: "",
});

const onClick = () => {
  errorflag.value = false;
  if (
    !requiredValue(inputData.value.login_id, "ログインID") &&
    !checkBirth(inputData.value.birth_date)
  ) {
    let tmp = {
      email: inputData.value.login_id,
      password: inputData.value.birth_date,
      test_id: test_id.value,
    };
    ExamApiService.examLogin(tmp)
      .then(function (response) {
        console.log(response.data);
        user.setUserDataExamToken(response.data.token);
        user.setUserExamData(response.data.user);
        errorflag.value = false;
        router.push({ name: "examProfile", query: { k: k } });
      })
      .catch(function (e) {
        errorflag.value = true;
        console.log(e);
      });
  }
};
</script>

<template>
  <ExamTitle :loginflag="false" @onTest="(e) => setExamData(e)" />

  <v-container>
    <p class="pt-4 pb-6 text-center">
      検査を実施します。<br />
      指示されたID/生年月日を入力後ログインを行ってください。
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
          :rules="requiredValue(inputData.login_id, 'ログインID')"
        />
        <ComponentTextField
          text="生年月日"
          name="birth_date"
          density="compact"
          variant="outlined"
          :hideDetails="`auto`"
          @onBlur="(val) => (inputData.birth_date = val)"
          class="mb-6"
          messages="例:1995/11/07"
          :rules="checkBirth(inputData.birth_date)"
        />
        <div class="text-center">
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

    <v-card variant="tonal" class="mt-8">
      <v-card-title class="text-red text-subtitle-1"
        >推奨OS・推奨ブラウザ</v-card-title
      >
      <v-card-text>
        安全で快適にご利用いただくために、下記OSと下記バージョンのブラウザのご利用をお勧めいたします。<br />
        推奨ウェブブラウザ以外でのご利用や、推奨ウェブブラウザでもお客さまの設定によっては、ご利用できない場合や正しく表示されない場合があります。<br />
        <br />
        <div class="font-weight-bold">Windowsをお使いの場合</div>
        <dl>
          <dt>推奨OS:</dt>
          <dd class="ml-2">Windows10以上</dd>
          <dt>推奨ブラウザ:</dt>
          <dd class="ml-2">Microsoft Edge 最新版</dd>
          <dd class="ml-2">Mozilla FireFox 最新版</dd>
          <dd class="ml-2">Google Chrome 最新版</dd>
        </dl>
        <div class="font-weight-bold">Macをお使いの場合</div>
        <dl>
          <dt>推奨OS:</dt>
          <dd class="ml-2">最新版</dd>
          <dt>推奨ブラウザ:</dt>
          <dd class="ml-2">Safari 最新版</dd>
        </dl>
      </v-card-text>
    </v-card>

    <v-card variant="tonal" class="mt-4">
      <v-card-title class="text-red text-subtitle-1"
        >Javascript・cookieの設定</v-card-title
      >
      <v-card-text>
        ブラウザ設定でJavascriptの設定を有効にしてください。<br />
        Javascriptの設定を無効にされている場合、正しく機能しない、もしくは正しく表示されないことがあります。<br />
        また、一部cookieを利用したコンテンツがございます。Javascript同様設定を有効にしてください。
      </v-card-text>
    </v-card>
  </v-container>
</template>
