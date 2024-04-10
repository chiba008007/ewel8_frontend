<script setup lang="ts">
import { defineProps } from "vue";
import type { VBtn } from "vuetify/components";
type TVariant = VBtn["$props"]["variant"];
type TVDensity = VBtn["$props"]["density"];
const props = defineProps<{
  text: string;
  color: string;
  variant?: TVariant;
  density?: TVDensity;
}>();
</script>
<template>
  <v-btn
    :variant="props.variant"
    :density="props.density"
    :color="props.color"
    >{{ props.text }}</v-btn
  >
</template>
