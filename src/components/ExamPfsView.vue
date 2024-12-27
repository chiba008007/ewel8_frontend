<script setup lang="ts">
import { ref, defineProps } from "vue";
import UserApiService from "@/services/UserApiService";
import { useRouter } from "vue-router";

const props = defineProps<{
  coded?: string | undefined;
  endtime?: string;
  level?: string;
  lv?: string;
}>();
</script>
<template>
  <td class="text-center">{{ endtime }}</td>
  <td class="text-center">{{ level }}</td>
  <td class="text-center">{{ lv }}</td>
</template>
