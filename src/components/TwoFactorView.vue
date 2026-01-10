<script setup lang="ts">
import { computed } from "vue";
import ButtonView from "./ButtonView.vue";
import TextFieldView from "./TextFieldView.vue";

const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onClick"): void;
  (e: "update:modelValue", value: boolean): void;
}>();

const props = defineProps<{
  modelValue: boolean;
}>();

const dialogModel = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>
<template>
  <v-dialog max-width="400" v-model="dialogModel">
    <v-card>
      <v-card-title>2段階認証</v-card-title>
      <v-card-text>
        <TextFieldView
          text="認証コード"
          @onKeyup="($event) => emit('onKeyup', $event)"
        ></TextFieldView>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <button-view
          text="確認"
          class="bg-primary"
          @onClick="emit('onClick')"
        ></button-view>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<style lang="scss" scoped>
@import "@/assets/styles/util.scss";
</style>
