<script setup lang="ts">
import { useAttrs } from "vue";
import type { VTextField } from "vuetify/components";
import { removeTabKey } from "../plugins/validate";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];

interface Props {
  type?: string;
  items?: object[] | string[] | string | number[] | any;
  name?: string;
  text?: string | number | any;
  placeholder?: string;
  variant?: TVariant;
  density?: TVDensity;
  value?: string | number;
  hideDetails?: boolean | "auto";
  messages?: string;
  person?: string;
  label?: string;
  clearable?: boolean;
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
  clearable: false,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onBlur", value: string): void;
  (e: "onChange", value: string | number | null): void;
}>();
const attrs = useAttrs();
</script>
<template>
  <v-select
    v-bind="attrs"
    :label="props.label"
    :items="props.items"
    item-value="id"
    item-title="name"
    :model-value="props.value ?? props.text"
    :hide-details="props.hideDetails"
    :variant="props.variant"
    :density="props.density"
    :clearable="props.clearable"
    @keydown="removeTabKey($event)"
    @blur="emit('onBlur', $event.target.value)"
    @update:modelValue="emit('onChange', $event)"
  />
</template>
<style lang="scss" scoped>
@import "@/assets/styles/util.scss";
</style>
