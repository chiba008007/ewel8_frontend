<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from "vue";
import ComponentSelectField from "@/components/SelectFieldView.vue";

interface Props {
  title?: string;
  label?: string;
  items?: object[];
  hideDetails?: boolean | "auto";
  class?: string;
  value?: string;
  type?: string;
  color?: string;
  rules?: Array<(v: any) => true | string>;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  label: "",
  class: "",
  value: "",
  type: "",
  color: "bg-primary",
  rules: () => [],
});

const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
  (e: "onChange", value: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm blue d-flex align-center pl-2"
      :class="props.color"
      >{{ props.title }}</v-col
    >
    <v-col sm="9" class="pa-1 border-sm">
      <ComponentSelectField
        :items="props.items"
        :label="props.label"
        :hideDetails="props.hideDetails"
        :class="props.class"
        :text="props.value"
        :rules="props.rules"
        @onBlur="emit('onBlur', $event, props.type ?? '')"
        @onChange="emit('onChange', $event)"
      ></ComponentSelectField>
    </v-col>
  </v-row>
</template>
