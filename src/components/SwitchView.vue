<script setup lang="ts">
import { defineProps, withDefaults, defineEmits, ref } from "vue";
import ComponentSwitch from "../components/SwitchView.vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

const model = ref<boolean>(true);
interface Props {
  title?: string;
  density?: TVDensity;
  label?: string;
  model?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "申込み検査ボタン",
  density: "compact",
  label: "利用する",
  model: true,
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onBlur", value: string): void;
}>();
</script>
<template>
  <v-switch
    class="ml-2"
    v-model="model"
    :value="props.model"
    :density="props.density"
    :label="props.label"
    hide-details
    inset
  ></v-switch>
</template>
