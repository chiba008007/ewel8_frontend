import ExamApiService from "@/services/ExamApiService";
import { ExamBasePayload } from "@/types/examPfs";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamApiService.setPFS(payload)
    : ExamApiService.editPFS(payload);
};
