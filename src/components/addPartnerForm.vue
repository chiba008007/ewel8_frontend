<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const props = defineProps<{
  title?: string;
  text?: string;
  class?: string;
  hideDetails?: boolean;
  login_id?: string;
  person?: string;
  messages?: string;
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
    <v-col sm="9" class="pa-1 border-sm">
      <ComponentTextField
        :text="props.text"
        density="compact"
        variant="outlined"
        :class="props.class"
        :hideDetails="props.hideDetails"
        :messages="props.messages"
      />
    </v-col>
  </v-row>
</template>
