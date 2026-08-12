import ExamBAJ4ApiService from "@/services/ExamBAJ4ApiService";
import { ExamBasePayload } from "@/types/examPfs";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamBAJ4ApiService.setBAJ4(payload)
    : ExamBAJ4ApiService.editBAJ4(payload);
};
