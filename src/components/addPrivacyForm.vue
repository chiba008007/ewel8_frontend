<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps, defineEmits } from "vue";
import TextAreaField from "../components/TextAreaFieldView.vue";
import type { VTextField } from "vuetify/components";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];
import ComponentSwitch from "../components/SwitchView.vue";

const props = defineProps<{
  title?: string;
  density?: TVDensity;
  label?: string;
  type?: string;
  name?: string;
  variant?: TVariant;
  hideDetails?: boolean | "auto";
  height?: number;
  value?: string;
  disabled?: boolean;
}>();

//const model = ref<boolean>(true);

const emit = defineEmits<{
  (e: "onUpdate", value: boolean, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2">
      プライバシーポリシー
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <ComponentSwitch
        label="編集/利用する"
        type="privacyEdit"
      ></ComponentSwitch>
      <TextAreaField
        :name="props.name"
        :variant="props.variant"
        :hideDetails="props.hideDetails"
        :height="props.height"
        :value="props.value"
        :disabled="props.disabled"
      ></TextAreaField>
    </v-col>
  </v-row>
</template>
