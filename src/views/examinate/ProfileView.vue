<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentButton from "@/components/ButtonView.vue";
import ComponentDialogButton from "@/components/DialogButton.vue";
import ExamTitle from "@/components/ExamTitle.vue";
import ExamProfileForm from "@/components/ExamProfileForm.vue";
import { requiredValue } from "@/plugins/validate";
import { genderArray } from "@/plugins/const";
import RadioView from "@/components/RadioView.vue";
import ExamApiService from "@/services/ExamApiService";
const router = useRouter();
const k = router.currentRoute.value.query.k;
const nothing = "設定なし";
const profile = ref({
  login_id: "",
  name1: "",
  name2: "",
  kana1: "",
  kana2: "",
  genders: 0,
  birth_date: "",
});
const buttonFlag = ref(true);
const nameuseflag = ref(0);
const genderuseflag = ref(0);
ExamApiService.getTestDataExam({
  params: k,
})
  .then(function (res) {
    nameuseflag.value = res.data.nameuseflag;
    genderuseflag.value = res.data.genderuseflag;
    if (nameuseflag.value === 0) {
      profile.value.name1 = nothing;
      profile.value.name2 = nothing;
      profile.value.kana1 = nothing;
      profile.value.kana2 = nothing;
      buttonCheck();
    }
  })
  .catch((error) => {
    console.log(error);
  });

const login_id = ref();

const onClick = () => {
  if (nameuseflag.value === 0) {
    profile.value.name1 = nothing;
    profile.value.name2 = nothing;
    profile.value.kana1 = nothing;
    profile.value.kana2 = nothing;
  }
  let tmp = {
    name: profile.value.name1 + "　" + profile.value.name2,
    kana: profile.value.kana1 + "　" + profile.value.kana2,
    gender: profile.value.genders,
    k: params.value,
  };

  ExamApiService.editExamData(tmp).then(function (res) {
    if (res.data) {
      router.push({ name: "examList", query: { k: k } }).then(() => {
        window.location.reload();
      });
    } else {
      alert("登録失敗しました。");
    }
  });

  // router.push({ name: "examCheckConfirm" });
};
const params = ref();
const setExamData = (rlt: any) => {
  params.value = rlt.params;
};
const onGender = (e: number) => {
  profile.value.genders = e;
};
const convertDateFormat = (date: string) => {
  const dt = new Date(date);
  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1).toString().padStart(2, "0");
  const d = dt.getDate().toString().padStart(2, "0");
  return `${y}年${m}月${d}日`;
};
const password = ref();
ExamApiService.getExamData()
  .then(function (res) {
    if (res) {
      password.value = res?.data.password;
      profile.value.name1 = res?.data.name1;
      profile.value.name2 = res?.data.name2;
      profile.value.kana1 = res?.data.kana1;
      profile.value.kana2 = res?.data.kana2;
      profile.value.genders = res?.data.gender;
      buttonCheck();
    }
  })
  .catch((error) => console.log(error));

const buttonCheck = () => {
  if (
    requiredValue(profile.value.name1, "姓").length === 0 &&
    requiredValue(profile.value.name2, "名").length === 0 &&
    requiredValue(profile.value.kana1, "姓かな").length === 0 &&
    requiredValue(profile.value.kana2, "名かな").length === 0
  ) {
    buttonFlag.value = false;
  }
};
const enabledFlag = ref(true);
const enabledTest = (e: boolean) => {
  enabledFlag.value = e;
};
</script>

<template>
  <ExamTitle
    @onLoginId="(e) => (login_id = e)"
    @onTest="(e) => setExamData(e)"
    @enabledTest="(e) => enabledTest(e)"
  />
  <v-container v-if="enabledFlag">
    <div class="text-h6">個人情報属性</div>
    <div class="mt-5">
      <ExamProfileForm title="ログインID">
        {{ login_id }}
      </ExamProfileForm>
      <ExamProfileForm v-if="nameuseflag" title="氏名" :requriredIcon="true">
        <v-row>
          <v-col cols="12" sm="6">
            <ComponentTextField
              name="name1"
              text="姓"
              density="compact"
              variant="outlined"
              :hideDetails="`auto`"
              messages="例:佐藤"
              :rules="requiredValue(profile.name1, '姓')"
              :value="profile.name1"
              @onBlur="(val) => ((profile.name1 = val), buttonCheck())"
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
              :value="profile.name2"
              :rules="requiredValue(profile.name2, '名')"
              @onBlur="(val) => ((profile.name2 = val), buttonCheck())"
            ></ComponentTextField>
          </v-col>
        </v-row>
      </ExamProfileForm>
      <ExamProfileForm
        v-if="nameuseflag"
        title="ふりがな"
        :requriredIcon="true"
      >
        <v-row>
          <v-col cols="12" sm="6">
            <ComponentTextField
              name="kana1"
              text="姓"
              density="compact"
              variant="outlined"
              :hideDetails="`auto`"
              messages="例:さとう"
              :value="profile.kana1"
              :rules="requiredValue(profile.kana1, '姓かな')"
              @onBlur="(val) => ((profile.kana1 = val), buttonCheck())"
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
              :value="profile.kana2"
              :rules="requiredValue(profile.kana2, '名かな')"
              @onBlur="(val) => ((profile.kana2 = val), buttonCheck())"
            ></ComponentTextField>
          </v-col>
        </v-row>
      </ExamProfileForm>
      <ExamProfileForm title="性別" v-if="genderuseflag">
        <RadioView
          :default="profile.genders"
          :items="genderArray"
          :model="profile.genders"
          @onChange="(e) => onGender(e)"
        ></RadioView>
      </ExamProfileForm>
      <ExamProfileForm title="生年月日" v-if="password">
        {{ convertDateFormat(password) }}
      </ExamProfileForm>
    </div>

    <v-card variant="tonal" class="mt-8">
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
      <ComponentButton
        text="次へ"
        color="primary"
        @onClick="onClick()"
        :disabled="buttonFlag"
      />
    </div>
  </v-container>
</template>
