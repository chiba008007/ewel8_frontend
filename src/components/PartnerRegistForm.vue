<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";

const props = defineProps<{
  login_id?: string;
  person?: string;
  personAddress?: string;
}>();
const emit = defineEmits<{
  (e: "onBlur", value: string, type: string): void;
}>();
</script>
<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="3">
        <v-sheet class="mt-2">ID</v-sheet>
      </v-col>
      <v-col sm="9">
        <v-sheet class="">
          <ComponentTextField
            text="IDを入力"
            density="compact"
            variant="outlined"
            class="w-25"
            :value="props.login_id"
            :hideDetails="true"
            @onBlur="emit('onBlur', $event, 'login_id')"
          />
        </v-sheet>
      </v-col>
      <v-col sm="3">
        <v-sheet class="mt-4">パスワード</v-sheet>
      </v-col>
      <v-col sm="9">
        <v-sheet class="">
          <ComponentTextField
            text="パスワード"
            density="compact"
            variant="outlined"
            class="w-50 mt-2"
            :hideDetails="false"
            :messages="`変更しない場合は空欄`"
            @onBlur="emit('onBlur', $event, 'password')"
          />
        </v-sheet>
      </v-col>
      <v-col sm="3">
        <v-sheet class="mt-4">担当者氏名</v-sheet>
      </v-col>
      <v-col sm="9">
        <v-sheet class="">
          <ComponentTextField
            text="担当者氏名"
            density="compact"
            variant="outlined"
            class="w-50 mt-2"
            :value="props.person"
            @onBlur="emit('onBlur', $event, 'person')"
          />
        </v-sheet>
      </v-col>
      <v-col sm="3">
        <v-sheet class="mt-4">担当者メールアドレス</v-sheet>
      </v-col>
      <v-col sm="9">
        <v-sheet class="">
          <ComponentTextField
            text="担当者メールアドレス"
            density="compact"
            variant="outlined"
            class="w-50 mt-2"
            :value="props.personAddress"
            @onBlur="emit('onBlur', $event, 'person_address')"
          />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
