<script setup lang="ts">
import { defineProps, defineEmits, ref, withDefaults } from "vue";
import { useStoreUser } from "../store/user";
import type { VTextField } from "vuetify/components";
import CheckboxView from "./CheckboxView.vue";

type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];

const user = useStoreUser();
const delFlag = ref();
interface Props {
  title?: string;
  density?: TVDensity;
  label?: string;
  type?: string;
  name?: string;
  variant?: TVariant;
  hideDetails?: boolean | "auto";
  height?: number;
  value?: string | number | File;
  disabled?: boolean;
  privacyModel?: boolean;
  textarea?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
});

const emit = defineEmits<{
  (e: "onChange", value: Event): void;
  (e: "delFile", value: boolean): void;
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
      <div v-if="props.value">
        {{ props.value }}
        <CheckboxView
          label="削除"
          :hideDetail="true"
          class="small-checkbox"
          :value="delFlag"
          @onChange="(checked) => emit('delFile', (delFlag = checked))"
        ></CheckboxView>
      </div>

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
<style scoped lang="scss">
.small-checkbox {
  margin: 0 !important;
  padding: 0 !important;
}

/* Vuetify の内部 DOMへ届かせるため :deep を使う */
.small-checkbox :deep(.v-selection-control) {
  min-height: 20px !important;
  height: 20px !important;
}

.small-checkbox :deep(.v-selection-control__wrapper) {
  padding: 0 !important;
  margin: 0 !important;
}

.small-checkbox :deep(.v-label) {
  font-size: 13px !important;
  line-height: 20px !important;
}
</style>
