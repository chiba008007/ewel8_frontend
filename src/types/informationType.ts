export interface informationType {
  title: string;
  started_at: string;
  ended_at: string;
  start_year: string;
  start_month: string;
  start_day: string;
  start_hour: string;
  start_time: string;
  end_year: string;
  end_month: string;
  end_day: string;
  end_hour: string;
  end_time: string;
  display: string;
  note: string;
  file: File | null;
  delFlag: boolean;
}
