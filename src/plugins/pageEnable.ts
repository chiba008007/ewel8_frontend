import { D_ADMIN } from "@/plugins/const";
import { useStoreUser } from "@/store/user";
import { useRouter } from "vue-router";

export const pageAdmin = () => {
  const store = useStoreUser();
  const router = useRouter();
  if (store.getUserData().type != D_ADMIN) {
    router.push(router.resolve({ name: "error" }).href);
  }
};
