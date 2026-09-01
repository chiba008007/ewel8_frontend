import ExamEAIAApiService from "@/services/EAIA/ExamEAIAApiService";
import { ExamBasePayload } from "@/types/examVFJ";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamEAIAApiService.setEAIA(payload)
    : ExamEAIAApiService.editEAIA(payload);
};
