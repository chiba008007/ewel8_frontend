<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps<{
  model?: number | string;
  default?: number | string;
  items: Array<{
    label: string;
    value: any;
  }>;
}>();
const emit = defineEmits<{
  (e: "onChange", value: number): void;
}>();
const selectedValue = ref(props.default);
</script>
<template>
  <v-radio-group hide-details="false" v-model="selectedValue">
    <v-radio
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      @change="emit('onChange', $event.target.value)"
      @click:append="emit('onChange', $event.target.value)"
    ></v-radio>
  </v-radio-group>
</template>
