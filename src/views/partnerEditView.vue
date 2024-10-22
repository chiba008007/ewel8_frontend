<script setup lang="ts">
import { ref, defineEmits } from "vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";
import UserApiService from "@/services/UserApiService";

import addPartnerForm from "../components/addPartnerForm.vue";
import addPostCodeForm from "../components/addPostCodeForm.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import PrefApiService from "@/services/PrefApiService";
import addPrefCodeForm from "../components/addPrefCodeForm.vue";
import ComponentButton from "../components/ButtonView.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ComponentAlert from "../components/AlertView.vue";
import { checkEmail, checkPassword } from "../plugins/validate";

const route = useRoute();
const regex = /(\d+)(?!.*\d)/;
const isPortal = ref(route.path.match(regex));
const paramId = isPortal.value ? isPortal.value[0] : 0;
const router = useRouter();
const user = useStoreUser();
const userid = (user.userdata as any).id;
const userType = (user.userdata as any).type;
const password = ref();
const post = ref();
const post1 = ref();
const post2 = ref();
const preftext = ref();
const addressText = ref();
const addressText2 = ref();
const tel = ref();
const fax = ref();

const tab = ref(0);
const prefs = ref();

const person = ref();
const person_address = ref();
const person_tel = ref();
const person2 = ref();
const person_address2 = ref();

const errorAlertFlag = ref(false);
const successAlertFlag = ref(false);

PrefApiService.getPrefData().then((res) => {
  prefs.value = res;
});

// 管理者ではないときログインした人のIDとパラメータのIDが同じ確認
if (userType != "admin") {
  user.sameIdChecked(userid, paramId as number);
}
const pankuzu = [] as any | object;
pankuzu.push({
  title: "HOME",
  href: router.resolve({ name: "List" }).href,
});
pankuzu.push({
  title: "顧客情報一覧",
  href: router.resolve({ name: "customerList", params: { id: paramId } }).href,
});
pankuzu.push({ title: "企業情報変更" });

const tmp = {
  partnerId: paramId,
  type: "partner",
};
const userDetail = ref();
UserApiService.getPartnerDetail(tmp).then((res) => {
  const entries = (res as any).data.user;
  userDetail.value = entries;
  post.value = userDetail.value.post_code;
  preftext.value = userDetail.value.pref;
  addressText.value = userDetail.value.address1;
  addressText2.value = userDetail.value.address2;
  tel.value = userDetail.value.tel;
  fax.value = userDetail.value.fax;
  person.value = userDetail.value.person;
  person_address.value = userDetail.value.person_address;
  person_tel.value = userDetail.value.person_tel;
  person2.value = userDetail.value.person2;
  person_address2.value = userDetail.value.person_address2;
});

const postBlur = (e: string, type: string) => {
  if (type === "post1") post1.value = e;
  if (type === "post2") post2.value = e;
  if (post1.value && post2.value) {
    post.value = post1.value + "-" + post2.value;
    new YubinBangoCore(post1.value + post2.value, function (addr: any) {
      preftext.value = addr.region;
      addressText.value = addr.street;
    });
  }
};

const onBlur = (e: string | boolean, type: string) => {
  if (type === "password") password.value = e;
  if (type === "pref") preftext.value = e;
  if (type === "addressText") addressText.value = e;
  if (type === "addressText2") addressText2.value = e;
  if (type === "tel") tel.value = e;
  if (type === "fax") fax.value = e;
  if (type === "person") person.value = e;
  if (type === "person_address") person_address.value = e;
  if (type === "person_tel") person_tel.value = e;
  if (type === "person2") person2.value = e;
  if (type === "person_address2") person_address2.value = e;
};

const registButton = ref(false);
const rules = (value: string | null, text: string) => {
  if (!value) {
    return text;
  }
  return null;
};

