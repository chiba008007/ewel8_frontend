<script setup lang="ts">
import { ref } from "vue";
import ComponentTextField from "@/components/TextFieldView.vue";
import ComponentButton from "@/components/ButtonView.vue";
import ComponentImg from "@/components/imgView.vue";

const inputData = ref({
  login_id: "",
  birth_date: "",
});

const rules = (value: string | null, text: string) => {
  return !value ? text : null;
};

const onClick = () => {
  console.log("onClick", inputData.value);
};
</script>

<template>
  <v-container fluid>
    <v-row class="pa-4 align-center bg-white">
      <v-col md="1" cols="3">
        <ComponentImg
          :maxHeight="50"
          :src="require('@/assets/logo.png')"
        ></ComponentImg>
      </v-col>
      <v-col class="text-h6 pl-2 font-weight-bold" md="11" cols="9"
        >test企業</v-col
      >
    </v-row>
  </v-container>

  <v-container>
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
        messages="例:1995/11/07"
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
</template>
