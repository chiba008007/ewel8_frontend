import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStoreUser } from "../store/user";
const pankuzu = ref();
class customerEdit {
  pankuzu(type: { type: string }) {
    const router = useRouter();
    const user = useStoreUser();
    if (type.type == "partner") {
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
