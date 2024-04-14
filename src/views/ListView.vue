<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import AdminMenu from "../components/AdminMenu.vue";
const headers = [
  { title: "企業名", sortable: false, key: "name" },
  { title: "購入ライセンス", sortable: false, key: "speed" },
  { title: "販売可能ライセンス数", sortable: false, key: "length" },
  { title: "受検者数", sortable: false, key: "price" },
  { title: "処理数", sortable: false, key: "year" },
  { title: "残数", sortable: false, key: "zan" },
  { title: "機能", sortable: false, key: "kino" },
];
const desserts = [
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
  {
    id: 1,
    name: "Speedster",
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021,
    zan: 123,
  },
];

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
</script>
<template>
  <v-row align="center" justify="center" v-resize="onResize">
    <AdminMenu />
  </v-row>
  <v-card subtitle="検索フォーム" width="100%" class="ma-0 px-3" elevation="0">
    <v-row>
      <v-col cols="4">
        <ComponentTextField
          placeholder="企業名を入力してください"
          text="企業名で検索"
          density="compact"
          variant="outlined"
          class="w-100"
        />
      </v-col>
      <v-col cols="3">
        <ComponentButton text="検索" color="primary" />
      </v-col>
    </v-row>
  </v-card>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="listable mt-0"
    :height="tableHeight"
    fixed-header
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
  <!-- <v-table :height="tableHeight" fixed-header class="listable mt-0">
    <thead>
      <tr>
        <th class="text-center" v-for="val in headers" :key="val.title">
          {{ val.title }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td class="text-right">{{ item.speed }}</td>
        <td class="text-right">{{ item.speed }}</td>
        <td class="text-right">{{ item.speed }}</td>
        <td class="text-right">{{ item.speed }}</td>
        <td class="text-right">{{ item.speed }}</td>
        <td class="text-center">
          <ComponentButton text="パートナ" color="success" density="compact" />
          <ComponentButton
            text="更新"
            color="success"
            class="ml-2"
            density="compact"
          />
          <ComponentButton
            text="添付"
            color="success"
            class="ml-2"
            density="compact"
          />
        </td>
      </tr>
    </tbody>
  </v-table> -->
</template>
<style lang="scss">
.listable {
  table {
    th {
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      background-color: #ccffff !important;
    }
    th,
    td {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
  }
}

.v-text-field >>> input {
  font-size: 1.9em;
  padding: 0 !important;
}
</style>
