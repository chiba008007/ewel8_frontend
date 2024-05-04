<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentSelectField from "../components/SelectFieldView.vue";

const props = defineProps<{
  title?: string;
  label?: string;
  items?: object[];
  hideDetails?: boolean | "auto";
  class?: string;
}>();
const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2">{{
      props.title
    }}</v-col>
    <v-col sm="8" class="pa-1 border-sm">
      <ComponentSelectField
        :items="props.items"
        :label="props.label"
        :hideDetails="props.hideDetails"
        :class="props.class"
      ></ComponentSelectField>
    </v-col>
  </v-row>
</template>
