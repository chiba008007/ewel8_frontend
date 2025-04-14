<script setup lang="ts">
import { ref, defineEmits, withDefaults } from "vue";
import { defineProps } from "vue";

import ExamApiService from "@/services/ExamApiService";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits<{
  (e: "onTestParts", value: object): void;
}>();

const testcode = ref("");
const router = useRouter();
const route = useRoute();
const k = router.currentRoute.value.query.k;
let tmp = { params: k, testparts_id: route.params.testparts_id };
ExamApiService.getExamTestParts(tmp)
  .then(function (rlt) {
    testcode.value = rlt.data.code;
  })
  .catch(() => {
    alert("error");
    //  location.href = "/exam/error";
  });
</script>

<template>
  <v-container fluid class="mb-0 pb-0 mt-0 pa-0">
    <p class="text-h5 mb-0">{{ testcode }}</p>
  </v-container>
</template>
