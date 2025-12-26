<script setup lang="ts">
const emit = defineEmits<{
  (e: "onClick"): void;
}>();

const props = defineProps<{
  title?: string;
  text?: string;
  type?: "success" | "error" | "warning" | "info" | undefined;
  border?: "top" | "end" | "bottom" | "start" | undefined;
}>();
</script>
<template>
  <v-alert
    :border="props.border"
    :text="props.text"
    :title="props.title"
    :type="props.type"
  ></v-alert>
</template>
