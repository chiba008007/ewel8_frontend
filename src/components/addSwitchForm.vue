<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps } from "vue";
import ComponentSwitch from "../components/SwitchView.vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

const props = defineProps<{
  title?: string;
  density?: TVDensity;
  label?: string;
  model?: boolean;
}>();

//const model = ref<boolean>(true);

// const emit = defineEmits<{
//   (e: "onBlur", value: string, type: string): void;
// }>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2">{{
      props.title
    }}</v-col>
    <v-col sm="8" class="pa-1 border-sm">
      <ComponentSwitch
        :title="props.title"
        :label="props.label"
        :density="props.density"
        :model="props.model"
      ></ComponentSwitch>
    </v-col>
  </v-row>
</template>
