<script setup lang="ts">
import { ref, onMounted } from "vue";

import AdminMenu from "../components/AdminMenu.vue";
import { useStoreUser } from "@/store/user";
import pankuzuAdmin from "@/components/pankuzuAdmin.vue";
import LicenseApiService from "@/services/LicenseApiService";
import ButtonView from "@/components/ButtonView.vue";
import { d_Path } from "@/plugins/const";

const user = useStoreUser();

const licenseData = ref();
const error = ref();

onMounted(async () => {
  try {
    const response = await LicenseApiService.getData();
    console.log(response.data);
    licenseData.value = response.data;
  } catch (err) {
    error.value = err;
    console.error("取得失敗:", err);
  }
});
const onClick = (code: string) => {
  location.href = d_Path + "/examRowData/" + code;
};
</script>
<template>
  <v-row justify="center">
    <AdminMenu />
  </v-row>
  <pankuzuAdmin :pageName="user.examRowData"></pankuzuAdmin>
  <p class="text-h6 pa-2">CSVダウンロード</p>
  <div class="ma-2">
    <table class="w-100 bordered-table">
      <tr>
        <th class="bg-primary pa-2">テストタイプ</th>
        <th class="bg-primary pa-2">テスト名</th>
        <th class="bg-primary pa-2">ダウンロード</th>
      </tr>
      <tbody v-if="licenseData && licenseData.license">
        <template v-for="(lic, licKey) in licenseData.license" :key="licKey">
          <tr v-for="(item, key) in lic.list" :key="licKey + '-' + key">
            <td class="ps-2">{{ item.code }}</td>
            <td class="ps-2">{{ item.text }}</td>
            <td class="text-center">
              <ButtonView
                text="ダウンロード"
                class="my-2 bg-success"
                @onClick="onClick(item.code)"
              ></ButtonView>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.bordered-table th,
.bordered-table td {
  border: 1px solid #ccc;
  width: 33%;
}
.bordered-table {
  border-collapse: collapse;
}
</style>
