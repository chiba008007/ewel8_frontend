<script setup lang="ts">
const overlay = true;
</script>
<template>
  <v-overlay v-model="overlay"></v-overlay>
  <v-progress-circular
    indeterminate
    :size="128"
    :width="12"
    class="progress-position"
  ></v-progress-circular>
</template>
<style lang="scss" scoped>
.progress-position {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
}
</style>
