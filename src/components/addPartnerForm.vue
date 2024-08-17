<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const props = defineProps<{
  title?: string;
  text?: string;
  class?: string;
  hideDetails?: boolean | "auto";
  login_id?: string;
  person?: string;
  messages?: string;
  errormessage?: string;
  value?: string;
  type?: string;
  rules?: string | void | null;
  displayTextValue?: string;
  passwordFlag?: boolean;
  requriredIcon?: boolean;
  telSampleFlag?: boolean;
}>();
const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
  (e: "onKeyup", value: string, type: string): void;
}>();
</script>
<template>
  <v-row no-gutters>
    <v-col sm="3" class="border-sm bg-primary blue d-flex align-center pl-2"
      >{{ props.title }}
      <span v-if="props.requriredIcon" class="text-red">*</span>
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
        :rules="props.rules ?? ''"
        @onBlur="emit('onBlur', $event, props.type ?? '')"
        @onKeyup="emit('onKeyup', $event, props.type ?? '')"
      />
      <p v-if="props.passwordFlag" class="text-caption">
        パスワードの長さは、半角8文字以上、半角15文字以下です。<br />
        パスワードに使用できる文字は、半角英数すべてです。<br />
        パスワードには英大文字・英小文字・数字それぞれを最低1文字ずつ含む必要があります。
      </p>
    </v-col>
  </v-row>
</template>
