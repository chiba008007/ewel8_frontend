<script setup lang="ts">
import { ref, computed } from "vue";
import { useStoreUser } from "../store/user";
import TextAreaField from "../components/TextAreaFieldView.vue";
import type { VTextField } from "vuetify/components";
import { edittingStatus } from "@/plugins/const";
type TVariant = VTextField["$props"]["variant"];
type TVDensity = VTextField["$props"]["density"];
import ComponentSwitch from "../components/SwitchView.vue";
const user = useStoreUser();
const privacy = ref(user.privacyText);
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
  (e: "onUpdate", value: boolean, type: string): void;
  (e: "onClick", value: boolean): void;
  (e: "onBlur", value: string): void;
}>();
// 表示ラベルをSwitch状態から作る
// ラベル表示
const privacyModel = computed({
  get() {
    return props.privacyModel ?? false;
  },
  set(value: boolean) {
    emit("onClick", value);
  },
});

const privacyLabel = computed(() => {
  return edittingStatus[privacyModel.value ? 1 : 0];
});
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm blue d-flex align-center pl-2"
      :class="props.color"
    >
      プライバシーポリシー
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <ComponentSwitch
        :label="privacyLabel"
        :type="props.type"
        v-model="privacyModel"
      />
      <TextAreaField
        :name="props.name"
        :variant="props.variant"
        :hideDetails="props.hideDetails"
        :height="props.height"
        :value="props.textarea ? props.textarea : privacy"
        :disabled="props.disabled"
        @onBlur="(e:string) => emit('onBlur', e)"
      ></TextAreaField>
    </v-col>
  </v-row>
</template>
