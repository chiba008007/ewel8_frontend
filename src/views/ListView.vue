<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";

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
  tableHeight.value = wHeight - 240;
};
</script>
<template>
  <v-row align="center" justify="center" v-resize="onResize">
    <v-sheet height="120px" width="70%">
      <div class="d-flex flex-row justify-center mt-5">
        <ComponentButton
          text="企業情報変更"
          variant="outlined"
          density="compact"
          color="primary"
          class="w-25"
        ></ComponentButton>
        <ComponentButton
          text="新規パートナー登録"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="受検者検索"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="検査ログ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="PDF出力ログ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
      </div>
      <div class="d-flex flex-row justify-center mt-1">
        <ComponentButton
          text="検査種別ROWデータ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="請求書一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="ライセンス一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="トライアルID"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="お知らせ情報"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
      </div>
      <div class="d-flex flex-row justify-center mt-1">
        <ComponentButton
          text="受検者ログイン状況"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="管理者ログイン状況"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="企業一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="PDF一覧"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
        <ComponentButton
          text="セキュリティログ"
          variant="outlined"
          density="compact"
          color="primary"
          class="ml-1 w-25"
        ></ComponentButton>
      </div>
    </v-sheet>
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
  <v-table :height="tableHeight" fixed-header class="listable mt-0">
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
  </v-table>
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
