<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, computed } from "vue";
import type { VTextField } from "vuetify/components";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];

type ValidationResult = string | boolean;

type InputRule = (
  value: string
) => boolean | string | Promise<boolean | string>;

type RuleElement =
  | string
  | boolean
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)
  | [string, any, (string | undefined)?];

interface Props {
  type?: string;
  name?: string;
  text?: string;
  placeholder?: string;
  variant?: TVariant;
  density?: TVDensity;
  value?: string | number | boolean;
  hideDetails?: boolean | "auto";
  messages?: string;
  person?: string;
  class?: string;
  errormessage?: string;
  rules?: RuleElement[] | null | undefined;
  maxlength?: number;
  step?: string;
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
  errormessage: "",
  maxlength: 1000,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string, name: string | undefined): void;
  (e: "onBlur", value: string, name: string): void;
}>();

const normalizedRules = computed<readonly RuleElement[]>(() => {
  const r = props.rules;
  if (!r) return [];
  return r;
});
</script>
<template>
  <v-text-field
    :type="props.type"
    :label="props.text"
    :step="props.step"
    :placeholder="props.placeholder"
    :variant="props.variant"
    :density="props.density"
    :model-value="props.value"
    :name="props.name"
    :hide-details="props.hideDetails"
    :messages="props.messages"
    :class="props.class"
    :rules="normalizedRules"
    :maxlength="props.maxlength"
    @keyup="emit('onKeyup', $event.target.value, props.name ?? '')"
    @blur="emit('onBlur', $event.target.value, props.name ?? '')"
  ></v-text-field>
  <p v-if="props.errormessage" class="text-red text-caption ml-4">
    {{ props.errormessage }}
  </p>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/util.scss";
</style>
