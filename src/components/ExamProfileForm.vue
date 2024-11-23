<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const props = defineProps<{
  title?: string;
  requriredIcon?: boolean;
}>();
</script>
<template>
  <v-row>
    <v-col cols="12" sm="3" class="border-sm bg-primary align-content-center">
      <label>
        {{ props.title }}
        <span v-if="props.requriredIcon" class="text-red">*</span>
      </label>
    </v-col>
    <v-col cols="12" sm="9" class="border-sm">
      <slot></slot>
    </v-col>
  </v-row>
</template>
