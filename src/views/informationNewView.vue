<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import AlertView from "@/components/AlertView.vue";
import addPartnerForm from "@/components/addPartnerForm.vue";
import addInfoDateForm from "@/components/addInfoDateForm.vue";
import addPrefCodeForm from "@/components/addPrefCodeForm.vue";
import { DISPLAY_TERM } from "@/plugins/const";
import addInfoTextareaForm from "@/components/addInfoTextareaForm.vue";
import AddInfoFileUploadForm from "@/components/addInfoFileUploadForm.vue";

const user = useStoreUser();
const flashMessage = ref();
const error = ref();
const router = useRouter();

const today = new Date();
const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1
);

const searchInfo = async () => {
  console.log(1234);
};

onMounted(async () => {
  // 一覧表示
  searchInfo();
});

const form = ref({
  title: "",
  started_at: "",
  ended_at: "",
});
const onRegist = () => {
  console.log(form.value);
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
      @onClick="onRegist()"
    ></ButtonView>
  </div>
  <div class="ma-2">
    お知らせ情報を入力してください。
    <addPartnerForm
      title="件名"
      text="件名を入力してください"
      class="w-100"
      :hideDetails="`auto`"
      type="title"
      :rules="[(v) => !!v || '入力必須です']"
      @onKeyup="(e) => (form.title = e)"
    ></addPartnerForm>
    <addInfoDateForm title="表示期間" class="w-100"></addInfoDateForm>
    <addPrefCodeForm
      title="表示範囲"
      :items="DISPLAY_TERM"
      hideDetails="auto"
    ></addPrefCodeForm>
    <addInfoTextareaForm
      title="内容"
      variant="outlined"
      hideDetails="auto"
    ></addInfoTextareaForm>
    <AddInfoFileUploadForm
      title="添付ファイル"
      variant="outlined"
    ></AddInfoFileUploadForm>
  </div>
</template>
<style scoped lang="scss"></style>
