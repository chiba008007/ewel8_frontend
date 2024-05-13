<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";

const model = ref<boolean>(true);
interface Props {
  label?: string;
  value?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  value: false,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onBlur", value: string): void;
}>();
</script>
<template>
  <v-checkbox
    class="ml-2"
    v-model="model"
    :label="props.label"
    :value="props.value"
  ></v-checkbox>
</template>
