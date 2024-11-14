<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { VBtn } from "vuetify/components";

const emit = defineEmits<{
  (e: "onClick"): void;
  // (e: "update", value: string): void;
}>();

type TVariant = VBtn["$props"]["variant"];
type TVDensity = VBtn["$props"]["density"];
const props = defineProps<{
  text: string;
  color?: string;
  class?: string;
  disabled?: boolean;
  variant?: TVariant;
  density?: TVDensity;
}>();
</script>
<template>
  <v-btn
    :variant="props.variant"
    :density="props.density"
    :color="props.color"
    :disabled="props.disabled"
    :class="props.class"
    @click="emit('onClick')"
    >{{ props.text }}</v-btn
  >
</template>
