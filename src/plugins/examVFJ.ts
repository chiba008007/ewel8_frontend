import { VFJ_QUESTIONS, VFJ_HEADS } from "@/constants/vfjQuestions";
import { useExamVFJ } from "@/composables/useExamVFJ";

export default () => {
  const { onStart, checkStatus } = useExamVFJ();

  return {
    questions: VFJ_QUESTIONS,
    heads: VFJ_HEADS,
    onStart,
    checkStatus,
  };
};
