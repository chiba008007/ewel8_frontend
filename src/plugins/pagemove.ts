import { useRouter } from "vue-router";
import { useStoreUser } from "@/store/user";

// export const pageClickMoveParam = (pagename: string, id: number) => {
//   //router.push(router.resolve({ name: pagename, params: { id: id } }).href);
//   router.push({ name: "testLists" });
// };
export default function () {
  const router = useRouter();
  const pageClickMoveParam = (pgName: string) => {
    router.push({ name: pgName });
  };
  const pageClickMoveParamCode = (pgName: string, code: string | number) => {
    router.push({ name: pgName, params: { id: code } });
  };
  const pageClickMoveParamCodeList = (
    pgName: string,
    code: string | number | string[] | number[],
    editid: string | number
  ) => {
    router.push({ name: pgName, params: { id: code, editid: editid } });
  };
  const pageClickMoveLink = (pgName: string, code: string) => {
    location.href = "/" + pgName + "?code=" + code;
  };
  const pageClickMoveLinkParam = (pgName: string, code: string) => {
    location.href = "/" + pgName + "/" + code;
  };
  const pageTestListModeParam = (
    pgName: string,
    testid: number | string,
    id: number | string
  ) => {
    //alert(1234);
    router.push({ name: pgName, params: { testid: testid, id: id } });
  };
  const pageQRBlank = (url: string, itemid: string, tmpid: string) => {
    window.open("/" + url + "/" + tmpid + "/test/" + itemid, "_blank");
  };
  return {
    pageClickMoveParam,
    pageClickMoveParamCode,
    pageClickMoveLink,
    pageTestListModeParam,
    pageQRBlank,
    pageClickMoveLinkParam,
    pageClickMoveParamCodeList,
  };
}
