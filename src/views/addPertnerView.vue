<script setup lang="ts">
import { ref, defineEmits } from "vue";
import AdminMenu from "../components/AdminMenu.vue";
import ComponentButton from "../components/ButtonView.vue";
import addPartnerForm from "../components/addPartnerForm.vue";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
import addSwitchForm from "../components/addSwitchForm.vue";
import { useRouter } from "vue-router";
import PrefApiService from "@/services/PrefApiService";
const router = useRouter();
const pankuzu = [
  { title: "HOME", href: router.resolve({ name: "List" }).href },
  { title: "新規パートナー登録" },
];
const prefs = ref();
PrefApiService.getPrefData().then((res) => {
  prefs.value = res;
});
</script>
<template>
  <v-row align="center" justify="center">
    <AdminMenu />
  </v-row>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-row class="ma-2" no-gutters>
    <v-col>
      <div class="text-h6">新規パートナー登録</div>
      <addPartnerForm
        title="企業名"
        text="企業名を入力してください"
        class="w-100"
        :hideDetails="true"
      ></addPartnerForm>
      <addPartnerForm
        title="ID"
        text="IDを入力してください"
        class="w-100"
        :hideDetails="false"
        messages="半角英数・4文字以上で入力してください。大文字と小文字は区別されます。"
      ></addPartnerForm>
      <addPartnerForm
        title="パスワード"
        text="パスワードを入力してください"
        class="w-100"
        :hideDetails="false"
        messages="半角8文字以上、半角15文字で入力してください。大文字と小文字は区別さ英大文字・英小文字・数、字それぞれを最低1文字ずつ含む必要があります。"
      ></addPartnerForm>
      <addPostCodeForm
        title="郵便番号"
        class="w-100"
        :hideDetails="true"
      ></addPostCodeForm>
      <addPrefCodeForm
        title="都道府県"
        label="都道府県を選択"
        class="w-50"
        :hideDetails="true"
        :items="prefs"
      ></addPrefCodeForm>
      <addPartnerForm
        title="住所"
        text="住所を入力してください"
        class="w-100"
        :hideDetails="true"
      ></addPartnerForm>
      <addPartnerForm
        title="建物名"
        text="建物名を入力してください"
        class="w-100"
        :hideDetails="true"
      ></addPartnerForm>
      <addPartnerForm
        title="電話番号"
        text="電話番号を入力してください"
        class="w-100"
        :hideDetails="false"
        messages="例)03-0000-0000"
      ></addPartnerForm>
      <addPartnerForm
        title="FAX番号"
        text="FAX番号を入力してください"
        class="w-100"
        :hideDetails="false"
        messages="例)03-0000-0000"
      ></addPartnerForm>
      <addSwitchForm
        title="申込み検査ボタン"
        label="利用する"
        density="compact"
        :model="true"
      ></addSwitchForm>
      <ComponentButton text="更新" color="primary" class="mt-3" />
    </v-col>
    <v-col>
      <div class="text-h6">担当者登録</div>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
