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
const tab = ref();
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

  <v-tabs v-model="tab">
    <v-tab value="1">パートナー情報</v-tab>
    <v-tab value="2">担当者情報</v-tab>
    <v-tab value="3">行動価値用要素名</v-tab>
    <v-tab value="4">ライセンス</v-tab>
    <v-tab value="5">出力PDF</v-tab>
  </v-tabs>

  <v-row no-gutters>
    <v-col cols="12" class="pa-2">
      <ComponentButton text="登録" color="primary" class="my-3" />
      <v-window v-model="tab">
        <v-window-item value="1">
          パートナー企業情報を入力してください。
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
            label="表示する"
            density="compact"
            :model="true"
            :tooltipflag="true"
            tooltipMessage="顧客が検査を申込むボタンの表示可否を選択します。"
          ></addSwitchForm>
          <addPartnerForm
            title="管理システム名"
            text="管理システム名を入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="2">
          担当者を入力してください。
          <addPartnerForm
            title="主担当者氏名"
            text="担当者氏名を入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
          <addPartnerForm
            title="主担当者アドレス"
            text="担当者メールアドレスを入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
          <addPartnerForm
            title="副担当者氏名"
            text="担当者氏名を入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
          <addPartnerForm
            title="副担当者アドレス"
            text="担当者メールアドレスを入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
          <addPartnerForm
            title="担当者連絡先"
            text="担当者の連絡先を入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="3">
          行動価値エクセルダウンロードで利用する要素名を変更する際に利用します。
        </v-window-item>
        <v-window-item value="4">
          ライセンスを登録する検査種類の表示名を選択してください。
        </v-window-item>
        <v-window-item value="5">
          会員自動登録の際に出力されるＰＤＦを選択してください。
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
