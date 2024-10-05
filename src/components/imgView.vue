<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  src: string;
  width?: number;
  height?: number;
  maxHeight?: number;
  minHeight?: number;
}
const props = withDefaults(defineProps<Props>(), {
  src: undefined,
});
console.log(props);
</script>

<template>
  <v-img
    :src="props.src"
    :width="props.width"
    :height="props.height"
    :max-height="props.maxHeight"
    :min-height="props.minHeight"
  ></v-img>
</template>
