export type ExamBasePayload = {
  testparts_id: string | string[];
  params: string | null | (string | null)[];
  page: number;
  selectPoint: Record<string, unknown>;
  code?: string | null;
  tokenExam: string;
};

export type ExamLogPayload = ExamBasePayload & {
  status: 1 | 2;
};
