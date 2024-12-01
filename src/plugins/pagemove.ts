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
  const pageClickMoveLink = (pgName: string, code: string) => {
    location.href = "/" + pgName + "?code=" + code;
  };
  const pageTestListModeParam = (
    pgName: string,
    testid: number | string,
    id: number | string
  ) => {
    //alert(1234);
    router.push({ name: pgName, params: { testid: testid, id: id } });
  };
  return {
    pageClickMoveParam,
    pageClickMoveParamCode,
    pageClickMoveLink,
    pageTestListModeParam,
  };
}
