<script setup lang="ts">
import ComponentTextField from "../components/TextFieldView.vue";
import CheckboxView from "./CheckboxView.vue";

const props = defineProps<{
  login_id?: string;
  person?: string;
  personAddress?: string;
  twoFactorEnabled?: boolean;
}>();
const emit = defineEmits<{
  (e: "onBlur", value: string | boolean, type: string): void;
}>();
const onChange = (value: boolean, key: string) => {
  emit("onBlur", value, key);
};
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
      <v-col sm="3">
        <v-sheet class="mt-4">2段階認証利用有無</v-sheet>
      </v-col>
      <v-col sm="9">
        <CheckboxView
          label="2段階認証"
          :value="props.twoFactorEnabled"
          @update:modelValue="(val) => onChange(val, 'two_factor_enabled')"
        ></CheckboxView>
      </v-col>
    </v-row>
  </v-container>
</template>
