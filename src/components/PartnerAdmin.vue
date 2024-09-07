<script setup lang="ts">
import { ref } from "vue";
import UserApiService from "@/services/UserApiService";
let key = location.pathname.replace(/[^0-9]/g, "");
const tmp = {
  partnerId: key,
  type: "partner",
};
const partnerDetail = ref();
UserApiService.getPartnerDetail(tmp).then((res) => {
  const entries = (res as any).data.user;
  partnerDetail.value = entries;
});
</script>
<template>
  <h3 class="ma-4" v-if="partnerDetail?.system_name">
    {{ partnerDetail?.system_name }} 管理画面
  </h3>
</template>
