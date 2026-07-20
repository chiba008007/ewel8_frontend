import ExamEAIBApiService from "@/services/EAIB/ExamEAIBApiService";
import { ExamBasePayload } from "@/types/examVFJ";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamEAIBApiService.setEAIB(payload)
    : ExamEAIBApiService.editEAIB(payload);
};
