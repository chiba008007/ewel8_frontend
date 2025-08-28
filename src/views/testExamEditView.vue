<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import pankuzuMain from "../components/pankuzuMain.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import { useStoreUser } from "@/store/user";
import ProgressView from "@/components/ProgressView.vue";
import ExamApiDataService from "@/services/ExamApiDataService";
import TextFieldView from "@/components/TextFieldView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import {
  monthArray,
  dayArray,
  genderLabel,
  passArrayLabel,
} from "@/plugins/const";
import { getDateSepalate } from "@/plugins/password";
import RadioView from "@/components/RadioView.vue";
import CheckboxView from "@/components/CheckboxView.vue";
import ButtonView from "@/components/ButtonView.vue";
import AlertView from "@/components/AlertView.vue";

const alertflag = ref(false);
const router = useRouter();
const user = useStoreUser();
const loadingFlag = ref(true);
const partner_id = user.getSession("partner_id");
const params = router.currentRoute.value.params;
interface ExamData {
  email: string;
  name: string;
  kana: string;
  birth: string;
  gender: number | string;
  passflag: number | string;
  memo1: string;
  memo2: string;
  emailList: object;
}

const data = ref<ExamData>({
  email: "",
  name: "",
  kana: "",
  birth: "",
  gender: "",
  passflag: "",
  memo1: "",
  memo2: "",
  emailList: [],
});
const emailInput = ref("");
const examDefault = ref<string>("");
const emailList = ref();
ExamApiDataService.getTestExamEdit({
  partner_id: partner_id,
  customer_id: params.id,
  test_id: params.testid,
  edit_id: params.exam_id,
})
  .then(function (res) {
    data.value = res.data;
    examDefault.value = data.value.email;
    emailList.value = data.value.emailList;
    emailInput.value = data.value.email;
    loadingFlag.value = false;
  })
  .catch(function (e) {
    console.log(e);
  });
const onEdit = () => {
  alertflag.value = false;
  loadingFlag.value = true;
  ExamApiDataService.editExamEditData({
    customer_id: params.id,
    test_id: params.testid,
    partner_id: partner_id,
    edit_id: params.exam_id,
    name: data.value.name,
    kana: data.value.kana,
    gender: data.value.gender,
    email: data.value.email,
    password: data.value.birth,
    passflag: data.value.passflag,
    memo1: data.value.memo1,
    memo2: data.value.memo2,
  })
    .then(function () {
      loadingFlag.value = false;
      alertflag.value = true;
    })
    .catch(function (e) {
      console.log(e);
    });
};
const onSetBirth = (str: string, type: string) => {
  let birth = data.value.birth.split("/");

  let y = type === "year" ? str : birth[0];
  let m = type === "month" ? str : birth[1];
  let d = type === "day" ? str : birth[2];

  // 年を4桁ゼロ埋め、日を2桁ゼロ埋め
  const year = y ? y.toString().padStart(4, "0") : "";
  const month = m ? m.toString().padStart(2, "0") : "";
  const day = d ? d.toString().padStart(2, "0") : "";

  data.value.birth = `${year}/${month}/${day}`;
};
const isDisabled = ref(false);
const onChecked = (e: boolean) => {
  if (e) {
    data.value.email =
      Math.floor(10 + Math.random() * 90) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
  } else {
    data.value.email = examDefault.value;
  }
};

// メインのバリデーション関数
const validateEmailCode = (v: string): true | string => {
  if (!v) return "入力してください";
  if (!/^[a-zA-Z0-9]{3,8}$/.test(v)) {
    return "半角英数字3文字以上、8文字以下で入力してください";
  }
  if (emailList.value.includes(v)) {
    return "このコードは既に使用されています";
  }
  return true;
};

const emailRules = [(v: string) => validateEmailCode(v)];
// 登録ボタンの無効化判定（バリデーション失敗時）
const registButtonDisabled = computed(
  () => validateEmailCode(emailInput.value) !== true
);
</script>

