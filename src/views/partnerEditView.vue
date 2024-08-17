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

const route = useRoute();
const regex = /(\d+)(?!.*\d)/;
const isPortal = ref(route.path.match(regex));
const paramId = isPortal.value ? isPortal.value[0] : 0;
const router = useRouter();
const user = useStoreUser();
const userid = (user.userdata as any).id;
const userType = (user.userdata as any).type;
const post1 = ref();
const post2 = ref();
const preftext = ref();
const addressText = ref();
const addressText2 = ref();
const tab = ref(0);
const prefs = ref();

const tanto_name = ref();
const tanto_address = ref();
const tanto_busyo = ref();
const tanto_tel1 = ref();
const tanto_tel2 = ref();
const tanto_name2 = ref();
const tanto_address2 = ref();

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
  console.log(entries);
  userDetail.value = entries;
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

const onBlur = (e: string | boolean, type: string) => {
  console.log("blur");
};

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};
</script>
<template>
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
                class="w-25"
                :passwordFlag="true"
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
                :value="addressText ?? ``"
                type="address"
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
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-1">
            <v-col cols="12" class="pa-2 ma-2">
              <addPartnerForm
                title="担当者氏名"
                text="担当者氏名を入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="tanto_name"
                :value="tanto_name"
                :requriredIcon="true"
                :rules="(val:string|any) => rules(val, '担当者氏名は必須入力です')"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="担当者アドレス"
                text="担当者アドレスを入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="tanto_address"
                :value="tanto_address"
                :requriredIcon="true"
                :rules="(val:string|any) => rules(val, '担当者アドレスは必須入力です')"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="部署名"
                text="部署名を入力してください"
                class="w-50"
                :hideDetails="`auto`"
                type="tanto_busyo"
                :value="tanto_busyo"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="連絡先1"
                text="連絡先1を入力してください"
                class="w-50"
                :hideDetails="`auto`"
                type="tanto_tel1"
                :value="tanto_tel1"
                messages="例)03-0000-0000"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="連絡先2"
                text="連絡先2を入力してください"
                class="w-50"
                :hideDetails="`auto`"
                type="tanto_tel2"
                :value="tanto_tel2"
                messages="例)03-0000-0000"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="担当者氏名2"
                text="担当者氏名2を入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="tanto_name2"
                :value="tanto_name2"
                @onBlur="(ev, type) => onBlur(ev, type)"
              ></addPartnerForm>
              <addPartnerForm
                title="担当者アドレス2"
                text="担当者アドレス2を入力してください"
                class="w-100"
                :hideDetails="`auto`"
                type="tanto_address2"
                :value="tanto_address2"
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
