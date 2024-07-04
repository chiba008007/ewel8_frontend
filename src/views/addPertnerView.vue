<script setup lang="ts">
import { ref, defineEmits } from "vue";
import AdminMenu from "../components/AdminMenu.vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentCheckbox from "../components/CheckboxView.vue";
import addPartnerForm from "../components/addPartnerForm.vue";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
import addSwitchForm from "../components/addSwitchForm.vue";
import { useRouter } from "vue-router";
import PrefApiService from "@/services/PrefApiService";
import ElementApiService from "@/services/ElementApiService";
import LicenseApiService from "@/services/LicenseApiService";
import PdfApiService from "@/services/PdfApiService";
import ComponentTextField from "../components/TextFieldView.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";

import UserApiService from "@/services/UserApiService";

const router = useRouter();
const pankuzu = [
  { title: "HOME", href: router.resolve({ name: "List" }).href },
  { title: "新規パートナー登録" },
];
const tab = ref();
const prefs = ref();
const elements = ref();
const licenses = ref();
const pdfs = ref();
const post1 = ref();
const post2 = ref();
const preftext = ref();
const addressText = ref();
const addressText2 = ref();
const tel = ref();
const fax = ref();
const registButton = ref(false);
const settingData = ref();
const onSearch = (ev: string) => {
  licenses.value = LicenseApiService.getSearchData(ev);
};
PrefApiService.getPrefData().then((res) => {
  prefs.value = res;
});
ElementApiService.getElementData().then((res) => {
  elements.value = res;
});
LicenseApiService.getElementData().then((res) => {
  licenses.value = res.value;
});
PdfApiService.getElementData().then((res) => {
  pdfs.value = res.value;
});
const pdfList = ref([]);
const pdfSelectLists = ref();
const onChange = (event: Event) => {
  if (event.target) {
    let str = (event.target as HTMLInputElement).value;
    pdfList.value.push(str as never);
  }
  let arr = [...pdfList.value];
  pdfSelectLists.value = arr.filter(
    (x) => arr.indexOf(x) === arr.lastIndexOf(x)
  );
};
const postBlur = (e: string, type: string) => {
  if (type === "post1") post1.value = e;
  if (type === "post2") post2.value = e;
  if (post1.value && post2.value) {
    new YubinBangoCore(post1.value + post2.value, function (addr: any) {
      preftext.value = addr.region;
      addressText.value = addr.street;
    });
  }
};

const name = ref();
const email = ref();
const password = ref();
const onBlur = (e: string, type: string) => {
  console.log(e);
  console.log(type);
  if (type === "name") name.value = e;
  if (type === "email") email.value = e;
  if (type === "password") password.value = e;
  if (type === "pref") preftext.value = e;
  if (type === "address") addressText.value = e;
  if (type === "address2") addressText2.value = e;
  if (type === "tel") tel.value = e;
  if (type === "fax") fax.value = e;
};
const addRegist = () => {
  settingData.value = {
    type: "partner",
    name: name.value,
    email: email.value,
    password: password.value,
    post_code: post1.value + "-" + post2.value,
    pref: preftext.value,
    address1: addressText.value,
    address2: addressText2.value,
    tel: tel.value,
    fax: fax.value,
  };
  console.log(settingData.value);
  if (formValidate()) {
    UserApiService.setPartner(settingData.value).then((res) => {
      console.log(res);
      alert(1111);
      // alertFlag.value = res.data === 1 ?? true;
    });
  }
};
const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};
const formValidate = () => {
  return true;
};
</script>
<template>
  <v-row justify="center">
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
    <v-col cols="12" class="pa-2 ma-2">
      <ComponentButton
        text="登録"
        color="primary"
        class="my-3"
        @onClick="addRegist()"
        :disabled="registButton"
      />
      <v-window v-model="tab">
        <v-window-item value="1">
          パートナー企業情報を入力してください。
          <addPartnerForm
            title="企業名"
            text="企業名を入力してください"
            class="w-100"
            :hideDetails="`auto`"
            type="name"
            :value="name"
            :rules="(val:string|any) => rules(val, '企業名は必須入力です')"
            @onBlur="(ev, type) => onBlur(ev, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="メールアドレス"
            text="メールアドレスを入力してください"
            class="w-100"
            :hideDetails="false"
            messages="半角英数・4文字以上で入力してください。大文字と小文字は区別されます。"
            type="email"
            :value="email"
            @onBlur="(ev, type) => onBlur(ev, type)"
            :rules="(val:string|any) => rules(val, 'IDは必須入力です')"
          ></addPartnerForm>
          <addPartnerForm
            title="パスワード"
            text="パスワードを入力してください"
            class="w-100"
            :hideDetails="false"
            messages="半角8文字以上、半角15文字で入力してください。大文字と小文字は区別さ英大文字・英小文字・数、字それぞれを最低1文字ずつ含む必要があります。"
            type="password"
            :value="password"
            @onBlur="(ev, type) => onBlur(ev, type)"
            :rules="(val:string|any) => rules(val, 'パスワードは必須入力です')"
          ></addPartnerForm>
          <addPostCodeForm
            title="郵便番号"
            class="w-100"
            :hideDetails="true"
            @onBlur="(e, type) => postBlur(e, type)"
          ></addPostCodeForm>
          <addPrefCodeForm
            title="都道府県"
            label="都道府県を選択"
            class="w-50"
            :hideDetails="true"
            :items="prefs"
            :value="preftext ?? ``"
            type="pref"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPrefCodeForm>
          <addPartnerForm
            title="住所"
            text="住所を入力してください"
            class="w-100"
            :hideDetails="true"
            :value="addressText ?? ``"
            type="address"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="建物名"
            text="建物名を入力してください"
            class="w-100"
            :hideDetails="true"
            type="address2"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="電話番号"
            text="電話番号を入力してください"
            class="w-100"
            :hideDetails="false"
            messages="例)03-0000-0000"
            type="tel"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="FAX番号"
            text="FAX番号を入力してください"
            class="w-100"
            :hideDetails="false"
            messages="例)03-0000-0000"
            type="fax"
            @onBlur="(e, type) => onBlur(e, type)"
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

          <addPartnerForm
            v-for="element in elements"
            :key="element.id"
            :title="element.note"
            :value="element.note"
            text="要素名を入力してください"
            class="w-100"
            :hideDetails="true"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="4">
          <div class="my-4">
            ライセンス名検索
            <ComponentTextField
              type="text"
              density="compact"
              variant="outlined"
              class="w-25"
              placeholder="ライセンス名を入力してください"
              @onKeyup="onSearch($event)"
            />
          </div>
          ライセンスを登録する検査の登録数を入力してください。(半角数値)

          <v-list v-for="license in licenses" :key="license.code">
            <v-list-item>
              <v-list-item-title
                >{{ license.text }}({{ license.code }})
              </v-list-item-title>
              <v-row no-gutters>
                <v-col
                  v-for="value in license.list"
                  :key="value.code"
                  cols="2"
                  class="col pa-1"
                >
                  {{ value.code }}
                  <ComponentTextField
                    type="number"
                    density="compact"
                    variant="outlined"
                    placeholder="0"
                  />
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="5">
          会員自動登録の際に出力されるPDFを選択してください。
          <v-row class="mt-3">
            <v-col cols="4" v-for="(pdf, index) in pdfs" :key="pdf">
              <ComponentCheckbox
                :label="pdf"
                :value="index"
                selected="selected"
                @change="(event:Event) => onChange(event)"
              ></ComponentCheckbox>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
