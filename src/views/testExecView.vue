<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStoreUser } from "../store/user";

import InfoAreaView from "../components/InfoAreaView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRoute } from "vue-router";
import testExecApi from "@/services/testExecApi";
import pageClickMove from "../plugins/pagemove";
import pankuzuMain from "@/components/pankuzuMain.vue";

import ProgressView from "@/components/ProgressView.vue";
import DateView from "@/components/DateView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import CsvDownload from "@/components/csvDownload.vue";
import ExcelApiService from "@/services/ExcelApiService";
import { d_Path } from "@/plugins/const";

const user = useStoreUser();
const move = pageClickMove();
const route = useRoute();
const tmpid = route.params.id;
const loadingFlag = ref(true);
const customer = ref({ text: "選択してください" });

const today = new Date();
const oneYearAgo = new Date(today);
oneYearAgo.setFullYear(today.getFullYear() - 1); // ← ここで1年前にずらす
const yearStr = oneYearAgo
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "-");
const todayStr = today
  .toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "-");

const startDate = ref(yearStr);
const endtDate = ref(todayStr);
interface Customer {
  id: number;
  name: string;
}
const customerList = ref<Customer[]>([]);
const customerVal = ref(0);
const examList = ref([]);
onMounted(() => {
  // 初期ロード時に実行される処理
  getCustomerList();
});

const getCustomerList = async () => {
  try {
    const res = await testExecApi.getUserElement({
      edit_id: tmpid,
    });

    // 必要なフィールドだけ取り出す
    customerList.value = res.data.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));

    loadingFlag.value = false;
  } catch (e) {
    console.error(e);
  }
};
const onChangeList = () => {
  getExec();
};

const getExec = async () => {
  try {
    loadingFlag.value = true;
    const res = await testExecApi.getExec({
      partner_id: tmpid,
      customer_id: customerVal.value,
      startdaytime: startDate.value,
      enddaytime: endtDate.value,
    });
    examList.value = res.data;
    loadingFlag.value = false;
  } catch (e) {
    console.error(e);
  }
};

const headerTable = ref([
  { title: "検査名", key: "testname" },
  { title: "受検者数", key: "examCount" },
  { title: "受検総数", key: "totalCount" },
]);

const download = async () => {
  try {
    const res = await ExcelApiService.testExec({
      partner_id: tmpid,
      customer_id: customerVal.value,
      startdaytime: startDate.value,
      enddaytime: endtDate.value,
    });

    location.href = d_Path + "/" + res.data.file_path;
    loadingFlag.value = false;
  } catch (e) {
    console.error(e);
  }
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customerTOP" />
  <InfoAreaView />
  <v-row justify="center" class="my-2">
    <CustomerMenu />
  </v-row>
  <pankuzuMain
    :partnerid="tmpid"
    :adminhref="{ pageName: 'testExec' }"
  ></pankuzuMain>
  <v-main class="pt-0">
    <v-container fluid class="pt-0">
      <v-row>
        <v-col cols="3">
          テスト期間<br />
          <DateView
            v-model:value="startDate"
            name="start"
            density="compact"
            @update:value="onChangeList()"
          />
        </v-col>
        <v-col cols="3" class="d-flex align-end">
          <DateView
            v-model:value="endtDate"
            name="end"
            density="compact"
            @update:value="onChangeList()"
          />
        </v-col>
        <v-col cols="6">
          顧客選択<br />
          <SelectFieldView
            :items="customerList"
            :text="customer.text"
            @onChange="
              (e) => (
                (customerVal = Number(e)), onChangeList(), (customer.text = e)
              )
            "
          ></SelectFieldView>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="examList.length > 0">
        <v-col>
          <ButtonView
            text="ダウンロード"
            color="primary"
            @onClick="download()"
          ></ButtonView>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headerTable"
        :items="examList"
        class="listable ma-2"
        fixed-header
      >
      </v-data-table>
    </v-container>
  </v-main>
</template>
<style lang="scss"></style>
