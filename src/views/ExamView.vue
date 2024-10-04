<script setup lang="ts">
import { ref } from "vue";
import ComponentTextField from "../components/TextFieldView.vue";
import ComponentButton from "../components/ButtonView.vue";

const inputData = ref({
  login_id: "",
  birth_date: "",
});

const onBlur = (val: string, key: string) => {
  inputData.value = {
    ...inputData.value,
    [key]: val,
  };
};

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};

const onClick = () => {
  console.log("onClick", inputData.value);
};
</script>

<template>
  <div class="bg-grey-lighten-4 fill-height">
    <v-container fluid>
      <v-row class="pa-4 align-center bg-white">
        <div>
          <v-img
            :width="50"
            aspect-ratio="1/1"
            cover
            src="../assets/logo.png"
          ></v-img>
        </div>
        <div class="text-h4 pl-2 font-weight-bold">test企業</div>
      </v-row>
    </v-container>

    <v-container class="pt-10">
      <div class="text-h6 font-weight-bold text-center">test検査</div>
      <p class="pt-4 pb-6 text-center">
        検査を実施します。<br />
        指示されたID/生年月日を入力後ログインを行ってください。
      </p>

      <v-card max-width="500" class="mx-auto pa-6">
        <ComponentTextField
          text="ログインID"
          name="login_id"
          density="compact"
          variant="outlined"
          :hideDetails="`auto`"
          @onBlur="(val) => (inputData.login_id = val)"
          class="mb-6"
          :rules="(val:string|any) => rules(val, 'ログインIDは必須入力です')"
        />
        <ComponentTextField
          text="生年月日"
          name="birth_date"
          density="compact"
          variant="outlined"
          :hideDetails="`auto`"
          @onBlur="(val) => (inputData.birth_date = val)"
          class="mb-6"
          type="date"
          :rules="(val:string|any) => rules(val, '生年月日は必須入力です')"
        />
        <div class="text-center">
          <ComponentButton
            text="LOGIN"
            color="primary"
            variant="tonal"
            @onClick="onClick()"
          />
        </div>
      </v-card>
    </v-container>
  </div>
</template>
