<script setup lang="ts">
import { defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
}>();

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};
</script>
<template>
  <v-sheet>
    <ComponentTextField
      text="ログインID"
      density="compact"
      variant="outlined"
      :hideDetails="`auto`"
      @onBlur="emit('onBlur', $event, 'login_id')"
      class="mb-6"
      :rules="(val:string|any) => rules(val, 'ログインIDは必須入力です')"
    />
  </v-sheet>
  <ComponentTextField
    text="生年月日"
    density="compact"
    variant="outlined"
    :hideDetails="`auto`"
    @onBlur="emit('onBlur', $event, 'birth_date')"
    class="mb-6"
    type="date"
    :rules="(val:string|any) => rules(val, '生年月日は必須入力です')"
  />
</template>
