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
const settingLicense = ref();
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

const licensesKey = ref<string[]>([]);
const licensesBody = ref<string[]>([]);
// const codes = ref([]);
const onlicense = (e: string, type: string) => {
  licensesKey.value.push(type);
  licensesBody.value.push(e);
};
const name = ref();
const email = ref();
const password = ref();
const system_name = ref();
const person = ref();
const person_address = ref();
const person2 = ref();
const person_address2 = ref();
const person_tel = ref();

const onBlur = (e: string | boolean, type: string) => {
  if (type === "name") name.value = e;
  if (type === "email") email.value = e;
  if (type === "password") password.value = e;
  if (type === "pref") preftext.value = e;
  if (type === "address") addressText.value = e;
  if (type === "address2") addressText2.value = e;
  if (type === "tel") tel.value = e;
  if (type === "fax") fax.value = e;
  if (type === "system_name") system_name.value = e;
  if (type === "person") person.value = e;
  if (type === "person_address") person_address.value = e;
  if (type === "person2") person2.value = e;
  if (type === "person_address2") person_address2.value = e;
  if (type === "person_tel") person_tel.value = e;
  if (type === "element1") elements.value[0].note = e;
  if (type === "element2") elements.value[1].note = e;
  if (type === "element3") elements.value[2].note = e;
  if (type === "element4") elements.value[3].note = e;
  if (type === "element5") elements.value[4].note = e;
  if (type === "element6") elements.value[5].note = e;
  if (type === "element7") elements.value[6].note = e;
  if (type === "element8") elements.value[7].note = e;
  if (type === "element9") elements.value[8].note = e;
  if (type === "element10") elements.value[9].note = e;
  if (type === "element11") elements.value[10].note = e;
  if (type === "element12") elements.value[11].note = e;
};
const errormessage = ref("");
const onMailup = (e: string, type: string) => {
  if (e) {
    let tmp = UserApiService.checkEmail(e);
    tmp
      .then(function (rlt) {
        if (rlt.data == true) {
          errormessage.value = "メールアドレスが重複しています。";
        }
      })
      .catch(function () {
        errormessage.value = "";
      });
  }
};
const requestFlag = ref<boolean>(true);
const onUpdate = (e: boolean) => {
  requestFlag.value = e;
};
const registAlert = ref(false);
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
    requestFlag: requestFlag.value,
    system_name: system_name.value,
    person: person.value,
    person_address: person_address.value,
    person2: person2.value,
    person_address2: person_address2.value,
    person_tel: person_tel.value,
    element1: elements.value[0].note,
    element2: elements.value[1].note,
    element3: elements.value[2].note,
    element4: elements.value[3].note,
    element5: elements.value[4].note,
    element6: elements.value[5].note,
    element7: elements.value[6].note,
    element8: elements.value[7].note,
    element9: elements.value[8].note,
    element10: elements.value[9].note,
    element11: elements.value[10].note,
    element12: elements.value[11].note,
  };
  if (formValidate()) {
    UserApiService.setPartner(settingData.value).then((res) => {
      settingLicense.value = {
        res: res,
        licensesKey: licensesKey.value,
        licensesBody: licensesBody.value,
        pdfList: pdfList.value,
      };
      UserApiService.setLicense(settingLicense.value).then((res) => {
        console.log("success");
        registButton.value = true;
        registAlert.value = true;
      });
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
      <div>
        <v-alert text="パートナー登録を行いました" v-if="registAlert"></v-alert>
        <v-btn
          v-if="registAlert"
          class="mt-2"
          color="primary"
          variant="outlined"
          text="一覧に戻る"
          href="/list"
        ></v-btn>
      </div>
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
            :errormessage="errormessage"
            type="email"
            :value="email"
            @onBlur="(ev, type) => onBlur(ev, type)"
            @onKeyup="(ev, type) => onMailup(ev, type)"
            :rules="(val:string|any) => rules(val, 'メールアドレスは必須です')"
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
            :label="`表示する`"
            density="compact"
            type="requestFlag"
            :model="true"
            :tooltipflag="true"
            tooltipMessage="顧客が検査を申込むボタンの表示可否を選択します。"
            @onUpdate="(e) => onUpdate(e)"
          ></addSwitchForm>
          <addPartnerForm
            title="管理システム名"
            text="管理システム名を入力してください"
            class="w-100"
            :hideDetails="true"
            type="system_name"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="2">
          担当者を入力してください。
          <addPartnerForm
            title="主担当者氏名"
            text="担当者氏名を入力してください"
            class="w-100"
            :hideDetails="true"
            type="person"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="主担当者アドレス"
            text="担当者メールアドレスを入力してください"
            class="w-100"
            :hideDetails="true"
            type="person_address"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="副担当者氏名"
            text="担当者氏名を入力してください"
            class="w-100"
            :hideDetails="true"
            type="person2"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="副担当者アドレス"
            text="担当者メールアドレスを入力してください"
            class="w-100"
            :hideDetails="true"
            type="person_address2"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="担当者連絡先"
            text="担当者の連絡先を入力してください"
            class="w-100"
            :hideDetails="true"
            type="person_tel"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="3">
          行動価値エクセルダウンロードで利用する要素名を変更する際に利用します。

          <addPartnerForm
            v-for="element in elements"
            :key="element.id"
            :title="element.note + element.id"
            :value="element.note"
            text="要素名を入力してください"
            class="w-100"
            :hideDetails="true"
            :type="`element` + element.id"
            @onBlur="(e, type) => onBlur(e, type)"
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
                    :name="value.code"
                    @onBlur="(e, type) => onlicense(e, type)"
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
