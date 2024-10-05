<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref } from "vue";
import ComponentButton from "@/components/ButtonView.vue";

const emit = defineEmits<{
  (e: "onOkClick"): void;
}>();

interface Props {
  text: string;
  title?: string;
  message: string;
  okButtonText?: string;
  cancelButtonText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: undefined,
  title: "確認",
  message: undefined,
  okButtonText: "OK",
  cancelButtonText: "CANCEL",
});

const dialog = ref(false);
</script>
<template>
  <v-btn color="secondary" class="mr-2">
    {{ props.text }}
    <v-dialog v-model="dialog" activator="parent">
      <v-card class="text-center">
        <v-card-title class="text-h6">{{ props.title }}</v-card-title>
        <v-card-text>
          {{ props.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <ComponentButton
            :text="props.cancelButtonText"
            color="red"
            @onClick="dialog = false"
          />
          <ComponentButton
            :text="props.okButtonText"
            color="green darken-1"
            @onClick="emit('onOkClick')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
