<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import addPartnerForm from "@/components/addPartnerForm.vue";
import addInfoDateForm from "@/components/addInfoDateForm.vue";
import addPrefCodeForm from "@/components/addPrefCodeForm.vue";
import CheckboxView from "@/components/CheckboxView.vue";
import { DISPLAY_TERM } from "@/plugins/const";
import addInfoTextareaForm from "@/components/addInfoTextareaForm.vue";
import AddInfoFileUploadForm from "@/components/addInfoFileUploadForm.vue";
import { informationType } from "@/types/informationType";
import InformationApiService from "@/services/InformationApiService";
import { REQUIRED_MESSAGE } from "@/plugins/const";
import type { VForm } from "vuetify/components";
import TextFieldView from "@/components/TextFieldView.vue";
import dayjs from "dayjs";

const user = useStoreUser();
const flashMessage = ref();
const error = ref();
const filepath = ref();
const router = useRouter();
const infoForm = ref<VForm | null>(null);
const partners = ref();
const searchPartner = ref("");
const checkedPartners = ref<number[]>([]);
const route = useRoute();
const paramId = route.params.id;
const form = ref<informationType>({
  title: "",
  started_at: "",
  ended_at: "",
  start_year: "",
  start_month: "",
  start_day: "",
  start_time: "",
  start_hour: "",
  end_year: "",
  end_month: "",
  end_day: "",
  end_time: "",
  end_hour: "",
  display: "",
  note: "",
  file: null,
  delFlag: false,
});

onMounted(async () => {
  // 表示個別代理店
  const result = await InformationApiService.getUser({ id: paramId });
  partners.value = result.data.users;
  // データ取得時の初期値を指定
  form.value.title = result.data["information"].title;
  const st = dayjs(result.data["information"].started_at);
  form.value.start_year = String(st.year());
  form.value.start_month = String(st.month() + 1);
  form.value.start_day = String(st.date());
  form.value.start_hour = String(st.hour());
  form.value.start_time = String(st.minute());
  const ed = dayjs(result.data["information"].ended_at);
  form.value.end_year = String(ed.year());
  form.value.end_month = String(ed.month() + 1);
  form.value.end_day = String(ed.date());
  form.value.end_hour = String(ed.hour());
  form.value.end_time = String(ed.minute());
  form.value.display = result.data["information"].display;
  form.value.note = result.data["information"].note;
  filepath.value = result.data["information"].file;

  const info = result.data.information;
  if (info && Array.isArray(info.viewers)) {
    info.viewers.forEach((viewer: any, index: number) => {
      checkedPartners.value[index] = viewer.id;
    });
  }
});
// パートナー一覧の絞り込みをする
const filteredPartners = computed(() => {
  if (!searchPartner.value) return partners.value;
  return partners.value.filter((p: any) =>
    p.name.includes(searchPartner.value)
  );
});

// チェックの状態を管理したい
const onCheck = (checked: boolean, id: number) => {
  if (checked) {
    checkedPartners.value.push(id);
  } else {
    checkedPartners.value = checkedPartners.value.filter((v) => v !== id);
  }
};

// バリデーションの管理
const isValid = computed(() => {
  return infoForm.value?.isValid ?? false;
});

