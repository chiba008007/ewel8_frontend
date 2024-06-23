<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const props = defineProps<{
  title?: string;
  class?: string;
  hideDetails?: boolean;
}>();
const onblur1 = (text: string) => {
  emit("onBlur", text, "post1");
};
const onblur2 = (text: string) => {
  emit("onBlur", text, "post2");
};
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
      <v-row>
        <v-col cols="4 d-flex">
          <ComponentTextField
            density="compact"
            variant="outlined"
            :class="props.class"
            :hideDetails="props.hideDetails"
            @onBlur="(e) => onblur1(e)"
          />
          <p class="mt-2 pl-4">-</p>
        </v-col>
        <v-col cols="6">
          <ComponentTextField
            density="compact"
            variant="outlined"
            :class="props.class"
            :hideDetails="props.hideDetails"
            @onBlur="(e) => onblur2(e)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
