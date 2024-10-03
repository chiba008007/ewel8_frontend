<script setup lang="ts">
import { ref } from "vue";
import ExamForm from "../components/ExamForm.vue";

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
</script>

<template>
  <div class="bg-grey-lighten-4 fill-height">
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

    <v-container class="pt-10">
      <div class="text-h6 font-weight-bold text-center">test検査</div>
      <p class="pt-4 pb-6 text-center">
        検査を実施します。<br />
        指示されたID/生年月日を入力後ログインを行ってください。
      </p>

      <v-card max-width="500" class="mx-auto pt-3">
        <v-card-actions>
          <v-col>
            <ExamForm @onBlur="(val, key) => onBlur(val, key)" />
            <div class="text-center">
              <v-btn color="primary" variant="tonal">LOGIN</v-btn>
            </div>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
