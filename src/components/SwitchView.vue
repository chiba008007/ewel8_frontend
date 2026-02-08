<script setup lang="ts">
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

interface Props {
  density?: TVDensity;
  label?: string;
  model?: boolean | string | number;
  type?: string;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  density: "compact",
  label: "利用する",
  model: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean | null): void;
  (e: "onKeyup", value: string): void;
  (e: "onClick", value: any, type: string): void;
  (e: "onChange", value: string | number | boolean | null): void;
}>();
</script>
<template>
  <v-switch
    class="ml-2"
    :density="props.density"
    :label="props.label"
    hide-details
    inset
    :model-value="props.modelValue ?? Boolean(props.model)"
    @update:modelValue="
      (v) => {
        emit('update:modelValue', v);
        emit('onClick', v, props.type ?? '');
      }
    "
  />
</template>
