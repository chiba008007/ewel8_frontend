<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from "vue";
import AdminMenu from "@/components/AdminMenu.vue";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import { useRouter, useRoute } from "vue-router";
import { createPartnerForm } from "@/types/partner";
import ButtonView from "@/components/ButtonView.vue";
import { checkLoginID } from "@/plugins/validate";

// tab用のコンポーネント
import addPartnerTabs from "./tabs/addPartnerTabs.vue";
import addLicenseTabs from "./tabs/addLicenseTabs.vue";
import AddElementTabs from "./tabs/addElementTabs.vue";
// 都道府県名
import { usePrefs } from "@/plugins/usePrefs";
const { prefs } = usePrefs();
// ライセンス名
import { useLicenses } from "@/plugins/useLicenses";
const { licenses, fetchLicenses } = useLicenses();

onMounted(async () => {
  await fetchLicenses();
});

// 要素名
import { useElements } from "@/plugins/useElements";
const { elements } = useElements();
// 値がそろった時に一度だけ初期化をする。非同期で後から来るデータを待つための仕組み
watch(
  () => elements.value, // 監視対象
  (els) => {
    if (!els?.length) return;
    if (form.elements.length) return;

    form.elements = els.map((e) => e.note ?? "");
  },
  { immediate: true } // すでに来てても実行
);

// ユーザ登録情報
import { useStoreUser } from "@/store/user";
const user = useStoreUser();

import { savePartner, fetchPartner } from "@/services/domains/partnerService";
import ProgressView from "@/components/ProgressView.vue";
import AlertView from "@/components/AlertView.vue";

const loadingFlag = ref(false);
const registAlert = ref(false);
const errorAlert = ref(false);
const isFormValid = ref(false);
const route = useRoute();

const partnerId =
  typeof route.params.id === "string" ? route.params.id : undefined;

const tab = ref<"partner" | "person" | "element" | "license">("partner");
const form = reactive(createPartnerForm());

import { useRequiredCounter } from "@/composables/useRequiredCounter";

const errorTab = ref(5);
useRequiredCounter(
  [
    () => form.name,
    () => form.login_id,
    () => (partnerId ? true : form.password),
    () => form.person,
    () => form.person_address,
  ],
  errorTab
);

const router = useRouter();
// 登録ボタン押下時の登録処理
const submit = async () => {
  // 同期チェック（子から渡ってきた結果）
  if (!isFormValid.value) {
    return;
  }
  loadingFlag.value = true;
  errorAlert.value = false;
  try {
    // 非同期チェック（ログインID重複）
    const loginIdResult = await checkLoginID(form.login_id, true, partnerId);
    if (loginIdResult !== true) {
      // エラーメッセージ表示（例）
      throw new Error(loginIdResult);
    }
    await savePartner(form, partnerId);
    router.push("/list");
    //registAlert.value = true;
  } catch (error) {
    console.log(error);
    registAlert.value = false;
    errorAlert.value = true;
  } finally {
    loadingFlag.value = false;
  }
};
// 編集用データ取得
onMounted(async () => {
  if (!partnerId) return;

  loadingFlag.value = true;
  try {
    const data = await fetchPartner(partnerId);
    const res = data?.data;

    const post = res.post_code.split("-");
    for (let i = 0; i < 14; i++) {
      form.elements[i] = res["element" + (i + 1)]
        ? res["element" + (i + 1)]
        : elements.value[i].note;
    }
    const licenseValues: Record<string, number> = res.licenses ?? {};

    licenses.value = Object.values(licenses.value).map((license) => ({
      code: license.code,
      text: license.text,
      list: Object.values(license.list).map((item) => ({
        code: item.code,
        text: item.text,
        value: licenseValues[item.code] ?? 0,
      })),
    }));

    // form に流し込む
    Object.assign(form, {
      ...res,
      post1: post[0],
      post2: post[1],
      pref: res.pref,
    });
  } catch (e) {
    errorAlert.value = true;
  } finally {
    loadingFlag.value = false;
  }
});

// ライセンス登録
const onLicenseInput = (code: string, num: number) => {
  const idx = form.licensesKey.indexOf(code);

  if (idx >= 0) {
    form.licensesBody[idx] = num;
  } else {
    form.licensesKey.push(code);
    form.licensesBody.push(num);
  }
};
// 要素登録
const updateElement = (index: number, val: string) => {
  form.elements[index] = val;
};
</script>
<template>
  <div class="partner-page">
    <ProgressView v-if="loadingFlag" />
    <header>
      <v-row justify="center">
        <AdminMenu />
      </v-row>
      <!-- パンくず -->
      <section>
        <pankuzuAdmin
          :pageName="partnerId ? user.editPartner : user.addPartner"
        ></pankuzuAdmin>
      </section>
    </header>
    <main>
      <p>
        赤丸内の数が残り必須入力数になります。
        担当者情報も必須です。担当者情報タブで担当者情報を入力してください。
      </p>

      <!-- tabs / form はここ -->
      <v-tabs v-model="tab" class="my-2">
        <v-tab value="partner">
          <v-badge color="error" :content="errorTab" floating
            >パートナー情報</v-badge
          >
        </v-tab>
        <v-tab value="license">ライセンス</v-tab>
        <v-tab value="element">行動価値用要素名</v-tab>
      </v-tabs>
      <AlertView
        type="success"
        :text="
          partnerId ? 'データ編集を行いました' : 'パートナー登録を行いました'
        "
        v-if="registAlert"
      />
      <AlertView
        type="warning"
        :text="`IDが重複しています。`"
        v-if="errorAlert"
      />
      <ButtonView
        text="登録"
        color="success"
        class="my-2 w-25"
        @onClick="submit"
        :disabled="!isFormValid"
      ></ButtonView>
      <v-window v-model="tab">
        <v-window-item value="partner">
          <!-- パートナー企業情報 -->
          <addPartnerTabs
            :form="form"
            :prefs="prefs"
            :partnerId="Number(partnerId)"
            @update:isFormValid="isFormValid = $event"
          />
        </v-window-item>
        <v-window-item value="license">
          <!-- ライセンス設定 -->
          <addLicenseTabs
            v-if="licenses.length"
            :form="form"
            :licenses="licenses"
            @license-input="onLicenseInput"
          />
        </v-window-item>
        <v-window-item value="element">
          <!-- 行動価値用要素 -->
          <AddElementTabs
            :values="form.elements"
            :elements="elements"
            @update="updateElement"
          />
        </v-window-item>
      </v-window>
    </main>
  </div>
</template>
<style lang="scss"></style>
