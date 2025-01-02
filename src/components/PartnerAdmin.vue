<script setup lang="ts">
import { ref, defineProps } from "vue";
import UserApiService from "@/services/UserApiService";
import { useRouter } from "vue-router";

const props = defineProps<{
  coded?: string | undefined;
}>();

const router = useRouter();
let key = router.currentRoute.value.params.id;
const tmp = {
  partnerId: key,
  type: props.coded ? props.coded : "partner",
};

const partnerDetail = ref();
try {
  UserApiService.getPartnerDetail(tmp).then((res) => {
    const entries = (res as any).data.user;
    partnerDetail.value = entries;
  });
} catch (e) {
  alert("detail error");
  console.log(e);
}
</script>
<template>
  <h3 class="ma-4">{{ partnerDetail?.system_name }} 管理画面</h3>
</template>
