<script setup lang="ts">
interface Props {
  src: string;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
}

const props = defineProps<Props>();
</script>

<template>
  <v-img
    :src="props.src"
    :width="props.width"
    :height="props.height"
    :max-width="props.maxWidth"
    :max-height="props.maxHeight"
    :min-height="props.minHeight"
  />
</template>
