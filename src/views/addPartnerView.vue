<script setup lang="ts">
import { ref, Ref } from "vue";
import AdminMenu from "../components/AdminMenu.vue";
import ProgressView from "../components/ProgressView.vue";
import AlertView from "@/components/AlertView.vue";
import ComponentButton from "../components/ButtonView.vue";
import addPartnerForm from "../components/addPartnerForm.vue";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
import addSwitchForm from "../components/addSwitchForm.vue";
import { useRouter, useRoute } from "vue-router";
import PrefApiService from "@/services/PrefApiService";
import ElementApiService from "@/services/ElementApiService";
import LicenseApiService from "@/services/LicenseApiService";
import ComponentTextField from "../components/TextFieldView.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import UserApiService from "@/services/UserApiService";
import { useStoreUser } from "../store/user";
import {
  requiredValue,
  checkPassword,
  checkLoginID,
  checkEmailRequired,
} from "../plugins/validate";
import { displayStatus } from "@/plugins/const";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
const user = useStoreUser();
const router = useRouter();
const route = useRoute();
const tmpid = route.params.id;

const tab = ref();
const prefs = ref();
const elements = ref<Array<{ note?: string }>>([]);
const licenses = ref();
const post_code = ref();
const post1 = ref();
const post2 = ref();
const preftext = ref();
const addressText = ref();
const addressText2 = ref();
const tel = ref();
const fax = ref();
const registButton = ref(true);
const settingData = ref();
const settingLicense = ref();
const errorTab1 = ref(3);
const errorTab2 = ref(2);
const onSearch = (ev: string) => {
  licenses.value = LicenseApiService.getSearchData(ev);
};
PrefApiService.getPrefData().then((res) => {
  prefs.value = res;
});
ElementApiService.getElementData().then((res) => {
  elements.value = res;
});
LicenseApiService.getLicenseData().then((res) => {
  licenses.value = res.value;
});

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
const onChange = (e: string) => {
  preftext.value = e;
};
const licensesKey = ref<string[]>([]);
const licensesBody = ref<string[]>([]);
// const codes = ref([]);
const onlicense = (e: string, type: string) => {
  licensesKey.value.push(type);
  licensesBody.value.push(e);
};
const name = ref();
const login_id = ref();
const email = ref();
const password = ref();
const system_name = ref();
const person = ref();
const person_address = ref();
const person2 = ref();
const person_address2 = ref();
const person_tel = ref();
const licenseVal = ref({}) as any;
const loadingFlag = ref(false);
// 編集用データ取得
if (tmpid) {
  loadingFlag.value = true;
  UserApiService.getUserData({ id: tmpid }).then((rlt) => {
    const objWithData = rlt as {
      data: {
        name: string;
        login_id: string;
        post_code: string;
        post1: string;
        post2: string;
        pref: string;
        address1: string;
        address2: string;
        tel: string;
        fax: string;
        requestFlag: boolean;
        system_name: string;
        person: string;
        person_address: string;
        person2: string;
        person_address2: string;
        person_tel: string;
        licenses: number[];
        element1: string;
        element2: string;
        element3: string;
        element4: string;
        element5: string;
        element6: string;
        element7: string;
        element8: string;
        element9: string;
        element10: string;
        element11: string;
        element12: string;
        element13: string;
        element14: string;
      };
    };
    name.value = objWithData.data.name;
    login_id.value = objWithData.data.login_id;
    post_code.value = objWithData.data.post_code.replace(/undefined/g, "");
    let tmp = objWithData.data.post_code.split("-");
    post1.value = tmp[0];
    post2.value = tmp[1];
    preftext.value = objWithData.data.pref;
    addressText.value = objWithData.data.address1;
    addressText2.value = objWithData.data.address2;
    tel.value = objWithData.data.tel;
    fax.value = objWithData.data.fax;
    requestFlag.value = objWithData.data.requestFlag;
    system_name.value = objWithData.data.system_name;
    person.value = objWithData.data.person;
    person_address.value = objWithData.data.person_address;
    person2.value = objWithData.data.person2;
    person_address2.value = objWithData.data.person_address2;
    person_tel.value = objWithData.data.person_tel;
    const entries = Object.entries(objWithData.data.licenses);
    for (const [key, val] of entries) {
      licensesKey.value.push(key);
      licensesBody.value.push(val.toString());
    }

    licenseVal.value = objWithData.data.licenses;

    for (let i = 0; i < 14; i++) {
      if (!elements.value) elements.value = [];
      if (!elements.value[i]) elements.value[i] = {};
      const key = `element${i + 1}`;
      elements.value[i].note = (objWithData.data as any)[key] || "";
    }

    errorTab1.value = 0;
    errorTab2.value = 0;
    registButton.value = false;
    loadingFlag.value = false;
  });
}
const onBlur = async (e: string | boolean, type: string) => {
  const simpleMap: Record<string, Ref<any>> = {
    name,
    login_id,
    password,
    pref: preftext,
    address: addressText,
    address2: addressText2,
    tel,
    fax,
    system_name,
    person,
    person_address,
    person2,
    person_address2,
    person_tel,
  };
  if (type in simpleMap) {
    simpleMap[type].value = e;
    //return;
  }

  // element1〜element14 に対応
  const match = type.match(/^element(\d{1,2})$/);
  if (match) {
    const index = Number(match[1]) - 1;
    if (elements.value[index]) {
      elements.value[index].note = e;
    }
  }
  registButton.value = true;
  if (!tmpid) {
    errorTab1.value = 3;
    errorTab2.value = 2;
    if (name.value && name.value.length > 0) errorTab1.value -= 1;
    if (
      login_id.value &&
      ((await checkLoginID(login_id.value)) as boolean | string) == true
    ) {
      errorTab1.value -= 1;
    }
    if (checkPassword(password.value).length < 1) errorTab1.value -= 1;
  }

  if (requiredValue(person.value, "主担当者氏名").length < 1)
    errorTab2.value -= 1;
  if (requiredValue(person_address.value, "主担当者アドレス").length < 1)
    errorTab2.value -= 1;

  errorTab1.value = errorTab1.value < 0 ? 0 : errorTab1.value;
  errorTab2.value = errorTab2.value < 0 ? 0 : errorTab2.value;
  if (tmpid) {
    if (
      requiredValue(person.value, "主担当者氏名").length < 1 &&
      requiredValue(person_address.value, "主担当者アドレス").length < 1
    ) {
      registButton.value = false;
    }
  } else if (
    name.value &&
    ((await checkLoginID(login_id.value)) as boolean | string) == true &&
    checkPassword(password.value).length < 1 &&
    requiredValue(person.value, "主担当者氏名").length < 1 &&
    requiredValue(person_address.value, "主担当者アドレス").length < 1
  ) {
    registButton.value = false;
  }

  if (tmpid) {
    if (password.value && checkPassword(password.value).length > 1) {
      registButton.value = true;
    }
  }
};

