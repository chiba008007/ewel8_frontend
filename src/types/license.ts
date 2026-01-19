export type LicenseItem = {
  code: string;
  text: string;
  value: number;
};

export type License = {
  code: string;
  text: string;
  list: LicenseItem[];
};
