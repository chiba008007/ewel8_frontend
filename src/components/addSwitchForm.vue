<script setup lang="ts">
import { computed } from "vue";
import ComponentSwitch from "../components/SwitchView.vue";
import type { VTextField } from "vuetify/components";
type TVDensity = VTextField["$props"]["density"];

interface Props {
  title?: string;
  density?: TVDensity;
  label?: string;
  model?: boolean;
  tooltipflag?: boolean;
  tooltipMessage?: string;
  type?: string;
  color?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
  class: "",
});

const emit = defineEmits<{
  (e: "onClick", value: boolean, type: string): void;
}>();

const switchValue = computed({
  get: () => Boolean(props.model),
  set: (v) => {
    emit("onClick", v, props.type ?? "");
  },
});
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
      <v-tooltip :text="props.tooltipMessage" v-if="props.tooltipflag">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </v-col>
    <v-col sm="9" class="pa-1 border-sm" :class="props.class">
      <ComponentSwitch
        :title="props.title"
        :label="props.label"
        :density="props.density"
        :model="props.model"
        :type="props.type"
        v-model="switchValue"
      ></ComponentSwitch>
    </v-col>
  </v-row>
</template>
