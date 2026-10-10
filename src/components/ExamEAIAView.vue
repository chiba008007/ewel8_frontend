<script setup lang="ts">
const props = defineProps<{
  coded?: string | undefined;
  starttime?: string | undefined | any;
  endtime?: string | undefined | any;
  id?: number;
  level?: string;
  lv?: string;
}>();
</script>
<template>
  <td class="text-center">
    <p v-if="props.endtime">{{ props.endtime }}</p>
    <p v-else-if="props.starttime">受検中</p>
  </td>
</template>
