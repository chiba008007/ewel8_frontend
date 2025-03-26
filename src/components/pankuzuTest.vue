<script setup lang="ts">
import { ref, defineProps, withDefaults } from "vue";
import { useRouter } from "vue-router";
import { textString } from "@/plugins/const";
import { useStoreUser } from "../store/user";
import UserApiService from "@/services/UserApiService";

const router = useRouter();
const params = router.currentRoute.value.params;

interface PartnerResponse {
  data: number;
}
interface Props {
  pageName?: string;
  href?: { pageName?: string; pageName2?: string };
}

const props = withDefaults(defineProps<Props>(), {
  pageName: "",
  href: undefined,
});

const user = useStoreUser();
const pankuzu = ref();

let tmp = { id: params?.id, type: "customer" };
UserApiService.getPartnerid(tmp)
  .then((res: PartnerResponse) => {
    if ((user.userdata as any).type === "partner") {
      pankuzu.value = [{ title: user.home }];
    } else {
      pankuzu.value = [
        { title: user.home, href: router.resolve({ name: "List" }).href },

        {
          title: user.customerInfoList,
          href: router.resolve({
            name: "customerList",
            params: { id: res.data },
          }).href,
        },
        {
          title: user.testList,
          href: router.resolve({
            name: "testLists",
            params: { id: params.id },
          }).href,
        },
      ];
      // 追加

      if (props.href && props.href.pageName) {
        pankuzu.value.push({
          title: (user as any)[props.href.pageName],
          href: router.resolve({
            name: props.href.pageName,
            params: { id: params.id },
          }).href,
        });
        if (props.href.pageName2) {
          pankuzu.value.push({
            title: (user as any)[props.href.pageName2],
          });
        }
      } else {
        pankuzu.value.push({
          title: (user as any)[props.pageName],
        });
      }
    }
  })
  .catch((e) => {
    alert("TestMenu ERROR" + e);
    // location.href = "/error";
  });
</script>
<template>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
</template>
<style lang="scss"></style>
