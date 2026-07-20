import { EAIB_QUESTIONS, EAIB_HEADS } from "@/constants/eaibQuestions";
import { useExamEAIB } from "@/composables/useExamEAIB";

export default () => {
  const { onStart, checkStatus } = useExamEAIB();

  return {
    // ページごとの設問
    questions: EAIB_QUESTIONS,

    // 回答の選択肢
    heads: EAIB_HEADS,

    onStart,
    checkStatus,
  };
};
