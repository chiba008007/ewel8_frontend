<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";

interface Props {
  label?: string;
  value?: number | string | undefined | null | boolean;
  selected?: string | undefined | object | boolean;
  hideDetail?: boolean | "auto";
  class?: string;
  checked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  value: 0,
  selected: true,
  hideDetail: true,
  class: "",
  checked: true,
});
const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "onChange", val: boolean): void;
}>();
</script>
<template>
  <v-checkbox
    class="ml-2"
    :label="props.label"
    :hide-details="props.hideDetail"
    :class="props.class"
    @update:model-value="
      (val) => {
        const checked = val as boolean
        emit('update:modelValue', checked)
        emit('onChange', checked)
      }
    "
  ></v-checkbox>
</template>
