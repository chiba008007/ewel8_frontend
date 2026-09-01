import { useRouter } from "vue-router";
import { useStoreUser } from "@/store/user";
import { startExam } from "@/services/EAIA/examEAIAService";
import { recordExamLog } from "@/services/examLogService";
import { ExamBasePayload } from "@/types/examEAIA";
import ExamEAIaApiService from "@/services/EAIA/ExamEAIAApiService";
import type { LocationQueryValue } from "vue-router";

export const useExamEAIa = () => {
  const router = useRouter();
  const user = useStoreUser();

  const onStart = async (
    payload: Omit<ExamBasePayload, "tokenExam">
  ): Promise<boolean> => {
    const fullPayload: ExamBasePayload = {
      ...payload,
      tokenExam: user.userTokenExam,
    };
    if (payload.page === 1 || payload.page === 31) {
      await recordExamLog({
        ...fullPayload,
        status: payload.page === 1 ? 1 : 2,
      });
    }

    const rlt = await startExam(fullPayload);

    if (rlt.data !== "success") return false;

    await router.replace({
      name: payload.page == 31 ? "ExamEAIaTakeFin" : "examEAIaTake",
      params: {
        testparts_id: payload.testparts_id,
        page: payload.page,
      },
      query: { k: payload.params },
    });

    return true;
  };

  const checkStatus = async (
    testparts_id: number | string[] | string,
    k: string | LocationQueryValue | LocationQueryValue[]
  ): Promise<void> => {
    const rlt = await ExamEAIaApiService.checkStatus({ testparts_id });

    if (rlt.data) {
      await router.push({
        name: "examList",
        query: { k },
      });
    }
  };

  return { onStart, checkStatus };
};
