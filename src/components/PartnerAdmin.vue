<script setup lang="ts">
import { ref } from "vue";
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
const result = UserApiService.getPartnerDetail(tmp);
if (result !== false) {
  result.then((res) => {
    const entries = res.data.user;
    partnerDetail.value = entries;
  });
}
</script>
<template>
  <h3 class="ma-4">{{ partnerDetail?.system_name }} 管理画面</h3>
</template>
