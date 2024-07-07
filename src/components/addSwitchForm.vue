<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps, defineEmits } from "vue";
import ComponentSwitch from "../components/SwitchView.vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

const props = defineProps<{
  title?: string;
  density?: TVDensity;
  label?: string;
  model?: boolean;
  tooltipflag?: boolean;
  tooltipMessage?: string;
  type?: string;
}>();

//const model = ref<boolean>(true);

const emit = defineEmits<{
  (e: "onUpdate", value: boolean, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2">
      {{ props.title }}
      <v-tooltip :text="props.tooltipMessage" v-if="props.tooltipflag">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <ComponentSwitch
        :title="props.title"
        :label="props.label"
        :density="props.density"
        :model="props.model"
        :type="props.type"
        @onUpdate="(e, type) => emit('onUpdate', e, type ?? '')"
      ></ComponentSwitch>
    </v-col>
  </v-row>
</template>
