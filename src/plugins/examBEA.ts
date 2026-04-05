import { BEA_QUESTIONS, BEA_HEADS } from "@/constants/beaQuestions";
import { useExamBEA } from "@/composables/useExamBEA";

export default () => {
  const { onStart, checkStatus } = useExamBEA();

  return {
    questions: BEA_QUESTIONS,
    heads: BEA_HEADS,
    onStart,
    checkStatus,
  };
};
