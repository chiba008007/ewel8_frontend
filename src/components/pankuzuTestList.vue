<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserApiService from "@/services/UserApiService";
import { useStoreUser } from "../store/user";

const user = useStoreUser();
const router = useRouter();
const tmpid = ref(router.currentRoute.value.params.id);
const partner_id = ref();
const pankuzu = ref();
// 階層の数
const rowCount = router.currentRoute.value.fullPath.split("/").length;
if ((user.userdata as any).type === "partner") {
  pankuzu.value = [{ title: user.customerInfoList }];
} else {
  let pid = UserApiService.getPartnerid({
    id: tmpid.value,
    type: "customer",
  });
  pid.then((e: any) => {
    partner_id.value = parseInt(e.data);

    pankuzu.value = [
      { title: user.home, href: router.resolve({ name: "List" }).href },
      {
        title: user.customerInfoList,
        href: router.resolve({
          name: "customerList",
          params: {
            id: partner_id.value,
          },
        }).href,
      },
    ];
    switch (rowCount) {
      case 5:
        pankuzu.value.push({
          title: user.testList,
          disabled: false,
          href: router.resolve({
            name: "testLists",
            params: {
              id: tmpid.value,
            },
          }).href,
        });
        pankuzu.value.push({ title: user.testExamList });
        break;
      default:
        pankuzu.value.push({ title: user.testList });
        break;
    }
  });
}
</script>

<template>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
</template>
