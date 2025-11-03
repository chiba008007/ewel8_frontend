<script setup lang="ts">
import { ref, defineEmits, defineProps } from "vue";
import { useDate } from "vuetify";

// ロケール付き dateAdapter を作成
const dateAdapter = useDate();

const props = defineProps<{
  value: string;
  clearable?: boolean;
}>();

const menu = ref(false);
//const selected = ref(new Date());
const selected = ref(new Date(props.value));
const display = ref("");

const emit = defineEmits<{
  (e: "update:value", value: string): void;
  (e: "onClear"): void;
}>();

// 選択された日付の表示を日本語にする
function updateDisplay(date: Date) {
  if (!date || isNaN(date.getTime())) {
    display.value = "";
    return;
  }
  const dateOnly = date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
  emit("update:value", dateOnly); // ← 親の startDate に送る

  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
  display.value = formatter.format(date);
  menu.value = false;
}

// 初期化
updateDisplay(selected.value);
</script>

<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
  >
    <template #activator="{ props: menuProps }">
      <v-text-field
        v-bind="menuProps"
        v-model="display"
        readonly
        density="compact"
        variant="outlined"
        prepend-icon="mdi-calendar"
        hide-details
        :clearable="props.clearable"
        @click:clear="emit('onClear')"
      />
    </template>

    <v-date-picker
      v-model="selected"
      @update:model-value="updateDisplay"
      :adapter="dateAdapter"
      color="primary"
    />
  </v-menu>
</template>
