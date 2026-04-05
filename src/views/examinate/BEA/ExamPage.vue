<script setup lang="ts">
const max = 11;
const props = defineProps<{
  max?: number;
  page?: number;
}>();
</script>
<template>
  <div class="text-right">{{ props.page }}/{{ max }}ページ</div>
</template>
