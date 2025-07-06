<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps<{
  modelValue?: number | string | null; // v-model 用
  default?: number | string | null; // 旧 default
  selectedValue?: number | string | null; // 旧 selectedValue
  items: Array<{ label: string; value: any }>;
  inline?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number | string | null): void;
  (e: "onChange", value: number | string | null): void;
}>();

// ✅ 優先順位: modelValue > selectedValue > default
const selected = ref<number | string | null>(
  props.modelValue ?? props.selectedValue ?? props.default ?? null
);

// 🔄 modelValue が変わったら反映
watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) selected.value = val;
  }
);

// 🔄 props.selectedValue や default も反映（フォールバック用途）
watch(
  () => props.selectedValue,
  (val) => {
    if (props.modelValue === undefined && val !== undefined)
      selected.value = val;
  }
);

watch(
  () => props.default,
  (val) => {
    if (
      props.modelValue === undefined &&
      props.selectedValue === undefined &&
      val !== undefined
    ) {
      selected.value = val;
    }
  }
);

// ✅ ユーザー操作時
watch(selected, (val) => {
  emit("update:modelValue", val);
  emit("onChange", val);
});
</script>

<template>
  <v-radio-group v-model="selected" :inline="props.inline" :hide-details="true">
    <v-radio
      v-for="item in props.items"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </v-radio-group>
</template>
