<script setup lang="ts">
import { ref, defineEmits } from "vue";
import AdminMenu from "../components/AdminMenu.vue";
import ComponentButton from "../components/ButtonView.vue";
import addPartnerForm from "../components/addPartnerForm.vue";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
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
  <v-container class="mt-1">
    <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
    <div class="text-h5">新規パートナー登録</div>
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
      class="w-100"
      :hideDetails="true"
      :items="prefs"
    ></addPrefCodeForm>
    <ComponentButton text="更新" color="primary" class="mt-3" />
  </v-container>
</template>
<style lang="scss"></style>
