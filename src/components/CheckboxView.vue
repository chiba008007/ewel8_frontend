<script setup lang="ts">
interface Props {
  label?: string;
  value?: number | string | undefined | null | boolean;
  selected?: string | undefined | object | boolean;
  hideDetail?: boolean | "auto";
  class?: string;
  checked?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  value: 0,
  selected: true,
  hideDetail: true,
  class: "",
  checked: true,
});
const emit = defineEmits<{
  (e: "update:modelValue", val: boolean): void;
  (e: "onChange", val: boolean): void;
}>();
</script>
<template>
  <v-checkbox
    class="ml-2"
    :label="props.label"
    :hide-details="props.hideDetail"
    :class="props.class"
    :model-value="!!props.value"
    density="compact"
    @update:model-value="
      (val) => {
        const checked = val as boolean
        emit('update:modelValue', checked)
        emit('onChange', checked)
      }
    "
  ></v-checkbox>
</template>
<style scoped>
/* チェックボックス間の余白を縮める */
.pdf-checkbox {
  margin: 0;
}

/* Vuetify標準の入力領域の高さを縮める */
.pdf-checkbox :deep(.v-input__control) {
  min-height: 36px;
}
</style>
