<script setup lang="ts">
import { ref } from "vue";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import AdminMenu from "../components/AdminMenu.vue";
import UserApiService from "@/services/UserApiService";
import { useRouter } from "vue-router";
import { sleep } from "../plugins/const";
const router = useRouter();
const loading = ref(true);
const headers = [
  { title: "企業名", sortable: false, key: "name" },
  { title: "購入ライセンス", sortable: false, key: "speed" },
  { title: "販売可能ライセンス数", sortable: false, key: "length" },
  { title: "受検者数", sortable: false, key: "price" },
  { title: "処理数", sortable: false, key: "year" },
  { title: "残数", sortable: false, key: "zan" },
  { title: "機能", sortable: false, key: "kino" },
];

let tmp = {
  type: "partner",
};
const desserts = ref<object[]>([]);
try {
  UserApiService.getPartner(tmp).then(function (rlt) {
    if (rlt) {
      const entries = Object.entries(rlt);
      for (const [key, val] of entries) {
        if (key == "data") {
          desserts.value.push(val.user);
        }
      }
      // console.log(desserts);
      loading.value = false;
    }
  });
} catch (e) {
  console.log(e);
}
const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};

const pageClickMove = (pagename: string, id: number) => {
  router.push(router.resolve({ name: pagename, params: { id: id } }).href);
};
</script>
<template>
  <v-row justify="center" v-resize="onResize">
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
    :items="desserts[0]"
    class="listable ma-2"
    :height="tableHeight"
    fixed-header
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="w-25">{{ item.name }}</td>
        <td class="text-right">{{ item.total }}</td>
        <td class="text-xs-right">{{ item.length }}</td>
        <td class="text-xs-right">{{ item.price }}</td>
        <td class="text-xs-right">{{ item.year }}</td>
        <td class="text-xs-right">{{ item.zan }}</td>
        <td class="text-center">
          <ComponentButton
            text="企業一覧"
            color="success"
            density="compact"
            @onClick="pageClickMove('customerList', item.id)"
          />
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
    </template>
  </v-data-table>
</template>
<style lang="scss"></style>
