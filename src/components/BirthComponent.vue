<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentSelectField from "@/components/SelectFieldView.vue";
import { requiredValue } from "@/plugins/validate";
interface Props {
  type?: string;
  monthValue?: string;
  dayValue?: string;
  yearValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  monthValue: "1",
  dayValue: "1",
  yearValue: "1",
});
const emit = defineEmits<{
  (e: "onKeyup", value: string): void;
  (e: "onBlur", value: string): void;
  (e: "onMonthChange", value: string): void;
  (e: "onDayChange", value: string): void;
  (e: "onYear", value: string): void;
}>();
const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const day = [] as number[];
for (let i = 1; i <= 31; i++) {
  day.push(i);
}
</script>
<template>
  <div class="d-flex">
    <ComponentTextField
      text="年"
      :value="props.yearValue"
      @onBlur="(e) => emit('onYear', e)"
      :rules="requiredValue(props.yearValue, '年')"
    ></ComponentTextField>
    <p class="pa-2">年</p>
    <ComponentSelectField
      label="月"
      :items="month"
      :text="props.monthValue"
      @onChange="(e) => emit('onMonthChange', e)"
    ></ComponentSelectField>
    <p class="pa-2">月</p>
    <ComponentSelectField
      label="日"
      :items="day"
      :text="props.dayValue"
      @onChange="(e) => emit('onDayChange', e)"
    ></ComponentSelectField>
    <p class="pa-2">日</p>
  </div>
</template>
