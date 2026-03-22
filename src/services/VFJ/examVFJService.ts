import ExamVFJApiService from "@/services/VFJ/ExamVFJApiService";
import { ExamBasePayload } from "@/types/examVFJ";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamVFJApiService.setVFJ(payload)
    : ExamVFJApiService.editVFJ(payload);
};
