<script setup lang="ts">
import { ref } from "vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentButton from "@/components/ButtonView.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const validForm = ref(false);
const inputData = ref({
  login_id: "",
  birth_date: "",
});

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};

const onClick = () => {
  router.push({ name: "examProfile" });
};
</script>

<template>
  <ExamTitle
    :logo-src="require('@/assets/logo.png')"
    :customer-name="`test企業`"
    :exam-name="`test検査`"
  />

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
          :rules="(val:string|any) => rules(val, 'ログインIDは必須入力です')"
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
          :rules="(val:string|any) => rules(val, '生年月日は必須入力です')"
        />
        <div class="text-center">
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
