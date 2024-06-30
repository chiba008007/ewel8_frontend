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
  rules?: string | "" | null | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  name: undefined,
  text: undefined,
  placeholder: undefined,
  variant: "outlined",
  density: "compact",
  value: undefined,
  hideDetails: "auto",
  person: undefined,
  class: "",
  rules: null,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onBlur", value: string): void;
}>();
</script>
<template>
  <v-text-field
    :type="props.type"
    :label="props.text"
    :placeholder="props.placeholder"
    :variant="props.variant"
    :density="props.density"
    :model-value="props.value"
    :name="props.name"
    :hide-details="props.hideDetails"
    :messages="props.messages"
    :class="props.class"
    :rules="props.rules ? [props.rules] : undefined"
    @keyup="emit('onKeyup', $event.target.value)"
    @blur="emit('onBlur', $event.target.value)"
  ></v-text-field>
</template>
