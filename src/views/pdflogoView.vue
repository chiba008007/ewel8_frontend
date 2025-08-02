<script setup lang="ts">
import { ref, onMounted } from "vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";
import { useRoute } from "vue-router";
import addImageForm from "../components/addImageForm.vue";
import UserApiService from "@/services/UserApiService";
import { imagePath } from "@/plugins/const";
import ButtonView from "@/components/ButtonView.vue";
import ProgressView from "@/components/ProgressView.vue";
import InfoAreaView from "@/components/InfoAreaView.vue";
import AlertView from "@/components/AlertView.vue";

const loadingFlag = ref(true);
const successFlag = ref(false);
const route = useRoute();
const id = route.params.id;
const inputData = ref({
  pdfImagePath: "",
});
const myimage_path = ref();

const getPdfData = () => {
  UserApiService.getUserPdfLogo({
    partnerId: id,
  })
    .then((res: string) => {
      loadingFlag.value = false;
      myimage_path.value = res;
    })
    .catch((e) => {
      alert(e);
    });
};

const onUpdate = async () => {
  const file = inputData.value.pdfImagePath as unknown as File;
  if (!(file instanceof File)) {
    alert("画像ファイルが不正です");
    return;
  }
  const formData = new FormData();
  formData.append("photo", file, file.name);
  try {
    const res = (await UserApiService.onUpload(formData)) as { data: string };
    const uploadedUrl = imagePath + res.data;

    myimage_path.value = uploadedUrl;
    inputData.value.pdfImagePath = uploadedUrl;
  } catch (e) {
    alert("editUserData ERROR: " + e);
  }
};
const onClick = () => {
  loadingFlag.value = true;
  successFlag.value = false;
  if (inputData.value.pdfImagePath) {
    UserApiService.editUserPdfLogo({
      partnerId: id,
      pdfImagePath: inputData.value.pdfImagePath,
    })
      .then((res) => {
        successFlag.value = true;
        loadingFlag.value = false;
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("画像アップロードに失敗しました");
  }
};
onMounted(() => {
  // 初期ロード時に実行される処理
  getPdfData();
});
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <InfoAreaView />
  <v-row justify="center">
    <CustomerMenu />
  </v-row>
  <pankuzuMain
    class="pt-2"
    :adminhref="{ pageName: 'pdflogo', href: 'pdflogo' }"
  ></pankuzuMain>
  <v-row justify="center">
    <v-col cols="11">
      <AlertView
        v-if="successFlag"
        class="mb-2"
        type="success"
        text="登録に成功しました。"
      ></AlertView>
      <addImageForm
        title="ロゴ画像"
        density="compact"
        label="アップロード画像選択"
        v-model="inputData.pdfImagePath"
        :myimage_path="myimage_path"
        @onUpdate="(e) => ((inputData.pdfImagePath = e as  File | File[] | any), onUpdate())"
      ></addImageForm>
    </v-col>
    <v-col cols="11">
      <ButtonView
        text="アップロード"
        color="primary"
        @onClick="onClick()"
      ></ButtonView>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
