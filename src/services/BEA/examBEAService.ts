import ExamBEAApiService from "@/services/BEA/ExamBEAApiService";
import { ExamBasePayload } from "@/types/examVFJ";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamBEAApiService.setBEA(payload)
    : ExamBEAApiService.editBEA(payload);
};
