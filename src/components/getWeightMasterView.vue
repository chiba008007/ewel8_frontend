<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import SelectFieldView from "./SelectFieldView.vue";
const emit = defineEmits<{
  (e: "onChange", value: string): void;
  // (e: "update", value: string): void;
}>();

const props = defineProps<{
  items: string[] | undefined;
  inputWeightMasterString: string | undefined;
}>();
</script>
<template>
  <SelectFieldView
    v-if="props.items"
    :text="props.inputWeightMasterString"
    :items="props.items"
    :clearable="true"
    @onChange="(e) => emit('onChange', e)"
  ></SelectFieldView>
</template>
