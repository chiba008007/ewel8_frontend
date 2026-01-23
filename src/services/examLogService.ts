import ExamLogApiService from "@/services/ExamLogApiService";
import { ExamLogPayload } from "@/types/examPfs";

export const recordExamLog = (payload: ExamLogPayload) => {
  return ExamLogApiService.set(payload);
};
