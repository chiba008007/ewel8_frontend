import ExamApiService from "@/services/ExamApiService";
import { useRoute } from "vue-router";

export const examPersonName = () => {
  const route = useRoute();
  const k = route.query.k;
  const testparts_id = route.params.testparts_id;

  return ExamApiService.getExamTestParts({
    params: k,
    testparts_id: testparts_id,
  }).then((rlt) => {
    return rlt.data.examPersonName;
  });
};

export const examTestParts = () => {
  const route = useRoute();
  const k = route.query.k;
  const testparts_id = route.params.testparts_id;

  return ExamApiService.getExamTestParts({
    params: k,
    testparts_id: testparts_id,
  }).then((rlt) => {
    return rlt.data;
  });
};
