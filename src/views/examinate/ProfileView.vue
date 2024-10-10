<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentButton from "@/components/ButtonView.vue";
import ComponentDialogButton from "@/components/DialogButton.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamProfileForm from "@/components/ExamProfileForm.vue";

const router = useRouter();

const profile = ref({
  login_id: "test",
  name1: "テスト",
  name2: "花子",
  kana1: "てすと",
  kana2: "はなこ",
  gender: 2,
  birth_date: "1999/01/01",
});

const dialog = ref(false);

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};

const onClick = () => {
  router.push({ name: "examCheckConfirm" });
};

const convertDateFormat = (date: string) => {
  const dt = new Date(date);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1).toString().padStart(2, "0");
  const d = dt.getDate().toString().padStart(2, "0");
  return `${y}年${m}月${d}日`;
};
</script>

<template>
  <ExamTitle
    :logo-src="require('@/assets/logo.png')"
    :customer-name="`test企業`"
    :exam-name="`test検査`"
  />

  <v-container>
    <div class="text-h6">個人情報属性</div>

    <v-container>
      <ExamProfileForm title="ログインID">
        {{ profile.login_id }}
      </ExamProfileForm>
      <ExamProfileForm title="氏名" :requriredIcon="true">
        <v-row>
          <v-col cols="12" sm="6">
            <ComponentTextField
              name="name1"
              text="姓"
              density="compact"
              variant="outlined"
              :hideDetails="`auto`"
              messages="例:佐藤"
              :rules="(val:string|any) => rules(val, '姓は必須入力です')"
              :value="profile.name1"
              @onBlur="(val) => (profile.name1 = val)"
            ></ComponentTextField>
          </v-col>
          <v-col cols="12" sm="6">
            <ComponentTextField
              name="name2"
              text="名"
              density="compact"
              variant="outlined"
              :hideDetails="`auto`"
              messages="例:太郎"
              :rules="(val:string|any) => rules(val, '名は必須入力です')"
              :value="profile.name2"
              @onBlur="(val) => (profile.name2 = val)"
            ></ComponentTextField>
          </v-col>
        </v-row>
      </ExamProfileForm>
      <ExamProfileForm title="ふりがな" :requriredIcon="true">
        <v-row>
          <v-col cols="12" sm="6">
            <ComponentTextField
              name="kana1"
              text="姓"
              density="compact"
              variant="outlined"
              :hideDetails="`auto`"
              messages="例:さとう"
              :rules="(val:string|any) => rules(val, '姓は必須入力です')"
              :value="profile.kana1"
              @onBlur="(val) => (profile.kana1 = val)"
            ></ComponentTextField>
          </v-col>
          <v-col cols="12" sm="6">
            <ComponentTextField
              name="kana2"
              text="名"
              density="compact"
              variant="outlined"
              :hideDetails="`auto`"
              messages="例:たろう"
              :rules="(val:string|any) => rules(val, '名は必須入力です')"
              :value="profile.kana2"
              @onBlur="(val) => (profile.kana2 = val)"
            ></ComponentTextField>
          </v-col>
        </v-row>
      </ExamProfileForm>
      <ExamProfileForm title="性別">
        <v-radio-group inline :hideDetails="true" v-model="profile.gender">
          <v-radio label="男性" :value="1"></v-radio>
          <v-radio label="女性" :value="2"></v-radio>
          <v-radio label="選択しない" :value="0"></v-radio>
        </v-radio-group>
        <small class="text-red">※必須項目ではありません</small>
      </ExamProfileForm>
      <ExamProfileForm title="生年月日">
        {{ convertDateFormat(profile.birth_date) }}
      </ExamProfileForm>
    </v-container>

    <v-card variant="tonal" class="mt-4">
      <v-card-text>
        弊社では、個人情報を適切な方法で管理し、下記の利用目的以外で受検者の同意なく、第三者に対し開示することはありません。<br />
        <br />
        【個人情報の利用目的】<br />
        弊社の担当部署において、採用活動の目的範囲内に限定し、結果を開示します。<br />
        また、研究開発を目的として、受検者に関する検査結果を個人が識別、または特定できないようにし、利用する場合があります。<br />
        <br />
        <br />
        【検査受検に関する注意事項】<br />
        弊社にて得られる検査結果は、当該受検者の人格の全てを規定するものでも保証するものではありません。<br />
        検査提供会社は、検査受検の結果によって被る受検者の損害に対して、一切責任の負いません。<br />
        <br />
        同意して頂ける場合は、次へお進み下さい。
      </v-card-text>
    </v-card>

    <div class="mt-4 text-center">
      <ComponentDialogButton
        text="戻る"
        message="ログイン画面に戻ります。よろしいですか？"
        @onOkClick="$router.back()"
      />
      <ComponentButton text="次へ" color="primary" @onClick="onClick()" />
    </div>
  </v-container>
</template>
