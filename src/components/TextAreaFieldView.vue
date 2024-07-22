<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";
import type { VAutocomplete, VTextField } from "vuetify/components";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];

interface Props {
  type?: string;
  name?: string;
  text?: string;
  placeholder?: string;
  variant?: TVariant;
  density?: TVDensity;
  value?: string;
  hideDetails?: boolean | "auto";
  messages?: string;
  person?: string;
  class?: string;
  errormessage?: string;
  rules?: string | "" | null | undefined;
  height?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string, name: string | undefined): void;
  (e: "onBlur", value: string, name: string): void;
}>();
</script>
<template>
  <v-textarea
    :model-value="props.value"
    :variant="props.variant"
    :hide-details="props.hideDetails"
    :rows="props.height"
    :disabled="props.disabled"
    @keyup="emit('onKeyup', $event.target.value, props.name ?? '')"
    @blur="emit('onBlur', $event.target.value, props.name ?? '')"
  ></v-textarea>
  <p v-if="props.errormessage" class="text-red text-caption ml-4">
    {{ props.errormessage }}
  </p>
</template>
