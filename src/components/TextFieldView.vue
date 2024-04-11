<script setup lang="ts">
import { defineProps } from "vue";
import type { VTextField } from "vuetify/components";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];
const props = defineProps<{
  text: string;
  placeholder: string;
  variant?: TVariant;
  density?: TVDensity;
}>();
</script>
<template>
  <v-text-field
    :label="props.text"
    :placeholder="props.placeholder"
    :variant="props.variant"
    :density="props.density"
  ></v-text-field>
</template>
