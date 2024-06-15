<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";

interface Props {
  label?: string;
  value?: number;
  selected?: string | undefined | object;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  value: 0,
  selected: "selected",
});
const emit = defineEmits<{
  (e: "onChange", val: number): void;
}>();
</script>
<template>
  <v-checkbox
    class="ml-2"
    :v-model="props.selected"
    :label="props.label"
    :value="props.value"
    @onChange="emit('onChange', props.value)"
  ></v-checkbox>
</template>