// 表示期間をform変数に指定
const updateForm = <K extends keyof informationType>(
  key: K,
  value: informationType[K]
) => {
  form.value[key] = value;
};
const onRegist = () => {
  // 日付の補正
  form.value.started_at =
    form.value.start_year +
    "-" +
    form.value.start_month +
    "-" +
    form.value.start_day +
    " " +
    form.value.start_hour +
    ":" +
    form.value.start_time;
  form.value.ended_at =
    form.value.end_year +
    "-" +
    form.value.end_month +
    "-" +
    form.value.end_day +
    " " +
    form.value.end_hour +
    ":" +
    form.value.end_time;

  const users = checkedPartners.value.map((id) => ({ user_id: id }));

  const fd = new FormData();
  Object.entries(form.value).forEach(([key, value]) => {
    // ファイルだけ特別扱い
    if (key === "file") {
      if (value instanceof File) {
        fd.append("file", value); // File のときだけ追加する
      }
      return; // file の処理はここで終了
    }

    if (typeof value === "boolean") {
      fd.append(key, value ? "1" : "0");
    } else {
      fd.append(key, value ?? "");
    }
  });
  fd.append("users", JSON.stringify(users));
  fd.append("id", String(paramId));
  InformationApiService.setInfoList(fd).then((res: any) => {
    if (res.data.status) {
      router.push(router.resolve({ name: "information" }).href);
    } else {
      alert("登録失敗");
    }
  });
};
</script>
<template>
  <v-row justify="center">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin
    :pageName="user.informationData"
    pagehref="information"
    :pageName2="user.informationDataSet"
  ></pankuzuAdmin>

  <p class="text-h6 pa-2">{{ user.informationData }}</p>
  <div v-show="flashMessage">
    <AlertView :text="flashMessage" type="success"></AlertView>
  </div>
  <div class="ma-2">
    <ButtonView
      text="新規登録"
      class="btn bg-primary"
      :disabled="!isValid"
      @onClick="onRegist()"
    ></ButtonView>
  </div>
  <v-form ref="infoForm">
    <v-row>
      <v-col cols="9">
        <div class="ma-2">
          お知らせ情報を入力してください。
          <addPartnerForm
            title="件名"
            text="件名を入力してください"
            class="w-100"
            :hideDetails="`auto`"
            type="title"
            :value="form.title"
            :rules="[(v) => !!v || REQUIRED_MESSAGE]"
            @onKeyup="(e) => (form.title = e)"
          ></addPartnerForm>
          <addInfoDateForm
            title="表示期間"
            class="w-100"
            :start_year="form.start_year"
            :start_month="form.start_month"
            :start_day="form.start_day"
            :start_time="form.start_time"
            :start_hour="form.start_hour"
            :end_year="form.end_year"
            :end_month="form.end_month"
            :end_day="form.end_day"
            :end_time="form.end_time"
            :end_hour="form.end_hour"
            @onKeyup="(value, key) => updateForm(key, value)"
          ></addInfoDateForm>
          <addPrefCodeForm
            title="表示範囲"
            :items="DISPLAY_TERM"
            hideDetails="auto"
            :rules="[(v:string) => !!v || REQUIRED_MESSAGE]"
            :value="form.display"
            @onChange="(e) => (form.display = e)"
          ></addPrefCodeForm>
          <addInfoTextareaForm
            title="内容"
            variant="outlined"
            hideDetails="auto"
            :textarea="form.note"
            @onKeyup="(e) => (form.note = e)"
          ></addInfoTextareaForm>
          <AddInfoFileUploadForm
            title="添付ファイル"
            variant="outlined"
            :value="filepath"
            :hideDetails="false"
            @delFile="(e) => (form.delFlag = e)"
            @onChange="
            (e) => {
                const input = e.target as HTMLInputElement;
                form.file = input.files?.[0] ?? null;
              }"
          ></AddInfoFileUploadForm>
        </div>
      </v-col>
      <v-col cols="3">
        【表示個別代理店】
        <TextFieldView
          placeholder="パートナー名検索"
          class="w-75 mb-2"
          @onKeyup="(e) => (searchPartner = e)"
        ></TextFieldView>
        <div v-for="partner in filteredPartners" :key="partner.id">
          <CheckboxView
            class="small-checkbox"
            :label="partner.name"
            :hideDetail="true"
            :value="checkedPartners.includes(partner.id)"
            @onChange="(checked) => onCheck(checked, partner.id)"
          ></CheckboxView>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>
<style scoped lang="scss">
.small-checkbox {
  margin: 0 !important;
  padding: 0 !important;
}

/* Vuetify の内部 DOMへ届かせるため :deep を使う */
.small-checkbox :deep(.v-selection-control) {
  min-height: 20px !important;
  height: 20px !important;
}

.small-checkbox :deep(.v-selection-control__wrapper) {
  padding: 0 !important;
  margin: 0 !important;
}

.small-checkbox :deep(.v-label) {
  font-size: 13px !important;
  line-height: 20px !important;
}
</style>
