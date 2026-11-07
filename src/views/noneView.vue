<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStoreUser } from "../store/user";
import UserApiService from "@/services/UserApiService";
import pageClickMove from "../plugins/pagemove";

import InfoAreaView from "../components/InfoAreaView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";
import ProgressView from "@/components/ProgressView.vue";
import { D_ADMIN } from "@/plugins/const";

const user = useStoreUser();
const move = pageClickMove();
const route = useRoute();
const router = useRouter();
const type = user.userdata.type;
const params = router.currentRoute.value.params;

// route.params.id は string | string[] の可能性があるため string に寄せる
const tmpid = String(route.params.id);

const loadingFlag = ref(true);

const customerheaders = ref([
  { title: "企業名", key: "campany" },
  { title: "受検者数", key: "examCount" },
  { title: "処理数", key: "syoriCount" },
  { title: "残数", key: "zanCount" },
  { title: "更新日", key: "updated" },
]);

// 画面表示用：顧客一覧
type CustomerRow = {
  id: string | number;
  campany: string;
  examCount: number;
  syoriCount: number;
  zanCount: number;
  method: string;
  updated: string;
};

const customerList = ref<CustomerRow[]>([]);

// 顧客一覧を取得
const fetchCustomerList = async () => {
  const params = {
    partner_id: tmpid,
  };

  const res = await UserApiService.getCustomerDeleteList(params);

  customerList.value = res.data.map((value: any) => ({
    id: value.id,
    campany: value.name,
    examCount: value.count,
    syoriCount: value.syori,
    zanCount: value.zan,
    updated: value.updated_at
      ? new Date(value.updated_at).toLocaleString("ja-JP")
      : "",
  }));
};

// 初期表示時にAPIを実行
onMounted(async () => {
  try {
    await fetchCustomerList();
  } catch (e) {
    console.error("顧客一覧取得エラー", e);
  } finally {
    loadingFlag.value = false;
  }
});
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customerTOP" />
  <InfoAreaView />
  <v-row justify="center" class="my-2">
    <CustomerMenu />
  </v-row>

  <pankuzuMain
    :adminhref="{ pageName: 'none' }"
    :partnerid="tmpid"
  ></pankuzuMain>

  <v-row>
    <v-col class="mt-0 pt-0">
      <p class="text-black ml-2 mt-2">
        ※ 列の見出しをクリックすると、昇順・降順を切り替えられます。
      </p>
      <v-data-table
        v-if="!loadingFlag && customerList.length > 0"
        :headers="customerheaders"
        :items="customerList"
        class="listable ma-2"
        fixed-header
      >
        <template v-slot:item="{ item }">
          <tr v-show="item.id">
            <td class="col-3">{{ item.campany }}</td>
            <td class="wNum">{{ item.examCount }}</td>
            <td class="wNum">{{ item.syoriCount }}</td>
            <td class="wNum">{{ item.zanCount }}</td>
            <td style="width: 100px">{{ item.updated }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.wNum {
  width: 120px;
}
</style>
