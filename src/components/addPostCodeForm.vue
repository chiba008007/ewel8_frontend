<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const props = defineProps<{
  title?: string;
  class?: string;
  hideDetails?: boolean;
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
      <v-row>
        <v-col cols="3 d-flex">
          <ComponentTextField
            density="compact"
            variant="outlined"
            :class="props.class"
            :hideDetails="props.hideDetails"
          />
          <p class="mt-2 pl-4">-</p>
        </v-col>
        <v-col cols="4">
          <ComponentTextField
            density="compact"
            variant="outlined"
            :class="props.class"
            :hideDetails="props.hideDetails"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
