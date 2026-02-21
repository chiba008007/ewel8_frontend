import ExamBAJ3ApiService from "@/services/ExamBAJ3ApiService";
import { ExamBasePayload } from "@/types/examPfs";

export const startExam = (payload: ExamBasePayload) => {
  return payload.page === 1
    ? ExamBAJ3ApiService.setBAJ3(payload)
    : ExamBAJ3ApiService.editBAJ3(payload);
};