const addRegist = () => {
  errorAlertFlag.value = false;

  var tmp = {
    id: paramId,
    password: password.value,
    post_code: post.value,
    pref: preftext.value,
    address1: addressText.value,
    address2: addressText2.value,
    tel: tel.value,
    fax: fax.value,
    person: person.value,
    person_address: person_address.value,
    person2: person2.value,
    person_address2: person_address2.value,
    person_tel: person_tel.value,
  };
  successAlertFlag.value = false;
  UserApiService.editPartner(tmp).then((res) => {
    successAlertFlag.value = true;
  });
};
</script>
<template>
  <PartnerAdmin />
  <v-row align="center" justify="center">
    <CustomerMenu />
  </v-row>
  <v-row>
    <v-col class="ma-1">
      <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>

      <v-row no-gutters>
        <v-col cols="12" class="pa-2 ma-2">
          <ComponentButton
            text="登録"
            color="primary"
            class="my-3"
            @onClick="addRegist()"
            :disabled="registButton"
          />
        </v-col>
      </v-row>

      <v-tabs v-model="tab">
        <v-tab value="1">企業情報変更</v-tab>
        <v-tab value="2">行動価値用要素名</v-tab>
      </v-tabs>
      <ComponentAlert
        v-if="errorAlertFlag"
        type="error"
        text="登録に失敗しました"
      ></ComponentAlert>
      <ComponentAlert
        v-if="successAlertFlag"
        type="success"
        text="登録に成功しました"
      ></ComponentAlert>
      <v-window v-model="tab" class="mt-2">
        <v-window-item value="1">
          <v-row no-gutters class="mt-0">
            <v-col cols="12" class="pa-2 ma-2">
              <addPartnerForm
                title="企業名"
                :hideDetails="`auto`"
                :displayTextValue="userDetail?.name"
              ></addPartnerForm>
              <addPartnerForm
                title="ID"
                :hideDetails="`auto`"
                :displayTextValue="userDetail?.email"
              ></addPartnerForm>
              <addPartnerForm
                title="パスワード"
                :hideDetails="`auto`"
                class="w-75"
                :passwordFlag="true"
                :maxlength="15"
                :rules="checkPassword(password, 'edit')"
                @onBlur="(e, type) => onBlur(e, 'password')"
              ></addPartnerForm>
              <addPostCodeForm
                title="郵便番号"
                class="w-100"
                :hideDetails="true"
                :value="post"
                type="post"
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
                type="addressText"
                @onBlur="(e, type) => onBlur(e, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="建物名"
                text="建物名を入力してください"
                class="w-100"
                :hideDetails="true"
                :value="addressText2 ?? ``"
                type="addressText2"
                @onBlur="(e, type) => onBlur(e, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="電話番号"
                text="電話番号を入力してください"
                class="w-100"
                :hideDetails="false"
                messages="例)03-0000-0000"
                :value="tel ?? ``"
                type="tel"
                @onBlur="(e, type) => onBlur(e, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="FAX番号"
                text="FAX番号を入力してください"
                class="w-100"
                :hideDetails="false"
                messages="例)03-0000-0000"
                :value="fax ?? ``"
                type="fax"
                @onBlur="(e, type) => onBlur(e, type)"
              ></addPartnerForm>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col cols="12" class="pa-2 ma-2">
              <addPartnerForm
                title="主担当者氏名"
                text="主担当者氏名を入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="person"
                :value="person"
                :requriredIcon="true"
                :rules="(val:string|any) => rules(val, '主担当者氏名は必須入力です')"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="主担当者アドレス"
                text="主担当者アドレスを入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="person_address"
                :value="person_address"
                :requriredIcon="true"
                :rules="(val:string|any) => rules(val, '主担当者アドレスは必須入力です')"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="連絡先"
                text="連絡先を入力してください"
                class="w-50"
                :hideDetails="`auto`"
                type="person_tel"
                :value="person_tel"
                messages="例)03-0000-0000"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="副担当者氏名"
                text="副担当者氏名を入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="person2"
                :value="person2"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="副担当者アドレス"
                text="副担当者アドレスを入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="person_address2"
                :value="person_address2"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="2">
          <v-table class="bg-blue-lighten-4">
            <thead class="bg-blue-darken-1">
              <tr>
                <td class="pa-3">
                  行動価値用要素名
                  <br />
                  ※行動価値エクセルダウンロードで利用する要素名になります。
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="bg-white">自己感情モニタリング力</td>
              </tr>
              <tr>
                <td class="bg-white">客観的自己評価力</td>
              </tr>
              <tr>
                <td class="bg-white">自己肯定力</td>
              </tr>
              <tr>
                <td class="bg-white">コントロール＆アチーブメント力</td>
              </tr>
              <tr>
                <td class="bg-white">ビジョン創出力</td>
              </tr>
              <tr>
                <td class="bg-white">ポジティブ思考力</td>
              </tr>
              <tr>
                <td class="bg-white">対人共感力</td>
              </tr>
              <tr>
                <td class="bg-white">状況察知力</td>
              </tr>
              <tr>
                <td class="bg-white">ホスピタリティ発揮力</td>
              </tr>
              <tr>
                <td class="bg-white">リーダーシップ発揮力</td>
              </tr>
              <tr>
                <td class="bg-white">アサーション発揮力</td>
              </tr>
              <tr>
                <td class="bg-white">集団適応力</td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
