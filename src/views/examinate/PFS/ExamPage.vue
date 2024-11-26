<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
const max = 4;
const props = defineProps<{
  max?: number;
  page?: number;
}>();
</script>
<template>
  <div class="text-right">{{ props.page }}/{{ max }}ページ</div>
</template>
