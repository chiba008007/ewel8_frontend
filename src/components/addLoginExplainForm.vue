<script setup lang="ts">
import { ref } from "vue";
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
  modelValue: boolean;
  color?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean | null): void;
  (e: "onBlur", value: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <ComponentSwitch
        :modelValue="props.modelValue"
        @update:modelValue="(v) => emit('update:modelValue', v)"
        :label="props.label"
        :type="props.type"
      />
      <TextAreaField
        :name="props.name"
        :variant="props.variant"
        :value="props.value"
        :hideDetails="props.hideDetails"
        :height="props.height"
        :disabled="props.disabled"
        @onBlur="(e:string) => emit('onBlur', e)"
      ></TextAreaField>
      <span class="text-caption text-red">
        ログイン画面で利用される説明文です。<br />
        空欄の場合は初期状態で表示されます。
      </span>
    </v-col>
  </v-row>
</template>
