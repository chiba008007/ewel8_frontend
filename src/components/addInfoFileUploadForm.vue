<script setup lang="ts">
import { defineProps, defineEmits, ref, withDefaults } from "vue";
import { useStoreUser } from "../store/user";
import fileUpload from "./fileUpload.vue";
import type { VTextField } from "vuetify/components";

type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];

const user = useStoreUser();

interface Props {
  title?: string;
  density?: TVDensity;
  label?: string;
  type?: string;
  name?: string;
  variant?: TVariant;
  hideDetails?: boolean | "auto";
  height?: number;
  value?: string | number;
  disabled?: boolean;
  privacyModel?: boolean;
  textarea?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
});

const emit = defineEmits<{
  (e: "onChange", value: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm blue d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <v-file-input
        clearable
        :label="props.label"
        :variant="props.variant"
        :density="props.density"
        @change="emit('onChange', $event)"
      />
    </v-col>
  </v-row>
</template>
