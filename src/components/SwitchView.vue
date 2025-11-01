<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

const model = ref<boolean>(true);
interface Props {
  density?: TVDensity;
  label?: string;
  model?: boolean | string | number;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  density: "compact",
  label: "利用する",
  model: true,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onClick", value: any, type: string): void;
  (e: "onChange", value: string | number | boolean | null): void;
}>();
</script>
<template>
  <v-switch
    class="ml-2"
    :v-model="props.model"
    :model-value="props.model"
    :density="props.density"
    :label="props.label"
    hide-details
    inset
    @click="emit('onClick', props.model, props.type ?? '')"
    @update:modelValue="emit('onChange', $event)"
  ></v-switch>
</template>
