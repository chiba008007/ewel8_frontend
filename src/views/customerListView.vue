<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { useStoreUser } from "../store/user";
import UserApiService from "@/services/UserApiService";
import pageClickMove from "../plugins/pagemove";

import InfoAreaView from "../components/InfoAreaView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";
import ProgressView from "@/components/ProgressView.vue";

const user = useStoreUser();
const move = pageClickMove();
const route = useRoute();

// route.params.id は string | string[] の可能性があるため string に寄せる
const tmpid = String(route.params.id);

const loadingFlag = ref(true);

// v-tab の value が "1" / "2" なので string にする
const tab = ref("1");

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

// ライセンスAPIの1件分の型
type LisenceItem = {
  code: string;
  num: number;
  exam_count: number;
  started_exam_count: number;
  ended_exam_count: number;
};

// APIレスポンス共通型
type ApiResponse<T> = {
  data: T;
};

// 画面表示用：顧客一覧
type CustomerRow = {
  id: string | number;
  campany: string;
  examCount: number;
  syoriCount: number;
  zanCount: number;
  method: string;
};

// 画面表示用：ライセンス一覧
type LisenceRow = {
  examType: string;
  buyLisence: number;
  saleLisence: number;
  examCount: number;
  syoriCount: number;
  zanCount: number;
};

const customerList = ref<CustomerRow[]>([]);
const data = ref<LisenceRow[]>([]);

// ライセンス一覧を取得
const fetchLisencesList = async () => {
  const params = {
    user_id: tmpid,
  };

  // APIレスポンスの型を明示
  const res = (await UserApiService.getLisencesList(params)) as ApiResponse<
    LisenceItem[]
  >;

  data.value = res.data.map((val: any) => ({
    examType: val.code,
    buyLisence: val.num,
    saleLisence: val.num - val.exam_count,
    examCount: val.exam_count,
    syoriCount: val.started_exam_count,
    zanCount: val.exam_count - val.ended_exam_count,
  }));
};

// 顧客一覧を取得
const fetchCustomerList = async () => {
  const params = {
    partner_id: tmpid,
  };

  const res = await UserApiService.getCustomerList(params);

  customerList.value = res.data.map((value: any) => ({
    id: value.id,
    campany: value.name,
    examCount: value.count,
    syoriCount: value.syori,
    zanCount: value.zan,
    method: "",
  }));
};

// 初期表示時にAPIを実行
onMounted(async () => {
  loadingFlag.value = true;

  try {
    // 2つのAPIを並列で取得
    await Promise.all([fetchLisencesList(), fetchCustomerList()]);
  } catch (e) {
    console.error(e);
    alert("データ取得 ERROR");
  } finally {
    // 成功・失敗に関係なくローディングを終了
    loadingFlag.value = false;
  }
});

const onMove = (param: string, key: number) => {
  // sessionStorageにpartner_idを保持
  user.setSession("partner_id", tmpid);
  move.pageClickMoveParamCode(param, key);
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customerTOP" />
  <InfoAreaView />
  <v-row justify="center" class="my-2">
    <CustomerMenu />
  </v-row>
  <pankuzuMain :partnerid="tmpid"></pankuzuMain>
  <v-row>
    <v-col class="mt-0 pt-0">
      <v-tabs v-model="tab">
        <v-tab value="1">顧客一覧</v-tab>
        <v-tab value="2">検査一覧</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="1">
          <v-data-table
            v-if="!loadingFlag && customerList.length > 0"
            :headers="customerheaders"
            :items="customerList"
            class="listable ma-2"
            fixed-header
          >
            <template v-slot:item="{ item }">
              <tr v-show="item.id">
                <td class="w-50">{{ item.campany }}</td>
                <td>{{ item.examCount }}</td>
                <td>{{ item.syoriCount }}</td>
                <td>{{ item.zanCount }}</td>
                <td class="w-25">
                  <ButtonView
                    text="検査一覧"
                    color="success"
                    size="small"
                    @click="onMove('testLists', Number(item.id))"
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
                    @click="
                      move.pageClickMoveParamCodeList(
                        'customerDelete',
                        tmpid,
                        item.id
                      )
                    "
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
