<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, computed } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

type Rule = (value: string) => true | string | Promise<true | string>;

type ValidationResult = string | boolean;
type RuleElement =
  | string
  | boolean
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)
  | [string, any, (string | undefined)?];

const adaptedRules = computed<RuleElement[] | null | undefined>(() => {
  const r = props.rules;
  if (r == null) return r; // null/undefined はそのまま
  return typeof r === "string"
    ? [r] // 文字列なら配列に包む
    : r; // 配列ならそのまま
});

interface Props {
  title?: string;
  text?: string;
  class?: string;
  hideDetails?: boolean | "auto";
  login_id?: string;
  person?: string;
  messages?: string;
  errormessage?: string;
  value?: string | number;
  type?: string;
  rules?: string | RuleElement[] | null;
  displayTextValue?: string;
  passwordFlag?: boolean;
  requriredIcon?: boolean;
  telSampleFlag?: boolean;
  maxlength?: number;
  color?: string;
  explaintext?: string;
  tooltipMessage?: string;
  tooltipflag?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
  testcount: 0,
});

const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
  (e: "onKeyup", value: string, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
      >{{ props.title }}
      <span v-if="props.requriredIcon" class="text-red">*</span>
      <v-tooltip :text="props.tooltipMessage" v-if="props.tooltipflag">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <p v-if="props.displayTextValue" class="pa-1">
        {{ props.displayTextValue }}
      </p>
      <ComponentTextField
        v-else
        :value="props.value"
        :text="props.text"
        density="compact"
        variant="outlined"
        :class="props.class"
        :hideDetails="props.hideDetails"
        :messages="props.messages"
        :errormessage="props.errormessage"
        :maxlength="props.maxlength"
        :rules="adaptedRules"
        @onBlur="emit('onBlur', $event, props.type ?? '')"
        @onKeyup="emit('onKeyup', $event, props.type ?? '')"
      />
      <p v-if="props.passwordFlag" class="text-caption">
        パスワードの長さは、半角8文字以上、半角15文字以下です。<br />
        パスワードに使用できる文字は、半角英数すべてです。<br />
        パスワードには英大文字・英小文字・数字それぞれを最低1文字ずつ含む必要があります。
      </p>
      <p v-if="props.explaintext" class="text-caption">
        {{ props.explaintext }}
      </p>
    </v-col>
  </v-row>
</template>
