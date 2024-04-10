<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";

const headers: any = [
  { title: "Boat Type", align: "start", key: "name" },
  { title: "Speed (knots)", align: "end", key: "speed" },
  { title: "Length (m)", align: "end", key: "length" },
  { title: "Price ($)", align: "end", key: "price" },
  { title: "Year", align: "end", key: "year" },
];
const virtualBoats = [
  {
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
  {
    name: "OceanMaster",
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020,
  },
];

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 220;
};
</script>
<template>
  <v-row align="center" justify="center" v-resize="onResize">
    <v-sheet height="120px">
      <div class="d-flex flex-row justify-center mt-1">
        <ComponentButton
          text="企業情報変更"
          variant="outlined"
          density="compact"
          color="primary"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="新規パートナー登録"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="受検者検索"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="検査ログ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="PDF出力ログ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
      </div>
      <div class="d-flex flex-row justify-center mt-1">
        <ComponentButton
          text="検査種別ROWデータ"
          variant="outlined"
          density="compact"
          color="primary"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="請求書一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="ライセンス一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="トライアルID"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="お知らせ情報"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
      </div>
      <div class="d-flex flex-row justify-center mt-1">
        <ComponentButton
          text="受検者ログイン状況"
          variant="outlined"
          density="compact"
          color="primary"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="管理者ログイン状況"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="企業一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="PDF一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
        <ComponentButton
          text="セキュリティログ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1"
          width="150px"
        ></ComponentButton>
      </div>
    </v-sheet>

    <v-data-table
      :headers="headers"
      :items="virtualBoats"
      item-value="name"
      :fixed-header="true"
      :height="tableHeight"
    ></v-data-table>
  </v-row>
</template>
<style scoped></style>
