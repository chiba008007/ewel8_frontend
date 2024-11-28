<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  model: number | string;
  items: Array<{
    label: string;
    value: any;
  }>;
}>();
const emit = defineEmits<{
  (e: "onChange", value: number): void;
}>();
</script>
<template>
  <v-radio-group hide-details="false" :model-value="props.model">
    <v-radio
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      @change="emit('onChange', $event.target.value)"
    ></v-radio>
  </v-radio-group>
</template>