const requestFlag = ref(true);
const registAlert = ref(false);

const addRegist = () => {
  loadingFlag.value = true;
  let post = post1.value + "-" + post2.value;
  settingData.value = {
    type: "partner",
    name: tmpid ? "" : name.value,
    login_id: tmpid ? "" : login_id.value,
    email: email.value,
    password: password.value,
    post_code: post,
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
    licensesBody: licensesBody.value,
    licensesKey: licensesKey.value,
  };

  // 1〜14のelementに対応するプロパティを動的に設定
  for (let i = 1; i <= 14; i++) {
    settingData.value[`element${i}`] = elements.value[i - 1]?.note || ""; // noteが無い場合は空文字をセット
  }

  if (tmpid) {
    settingData.value.id = tmpid;
    UserApiService.editPartnerData(settingData.value).then(() => {
      registButton.value = true;
      registAlert.value = true;
      loadingFlag.value = false;
    });
  } else {
    UserApiService.setPartner(settingData.value).then(() => {
      registButton.value = true;
      registAlert.value = true;
      loadingFlag.value = false;
    });
  }
};

const displayString = (type: boolean) => {
  return type ? displayStatus[1] : displayStatus[0];
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <v-row justify="center" v-if="!tmpid">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin
    :pageName="tmpid ? user.editPartner : user.addPartner"
  ></pankuzuAdmin>

  <p class="text-lowercase ml-2 text-caption">
    赤丸内の数が残り必須入力数になります。
  </p>
  <p class="text-lowercase ml-2 text-caption">
    担当者情報も必須です。担当者情報タブで担当者情報を入力してください。
  </p>
  <v-tabs v-model="tab">
    <v-tab value="1">
      <v-badge color="error" :content="errorTab1" floating>
        パートナー情報
      </v-badge>
    </v-tab>
    <v-tab value="2">
      <v-badge color="error" :content="errorTab2" floating>
        担当者情報
      </v-badge>
    </v-tab>
    <v-tab value="4">ライセンス</v-tab>
    <v-tab value="3">行動価値用要素名</v-tab>
  </v-tabs>

  <v-row no-gutters>
    <v-col cols="12" class="pa-2 ma-2">
      <AlertView
        type="success"
        :text="tmpid ? 'データ編集を行いました' : 'パートナー登録を行いました'"
        v-if="registAlert"
      ></AlertView>
      <div class="d-flex">
        <v-btn
          v-if="registAlert"
          class="mt-2"
          color="primary"
          variant="outlined"
          text="一覧に戻る"
          href="/list"
        ></v-btn>
        <ComponentButton
          :text="tmpid ? '編集' : '登録'"
          color="primary"
          class="my-2 ml-2"
          @onClick="addRegist()"
          :disabled="registButton"
        />
      </div>
      <v-window v-model="tab">
        <v-window-item value="1">
          パートナー企業情報を入力してください。
          <addPartnerForm
            title="企業名"
            text="企業名を入力してください"
            class="w-100"
            :hideDetails="`auto`"
            type="name"
            :requriredIcon="true"
            :displayTextValue="tmpid ? name : ''"
            :rules="requiredValue(name, '企業名')"
            @onBlur="(ev, type) => onBlur(ev, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="ログインID"
            text="ログインIDを入力してください"
            class="w-75"
            hideDetails="auto"
            :requriredIcon="true"
            type="login_id"
            :displayTextValue="tmpid ? login_id : ''"
            messages="半角英数・4文字以上で入力してください。大文字と小文字は区別されます。"
            :rules="checkLoginID(login_id) as any"
            @onBlur="(ev, type) => onBlur(ev, type)"
          ></addPartnerForm>

          <addPartnerForm
            title="パスワード"
            text="パスワードを入力してください"
            class="w-100"
            :hideDetails="false"
            messages="半角8文字以上、半角15文字で入力してください。大文字と小文字は区別さ英大文字・英小文字・数、字それぞれを最低1文字ずつ含む必要があります。"
            type="password"
            :value="password"
            :requriredIcon="true"
            @onBlur="(ev, type) => onBlur(ev, type)"
            :rules="checkPassword(password, '', tmpid)"
          ></addPartnerForm>
          <addPostCodeForm
            title="郵便番号"
            class="w-100"
            :value="post_code"
            :hideDetails="true"
            @onBlur="(e, type) => postBlur(e, type)"
          ></addPostCodeForm>
          <addPrefCodeForm
            title="都道府県"
            label="都道府県を選択"
            class="w-50"
            :hideDetails="true"
            :items="prefs"
            :value="preftext"
            type="pref"
            @onBlur="(e, type) => onBlur(e, type)"
            @onChange="(e) => onChange(e)"
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
            :value="addressText2 ?? ``"
            :hideDetails="true"
            type="address2"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="電話番号"
            :value="tel"
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
            :value="fax"
            :hideDetails="false"
            messages="例)03-0000-0000"
            type="fax"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addSwitchForm
            title="申込み検査ボタン"
            :label="displayString(requestFlag)"
            density="compact"
            :model="requestFlag"
            :tooltipflag="true"
            tooltipMessage="顧客が検査を申込むボタンの表示可否を選択します。"
            @onClick="(e) => (requestFlag = e ? false : true)"
          ></addSwitchForm>
          <addPartnerForm
            title="管理システム名"
            text="管理システム名を入力してください"
            class="w-100"
            :hideDetails="true"
            type="system_name"
            :value="system_name"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="2">
          担当者を入力してください。
          <addPartnerForm
            title="主担当者氏名"
            text="担当者氏名を入力してください"
            class="w-100"
            :requriredIcon="true"
            :value="person"
            hideDetails="auto"
            type="person"
            :rules="requiredValue(person, '主担当者氏名')"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="主担当者アドレス"
            text="担当者メールアドレスを入力してください"
            class="w-100"
            hideDetails="auto"
            :requriredIcon="true"
            :value="person_address"
            type="person_address"
            :rules="checkEmailRequired(person_address)"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="副担当者氏名"
            text="担当者氏名を入力してください"
            class="w-100"
            :hideDetails="true"
            :value="person2"
            type="person2"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="副担当者アドレス"
            text="担当者メールアドレスを入力してください"
            class="w-100"
            :hideDetails="true"
            :value="person_address2"
            type="person_address2"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
          <addPartnerForm
            title="担当者連絡先"
            text="担当者の連絡先を入力してください"
            class="w-100"
            :hideDetails="true"
            type="person_tel"
            :value="person_tel"
            @onBlur="(e, type) => onBlur(e, type)"
          ></addPartnerForm>
        </v-window-item>
        <v-window-item value="3">
          行動価値エクセルダウンロードで利用する要素名を変更する際に利用します。

          <addPartnerForm
            v-for="element in elements"
            :key="element.id"
            :title="element.text"
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
                    :value="licenseVal[value.code]"
                    :name="value.code"
                    @onBlur="(e, type) => onlicense(e, type)"
                  />
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
