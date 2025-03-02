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
  (e: "onChange", val: number | string | boolean | null): void;
}>();
</script>
<template>
  <v-checkbox
    class="ml-2"
    :label="props.label"
    :model-value="props.value"
    :hide-details="props.hideDetail"
    :class="props.class"
    @change="emit('onChange', props.value)"
  ></v-checkbox>
</template>
