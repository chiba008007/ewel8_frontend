<script setup lang="ts">
import { ref, defineEmits } from "vue";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuTest from "@/components/pankuzuTest.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

const item = ref([]);
const router = useRouter();

const testheaders = ref([
  { title: "重み付けマスター名", sortable: true },
  { title: "作成日", sortable: true },
  { title: "機能" },
]);

const testList = ref<{ title: string; createDate: string }[]>([]);

testList.value.push({
  title: "aaa",
  createDate: "2025/01/01",
});
const tableHeight = ref(100);
const tableWidth = ref(500);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
  const wWidth = window.innerWidth;
  tableWidth.value = wWidth;
};
</script>
<template>
  <PartnerAdmin coded="customer" />
  <v-row justify="center" class="mt-6">
    <TestMenu />
  </v-row>
  <pankuzuTest pageName="weightMaster"></pankuzuTest>
  <ButtonView
    text="新規登録"
    class="ml-3"
    color="lime"
    @onClick="router.push({ name: 'weightMasterSet' })"
  ></ButtonView>
  <v-row v-resize="onResize">
    <v-col class="ma-1">
      <v-data-table
        :headers="testheaders"
        :items="testList"
        class="listable ma-2 dataTableStyle dataTestList"
        :height="tableHeight"
        fixed-header
        color="green"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="w-50">{{ item.title }}</td>
            <td>{{ item.createDate }}</td>
            <td></td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<style lang="scss">
a.text-link {
  color: #0400ff;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: #00ff00;
    transition: 0.5s;
  }
}
</style>
