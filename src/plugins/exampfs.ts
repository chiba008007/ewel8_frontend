import { PFS_QUESTIONS, PFS_HEADS } from "@/constants/pfsQuestions";
import { useExamPfs } from "@/composables/useExamPfs";

export default () => {
  const { onStart, checkStatus } = useExamPfs();

  return {
    questions: PFS_QUESTIONS,
    heads: PFS_HEADS,
    onStart,
    checkStatus,
  };
};
