export interface PartnerForm {
  name: string;
  login_id: string;
  password: string;

  post1: string;
  post2: string;
  pref: number;
  address1: string;
  address2: string;
  tel: string;
  fax: string;

  system_name: string;
  requestFlag: boolean;
  two_factor_enabled: boolean;

  person: string;
  person_address: string;
  person2: string;
  person_address2: string;
  person_tel: string;

  licensesKey: string[];
  licensesBody: number[];

  elements: string[];
}

export const createPartnerForm = (): PartnerForm => ({
  name: "",
  login_id: "",
  password: "",

  post1: "",
  post2: "",
  pref: 0,
  address1: "",
  address2: "",
  tel: "",
  fax: "",

  system_name: "",
  requestFlag: true,
  two_factor_enabled: false,

  person: "",
  person_address: "",
  person2: "",
  person_address2: "",
  person_tel: "",

  licensesKey: [],
  licensesBody: [],
  elements: [],
});
