import { BAJ4_QUESTIONS, BAJ4_HEADS } from "@/constants/baj4Questions";
import { useExamBaj4 } from "@/composables/useExamBaj4";

export default () => {
  const { onStart, checkStatus } = useExamBaj4();

  return {
    questions: BAJ4_QUESTIONS,
    heads: BAJ4_HEADS,
    onStart,
    checkStatus,
  };
};
