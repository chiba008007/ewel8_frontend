<script setup lang="ts">
import { computed, watch } from "vue";
import addPartnerForm from "@/components/addPartnerForm.vue";
import addPostCodeForm from "@/components/addPostCodeForm.vue";
import type { PartnerForm } from "@/types/partner";
import AddPrefCodeForm from "@/components/addPrefCodeForm.vue";
import AddSwitchForm from "@/components/addSwitchForm.vue";
import { displayString, settingString } from "@/plugins/const";
import {
  requiredValue,
  checkPassword,
  checkLoginID,
  checkLoginIDSync,
  checkEmailRequired,
} from "@/plugins/validate";
// 住所自動入力
import { handlePostCodeBlur } from "@/services/domains/postcode";
const props = defineProps<{
  form: PartnerForm;
  prefs: Array<{ id: string; name: string }>;
  partnerId: number | undefined;
}>();

const emit = defineEmits<{
  (e: "update:form", value: PartnerForm): void;
  (e: "update:isFormValid", value: boolean): void;
}>();

/**
 * props.form を直接 mutate しないためのラッパー
 */
const form = computed({
  get: () => props.form,
  set: (value) => emit("update:form", value),
});

const onPostCodeBlur = (value: string, type: string) => {
  handlePostCodeBlur(form.value, value, type as "post1" | "post2");
};

const rulesMap = {
  name: [(v: any) => requiredValue(v, "企業名")],
  login_id: [(v: any) => checkLoginIDSync(v)],
  person: [(v: any) => requiredValue(v, "主担当者氏名")],
  person_address: [(v: any) => checkEmailRequired(v)],
};
const isFormValid = computed(() => {
  return Object.entries(rulesMap).every(([key, rules]) =>
    rules.every((rule) => rule((form.value as any)[key]) === true)
  );
});
watch(isFormValid, (v) => {
  emit("update:isFormValid", v);
});
</script>
<template>
  <p>パートナー企業情報を入力してください。</p>
  <div>
    <addPartnerForm
      title="企業名"
      text="企業名を入力してください"
      messages="企業名を入力してください"
      class="w-100"
      :value="form.name"
      :requriredIcon="true"
      @onKeyup="(v) => (form.name = v)"
      :rules="[(v) => requiredValue(v, '企業名')]"
    ></addPartnerForm>
    <addPartnerForm
      title="ログインID"
      text="ログインIDを入力してください"
      class="w-75"
      :value="form.login_id"
      :requriredIcon="true"
      messages="半角英数・4文字以上で入力してください。大文字と小文字は区別されます。"
      @onKeyup="(v) => (form.login_id = v)"
      :rules="[(v) => checkLoginIDSync(v)]"
    ></addPartnerForm>
    <addPartnerForm
      title="パスワード"
      text="パスワードを入力してください"
      class="w-100"
      :value="form.password"
      :requriredIcon="true"
      messages="半角8文字以上、半角15文字で入力してください。大文字と小文字は区別さ英大文字・英小文字・数字それぞれを最低1文字ずつ含む必要があります。"
      :rules="[(v) => checkPassword(v, '', partnerId)]"
      @onKeyup="(v) => (form.password = v)"
    ></addPartnerForm>
    <addPostCodeForm
      title="郵便番号"
      class="w-100"
      :hideDetails="true"
      :value="`${form.post1}-${form.post2}`"
      @onBlur="onPostCodeBlur"
    ></addPostCodeForm>
    <AddPrefCodeForm
      title="都道府県"
      label="都道府県を選択"
      class="w-50"
      :hideDetails="true"
      :items="prefs"
      :value="form.pref"
      @onChange="(v) => (form.pref = Number(v))"
    ></AddPrefCodeForm>
    <addPartnerForm
      title="住所"
      text="住所を入力してください"
      class="w-100"
      :hideDetails="true"
      :value="form.address1"
      @onKeyup="(v) => (form.address1 = v)"
    ></addPartnerForm>
    <addPartnerForm
      title="建物名"
      text="建物名を入力してください"
      class="w-100"
      :hideDetails="true"
      :value="form.address2"
      @onKeyup="(v) => (form.address2 = v)"
    ></addPartnerForm>
    <addPartnerForm
      title="電話番号"
      text="電話番号を入力してください"
      class="w-100"
      messages="例)03-0000-0000"
      :value="form.tel"
      @onKeyup="(v) => (form.tel = v)"
    ></addPartnerForm>
    <addPartnerForm
      title="FAX番号"
      text="FAX番号を入力してください"
      class="w-100"
      messages="例)03-0000-0000"
      :value="form.fax"
      @onKeyup="(v) => (form.fax = v)"
    ></addPartnerForm>
    <AddSwitchForm
      title="申込み検査ボタン"
      :label="displayString(form.requestFlag)"
      density="compact"
      :tooltipflag="true"
      :model="form.requestFlag"
      tooltipMessage="顧客が検査を申込むボタンの表示可否を選択します。"
      @onClick="(v) => (form.requestFlag = v)"
    ></AddSwitchForm>
    <AddSwitchForm
      title="2段階認証有効可否"
      :label="settingString(form.two_factor_enabled)"
      density="compact"
      :tooltipflag="true"
      tooltipMessage="2段階認証有効可否を設定します。"
      :model="form.two_factor_enabled"
      @onClick="(v) => (form.two_factor_enabled = v)"
    ></AddSwitchForm>
    <addPartnerForm
      title="管理システム名"
      text="管理システム名を入力してください"
      class="w-100"
      :hideDetails="true"
      :value="form.system_name"
      @onKeyup="(v) => (form.system_name = v)"
    ></addPartnerForm>
  </div>
  <div class="mt-10">
    <p>担当者を入力してください。</p>
    <addPartnerForm
      title="主担当者氏名"
      messages="主担当者氏名を入力してください"
      class="w-100"
      :requriredIcon="true"
      :value="form.person"
      @onKeyup="(v) => (form.person = v)"
      :rules="[(v) => requiredValue(v, '主担当者氏名')]"
    ></addPartnerForm>
    <addPartnerForm
      title="主担当者アドレス"
      messages="主担当者メールアドレスを入力してください"
      class="w-100"
      :requriredIcon="true"
      :value="form.person_address"
      @onKeyup="(v) => (form.person_address = v)"
      :rules="[(v) => checkEmailRequired(v)]"
    ></addPartnerForm>
    <addPartnerForm
      title="副担当者氏名"
      text="副担当者氏名を入力してください"
      class="w-100"
      :hideDetails="true"
      :value="form.person2"
      @onKeyup="(v) => (form.person2 = v)"
    ></addPartnerForm>
    <addPartnerForm
      title="副担当者アドレス"
      text="副担当者メールアドレスを入力してください"
      class="w-100"
      :hideDetails="true"
      :value="form.person_address2"
      @onKeyup="(v) => (form.person_address2 = v)"
    ></addPartnerForm>
    <addPartnerForm
      title="担当者連絡先"
      text="担当者の連絡先を入力してください"
      class="w-100"
      :hideDetails="true"
      :value="form.person_tel"
      @onKeyup="(v) => (form.person_tel = v)"
    ></addPartnerForm>
  </div>
</template>
