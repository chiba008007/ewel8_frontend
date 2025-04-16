<script setup lang="ts">
import { ref } from "vue";
import { useStoreUser } from "../store/user";

import InfoAreaView from "../components/InfoAreaView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRoute } from "vue-router";
import UserApiService from "@/services/UserApiService";
import pageClickMove from "../plugins/pagemove";
import pankuzuCustomer from "@/components/pankuzuCustomer.vue";

const move = pageClickMove();
const route = useRoute();
const user = useStoreUser();
const tmpid = route.params.id;

const customerheaders = ref([
  { title: "企業名", key: "campany" },
  { title: "受検者数", key: "examCount" },
  { title: "処理数", key: "syoriCount" },
  { title: "残数", key: "zanCount" },
  { title: "機能", key: "method" },
]);
const headers = ref([
  { title: "検査種別", key: "examType" },
  { title: "購入ライセンス", key: "buyLisence" },
  { title: "販売可能ライセンス", key: "saleLisence" },
  { title: "受検者数", key: "examCount" },
  { title: "処理数", key: "syoriCount" },
  { title: "残数", key: "zanCount" },
]);
const customerList = ref([
  {
    id: "",
    campany: "",
    examCount: 0,
    syoriCount: 0,
    zanCount: 0,
    method: "",
  },
]);
const data = ref([
  {
    examType: "",
    buyLisence: 0,
    saleLisence: 0,
    examCount: 0,
    syoriCount: 0,
    zanCount: 0,
  },
]);
// ライセンス一覧
let tmp = { user_id: tmpid };
UserApiService.getLisencesList(tmp)
  .then(function (res: any) {
    data.value = [];
    res.data.map((val: any) => {
      data.value.push({
        examType: val.code,
        buyLisence: val.num,
        saleLisence: val.num - val.exam_count,
        examCount: val.exam_count,
        syoriCount: val.started_exam_count,
        zanCount: val.exam_count - val.ended_exam_count,
      });
    });
  })
  .catch((e) => {
    alert("ライセンス取得 ERROR" + e);
  });
// 顧客一覧
let ctmp = { partner_id: tmpid };
UserApiService.getCustomerList(ctmp)
  .then(function (res: any) {
    customerList.value = [];
    res.data.map(function (value: any) {
      customerList.value.push({
        id: value.id,
        campany: value.name,
        examCount: value.count,
        syoriCount: value.syori,
        zanCount: value.zan,
        method: "",
      });
    });
  })
  .catch((e) => {
    location.href = "/error";
  });

const tab = ref(0);
const onMove = (param: string, key: number) => {
  move.pageClickMoveParamCode(param, key);
};
</script>
<template>
  <PartnerAdmin coded="customerTOP" />
  <InfoAreaView />
  <v-row justify="center">
    <CustomerMenu />
  </v-row>
  <pankuzuCustomer></pankuzuCustomer>
  <v-row>
    <v-col class="ma-1">
      <v-tabs v-model="tab">
        <v-tab value="1">顧客一覧</v-tab>
        <v-tab value="2">検査一覧</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="1">
          <v-data-table
            :headers="customerheaders"
            :items="customerList"
            class="listable ma-2"
            fixed-header
          >
            <template v-slot:item="{ item }">
              <tr>
                <td class="w-50">{{ item.campany }}</td>
                <td>{{ item.examCount }}</td>
                <td>{{ item.syoriCount }}</td>
                <td>{{ item.zanCount }}</td>
                <td class="w-25">
                  <ButtonView
                    text="検査一覧"
                    color="success"
                    size="small"
                    @click="onMove('testLists', parseInt(item.id))"
                  ></ButtonView>
                  <ButtonView
                    text="更新"
                    color="success"
                    size="small"
                    class="ml-1"
                    @click="
                      move.pageClickMoveParamCodeList(
                        'customerEdit',
                        tmpid,
                        item.id
                      )
                    "
                  ></ButtonView>
                  <ButtonView
                    text="削除"
                    color="red"
                    size="small"
                    class="ml-1"
                  ></ButtonView>
                  <ButtonView
                    text="添付"
                    color="success"
                    size="small"
                    class="ml-1"
                    @click="
                      move.pageClickMoveParamCodeList(
                        'uploadView',
                        tmpid,
                        item.id
                      )
                    "
                  ></ButtonView>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-window-item>
        <v-window-item value="2">
          <v-data-table
            :headers="headers"
            :items="data"
            class="listable ma-2"
            fixed-header
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.examType }}</td>
                <td>{{ item.buyLisence }}</td>
                <td>{{ item.saleLisence }}</td>
                <td>{{ item.examCount }}</td>
                <td>{{ item.syoriCount }}</td>
                <td>{{ item.zanCount }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
