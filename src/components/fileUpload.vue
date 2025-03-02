<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from "vue";
import { VFileUpload } from "vuetify/lib/labs/components.mjs";
import ButtonView from "./ButtonView.vue";
type TVDensity = VFileUpload["$props"]["density"];
interface Props {
  label?: string;
  density?: TVDensity;
  variant?:
    | "outlined"
    | "filled"
    | "underlined"
    | "plain"
    | "solo"
    | "solo-inverted"
    | "solo-filled";
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  density: "compact",
  variant: "outlined",
  label: "ファイル選択してください",
  color: "",
});

const emit = defineEmits<{
  (e: "onChange", value: Event): void;
  (e: "onClick", value: string): void;
}>();
</script>
<template>
  <div class="mt-3">
    <v-row no-gutters class="mt-3">
      <v-col cols="6" :class="props.color">
        <v-file-input
          clearable
          :label="props.label"
          :variant="props.variant"
          :density="props.density"
          @change="emit('onChange', $event)"
        />
      </v-col>
      <v-col>
        <ButtonView
          text="アップロード"
          class="ml-3"
          color="primary"
          @click="emit('onClick', 'on')"
        ></ButtonView>
      </v-col>
    </v-row>
  </div>
</template>
<style type="text/css">
.w500 {
  width: 500px;
  margin-left: 10px;
}
</style>
