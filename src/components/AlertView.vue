<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits<{
  (e: "onClick"): void;
}>();

const props = defineProps<{
  title?: string;
  text?: string;
  type?: "success" | "error" | "warning" | "info" | undefined;
}>();
</script>
<template>
  <v-alert :text="props.text" :title="props.title" :type="props.type"></v-alert>
</template>