<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customer" />
  <pankuzuMain
    :adminhref="{
      pageName: 'testList',
      href: 'testLists',
      params: { id: params.id },
    }"
    :adminhref2="{
      pageName: 'testExamList',
      href: 'testExamList',
      params: { id: params.id, testid: params.testid },
    }"
    :adminhref3="{ pageName: 'testExamEdit' }"
  ></pankuzuMain>
  <div class="text-left pa-4">
    <h4>{{ user.testExamEdit }}</h4>
    <div class="d-flex mt-5">
      <ButtonView
        text="キャンセル"
        color="red"
        @onClick="
          router.push(
            router.resolve({
              name: 'testExamList',
              params: { id: params.id, testid: params.testid },
            })
          )
        "
      ></ButtonView>
      <ButtonView
        text="登録"
        class="ml-2"
        color="primary"
        @onClick="onEdit()"
        :disabled="registButtonDisabled"
      ></ButtonView>
    </div>
    <AlertView
      v-if="alertflag"
      type="success"
      text="データを更新しました。"
      class="mt-3"
    ></AlertView>
    <div class="mt-5">
      <v-row class="border-b border-gray-300">
        <v-col cols="2">ID</v-col>
        <v-col cols="10">{{ examDefault }}</v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">氏名</v-col>
        <v-col cols="10">
          <TextFieldView
            :value="data.name"
            @onKeyup="(e) => (data.name = e)"
          ></TextFieldView>
          <p>苗字と名前の間にスペースを入れてください。</p>
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">かな</v-col>
        <v-col cols="10">
          <TextFieldView
            :value="data.kana"
            @onKeyup="(e) => (data.kana = e)"
          ></TextFieldView>
          <p>苗字と名前の間にスペースを入れてください。</p>
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">生年月日</v-col>
        <v-col cols="10" class="d-flex">
          <TextFieldView
            :value="getDateSepalate(data.birth, 0)"
            class="width100"
            type="number"
            @onKeyup="(e) => onSetBirth(e, 'year')"
            :maxlength="4"
            :rules="[(v) => /^\d{4}$/.test(v) || '4桁数字']"
          ></TextFieldView>
          <span class="mt-2">年</span>

          <SelectFieldView
            class="width100"
            :items="monthArray"
            :text="getDateSepalate(data.birth, 1)"
            @onChange="(e) => onSetBirth(e, 'month')"
          ></SelectFieldView>
          <span class="mt-2">月</span>
          <SelectFieldView
            class="width100"
            :items="dayArray"
            :text="getDateSepalate(data.birth, 2)"
            @onChange="(e) => onSetBirth(e, 'day')"
          ></SelectFieldView>
          <span class="mt-2">日</span>
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">性別</v-col>
        <v-col cols="10">
          <RadioView
            v-model="data.gender"
            :items="genderLabel"
            :inline="true"
          />
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">IDの無効化</v-col>
        <v-col cols="10">
          <div class="d-flex align-center w-50">
            <CheckboxView
              v-model="isDisabled"
              label="無効化"
              class="ma-0"
              @onChange="onChecked"
            ></CheckboxView>
            <TextFieldView
              class="ml-2"
              :value="data.email"
              :maxlength="8"
              :rules="emailRules"
              @onKeyup="(val:string) => (emailInput = val)"
            ></TextFieldView>
          </div>
          <p>
            IDを無効化する際はチェックをしてください。手動設定でもIDの変更が可能です。
          </p>
          <p>半角英数字3文字以上。8文字以下で入力してください。</p>
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">合否</v-col>
        <v-col cols="10">
          <RadioView
            v-model="data.passflag"
            :items="passArrayLabel"
            :inline="true"
          />
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">メモ1</v-col>
        <v-col cols="10">
          <TextFieldView
            :value="data.memo1"
            @onKeyup="(e) => (data.memo1 = e)"
          ></TextFieldView>
        </v-col>
      </v-row>
      <v-row class="border-b border-gray-300">
        <v-col cols="2">メモ2</v-col>
        <v-col cols="10">
          <TextFieldView
            :value="data.memo2"
            @onKeyup="(e) => (data.memo2 = e)"
          ></TextFieldView>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
