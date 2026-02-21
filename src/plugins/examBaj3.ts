import { BAJ3_QUESTIONS, BAJ3_HEADS } from "@/constants/baj3Questions";
import { useExamBaj3 } from "@/composables/useExamBaj3";

export default () => {
  const { onStart, checkStatus } = useExamBaj3();

  return {
    questions: BAJ3_QUESTIONS,
    heads: BAJ3_HEADS,
    onStart,
    checkStatus,
  };
};
