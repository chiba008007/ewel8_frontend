<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";
import type { VAutocomplete, VTextField } from "vuetify/components";
import { removeTabKey } from "../plugins/validate";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];

interface Props {
  type?: string;
  items?: object[] | string[] | string | number[];
  name?: string;
  text?: string | number;
  placeholder?: string;
  variant?: TVariant;
  density?: TVDensity;
  value?: string;
  hideDetails?: boolean | "auto";
  messages?: string;
  person?: string;
  label?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  items: undefined,
  text: undefined,
  placeholder: undefined,
  variant: "outlined",
  density: "compact",
  value: undefined,
  hideDetails: "auto",
  person: undefined,
  label: undefined,
  class: undefined,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onBlur", value: string): void;
  (e: "onChange", value: string): void;
}>();
</script>
<template>
  <v-select
    :label="props.label"
    :items="props.items"
    item-value="name"
    item-title="name"
    :hide-details="props.hideDetails"
    :variant="props.variant"
    :density="props.density"
    :class="props.class"
    :model-value="props.text"
    @keydown="removeTabKey($event)"
    @blur="emit('onBlur', $event.target.value)"
    @update:modelValue="emit('onChange', $event)"
  ></v-select>
</template>
