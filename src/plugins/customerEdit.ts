import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStoreUser } from "../store/user";
const pankuzu = ref();
class customerEdit {
  pankuzu(type: { type: string }, typeString: string | string[]) {
    const router = useRouter();
    const user = useStoreUser();
    const route = useRoute();
    if (typeString == "test") {
      // 検査一覧から顧客企業情報ページを開いたとき
      pankuzu.value = [
        { title: user.home, href: router.resolve({ name: "List" }).href },
        {
          title: user.customerInfoList,
          href: router.resolve({ name: "customerList" }).href,
        },
        {
          title: user.testList,
          href: router.resolve({
            name: "testLists",
            params: { id: route.params.editid },
          }).href,
        },
        {
          title: user.customerEdit,
        },
      ];
    } else if (type.type == "partner") {
      pankuzu.value = [
        {
          title: user.home,
          href: router.resolve({ name: "customerList" }).href,
        },
        { title: user.customerRegist },
      ];
    } else {
      pankuzu.value = [
        { title: user.home, href: router.resolve({ name: "List" }).href },
        {
          title: user.customerInfoList,
          href: router.resolve({ name: "customerList" }).href,
        },
        {
          title:
            router.currentRoute.value.name === "customerEdit"
              ? user.customerEdit
              : user.customerRegist,
        },
      ];
    }
    return pankuzu;
  }
}
export default new customerEdit();
