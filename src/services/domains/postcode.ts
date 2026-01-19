import { Core as YubinBangoCore } from "yubinbango-core2";

type AddressTarget = {
  post1: string;
  post2: string;
  pref: number;
  address1: string;
};

export const handlePostCodeBlur = (
  target: AddressTarget,
  value: string,
  type: "post1" | "post2"
) => {
  target[type] = value;

  if (target.post1 && target.post2) {
    new YubinBangoCore(target.post1 + target.post2, (addr: any) => {
      target.pref = addr.region;
      target.address1 = addr.street;
    });
  }
};
