import { ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import ExamApiService from "@/services/ExamApiService";

export const setStartTime = () => {
  ExamApiService.setStarttime({});
};
