<script setup lang="ts">
import { ref } from "vue";
import UserApiService from "@/services/UserApiService";
let key = location.pathname.replace(/[^0-9]/g, "");
const tmp = {
  partnerId: key,
  type: "partner",
};
console.log(tmp);
const partnerDetail = ref();

try {
  UserApiService.getPartnerDetail(tmp).then((res) => {
    const entries = (res as any).data.user;
    partnerDetail.value = entries;
  });
} catch (e) {
  console.log(e);
}
</script>
<template>
  <h3 class="ma-4">{{ partnerDetail?.system_name }} 管理画面</h3>
</template>
