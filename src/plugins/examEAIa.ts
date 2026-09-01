import { EAIA_QUESTIONS, EAIA_HEADS } from "@/constants/eaiaQuestions";
import { useExamEAIa } from "@/composables/useExamEAIa";

export default () => {
  const { onStart, checkStatus } = useExamEAIa();

  return {
    // ページごとの設問
    questions: EAIA_QUESTIONS,

    // 回答の選択肢
    heads: EAIA_HEADS,

    onStart,
    checkStatus,
  };
};
