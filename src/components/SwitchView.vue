<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

const model = ref<boolean>(true);
interface Props {
  density?: TVDensity;
  label?: string;
  model?: boolean;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  density: "compact",
  label: "利用する",
  model: true,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onUpdate", value: boolean, type: string): void;
}>();
</script>
<template>
  <v-switch
    class="ml-2"
    :v-model="props.model"
    :value="props.model"
    :density="props.density"
    :label="props.label"
    hide-details
    inset
    @update:modelValue="emit('onUpdate', model, props.type ?? '')"
  ></v-switch>
</template>
