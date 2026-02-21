<script setup lang="ts">
import { ref } from "vue";
import ComponentImg from "@/components/imgView.vue";
import ExamApiService from "@/services/ExamApiService";
import { useRouter } from "vue-router";
import { useStoreUser } from "@/store/user";
import userLogout from "@/services/UserLogout";
import AlertView from "./AlertView.vue";

const usr = useStoreUser();
if (usr.isLogin) {
  userLogout.logout();
  usr.IsLogout();
}
const emit = defineEmits<{
  (e: "onTest", value: object): void;
  (e: "onLoginId", value: string): void;
  (e: "onResultFlag", value: number): void;
  (e: "enabledTest", value: boolean): boolean;
}>();

const router = useRouter();
const k = router.currentRoute.value.query.k;
const data = ref();
const company_name = ref("");
const testname = ref("");
let tmp = { params: k };
const errormessage = ref("");
ExamApiService.getExam(tmp)
  .then(function (rlt) {
    if (rlt.data.length === 0) {
      throw new Error("データが取得できませんでした");
    }
    emit("onTest", rlt.data);
    let ls = localStorage.getItem("user") as string;
    emit("onLoginId", JSON.parse(ls)?.userExam.email);
    data.value = rlt.data;
    company_name.value = data.value.company_name;
    testname.value = data.value.testname;
    emit("onResultFlag", rlt.data.resultflag);
    emit("enabledTest", true);
  })
  .catch(() => {
    emit("enabledTest", false);
    errormessage.value = "検査実施期間外、または利用できない状態です。";
  });
</script>

<template>
  <v-container fluid>
    <v-row class="pa-1 align-center bg-white">
      <v-col md="1" cols="3">
        <ComponentImg
          :maxHeight="50"
          :src="require('@/assets/logo.png')"
        ></ComponentImg>
      </v-col>
      <v-col class="text-h6 pl-2 font-weight-bold" md="11" cols="9">
        {{ company_name }}
      </v-col>
    </v-row>

    <div>
      <v-alert
        border="top"
        border-color="primary"
        elevation="2"
        v-if="testname"
        class="w-100 text-caption pa-2 pt-4 ma-1"
      >
        {{ testname }}
      </v-alert>
      <AlertView
        v-show="errormessage"
        type="error"
        :text="errormessage"
      ></AlertView>
    </div>
  </v-container>
</template>
