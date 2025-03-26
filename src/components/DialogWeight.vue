<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";

const emit = defineEmits<{
  (e: "onOkClick"): void;
  (e: "onCancel"): void;
}>();

interface InputData {
  [key: string]: string | undefined;
}

interface Props {
  text?: string;
  title?: string;
  message?: string;
  okButtonText?: string;
  cancelButtonText?: string;
  dialogFlag?: boolean;
  inputData?: InputData;
  elements?: object;
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  title: "確認",
  message: undefined,
  okButtonText: "はい",
  cancelButtonText: "いいえ",
  dialogFlag: false,
  inputData: undefined,
  elements: undefined,
});
</script>
<template>
  <v-dialog v-if="props.dialogFlag" activator="parent" persistent="true">
    <v-card class="text-center">
      <v-card-title class="text-h6">{{ props.title }}</v-card-title>
      <v-card-text>
        {{ props.message }}

        <v-row>
          <v-col v-for="(elem, index) in elements" :key="elem.text" cols="3">
            {{ elem.text }}<br />
            {{ props.inputData[`element${index + 1}`] }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <ComponentButton
          :text="props.cancelButtonText"
          color="red"
          @onClick="emit('onCancel')"
        />
        <ComponentButton
          :text="props.okButtonText"
          color="green darken-1"
          @onClick="emit('onOkClick')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
