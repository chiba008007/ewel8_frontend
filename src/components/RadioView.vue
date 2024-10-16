<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  items: Array<{
    label: string;
    value: any;
  }>;
}>();
</script>
<template>
  <v-radio
    v-for="item in items"
    :key="item.value"
    :label="item.label"
    :value="item.value"
  ></v-radio>
</template>
