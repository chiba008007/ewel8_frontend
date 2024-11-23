<script setup lang="ts">
import { ref, defineEmits, withDefaults } from "vue";
import { defineProps } from "vue";
import ComponentImg from "@/components/imgView.vue";
import ExamApiService from "@/services/ExamApiService";
import { useRouter } from "vue-router";

const emit = defineEmits<{
  (e: "onTest", value: object): void;
  (e: "onLoginId", value: string): void;
}>();

const router = useRouter();
const k = router.currentRoute.value.query.k;
const data = ref();
const company_name = ref("");
const testname = ref("");

let tmp = { params: k };
ExamApiService.getExam(tmp)
  .then(function (rlt) {
    emit("onTest", rlt.data);
    let ls = localStorage.getItem("user") as string;
    emit("onLoginId", JSON.parse(ls)?.userExam.email);
    data.value = rlt.data;
    company_name.value = data.value.company_name;
    testname.value = data.value.testname;
  })
  .catch((e) => {
    location.href = "/exam/error";
  });
</script>

<template>
  <v-container fluid>
    <v-row class="pa-4 align-center bg-white">
      <v-col md="1" cols="3">
        <ComponentImg
          :maxHeight="50"
          :src="require('@/assets/logo.png')"
        ></ComponentImg>
      </v-col>
      <v-col class="text-h6 pl-2 font-weight-bold" md="11" cols="9">{{
        company_name
      }}</v-col>
    </v-row>
  </v-container>
  <div v-if="testname" class="text-h6 font-weight-bold text-center">
    {{ testname }}
  </div>
</template>
