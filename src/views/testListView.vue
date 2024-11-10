<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStoreUser } from "../store/user";

import InfoAreaView from "../components/InfoAreaView.vue";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import UserApiService from "@/services/UserApiService";

const router = useRouter();
const route = useRoute();
const user = useStoreUser();

const tmpid = ref(route.path.replace(/[^0-9]/g, ""));

// const userdata = user.userdata;
// console.log(user.userdata);

const partner_id = ref();
const pankuzu = ref();
if ((user.userdata as any).type === "partner") {
  pankuzu.value = [{ title: user.customerInfoList }];
} else {
  let pid = UserApiService.getPartnerid({
    id: tmpid.value,
    type: "customer",
  });
  pid.then((e: any) => {
    partner_id.value = parseInt(e.data);

    pankuzu.value = [
      { title: user.home, href: router.resolve({ name: "List" }).href },
      {
        title: user.customerInfoList,
        href: router.resolve({
          name: "customerList",
          params: {
            id: partner_id.value,
          },
        }).href,
      },
      {
        title: user.testList,
      },
    ];
  });
}

const testheaders = ref([
  { title: "企業名", align: "start", key: "campany" },
  { title: "受検者数", align: "start", key: "examCount" },
  { title: "処理数", align: "start", key: "syoriCount" },
  { title: "残数", align: "start", key: "zanCount" },
  { title: "機能", align: "start", key: "method" },
]);
// const headers = ref([
//   { title: "検査種別", align: "start", key: "examType" },
//   { title: "購入ライセンス", align: "start", key: "buyLisence" },
//   { title: "販売可能ライセンス", align: "start", key: "saleLisence" },
//   { title: "受検者数", align: "start", key: "examCount" },
//   { title: "処理数", align: "start", key: "syoriCount" },
//   { title: "残数", align: "start", key: "zanCount" },
// ]);
// const customerList = ref([
//   {
//     campany: "",
//     examCount: 0,
//     syoriCount: 0,
//     zanCount: 0,
//     method: "",
//   },
// ]);
// const data = ref([
//   {
//     examType: "",
//     buyLisence: 0,
//     saleLisence: 0,
//     examCount: 0,
//     syoriCount: 0,
//     zanCount: 0,
//   },
// ]);

// // ライセンス一覧
// let tmp = {
//   user_id: tmpid.value,
// };
// UserApiService.getLisencesList(tmp)
//   .then(function (res: any) {
//     data.value = [];
//     res.data.map((val: any) => {
//       data.value.push({
//         examType: val.code,
//         buyLisence: val.num,
//         saleLisence: 83457,
//         examCount: 5400,
//         syoriCount: 5400,
//         zanCount: 5400,
//       });
//     });
//   })
//   .catch((e) => {
//     alert("getLisencesList ERROR" + e);
//   });
// // 顧客一覧
// let ctmp = {
//   partner_id: tmpid.value,
// };
// console.log(ctmp);
// UserApiService.getCustomerList(ctmp)
//   .then(function (res: any) {
//     customerList.value = [];
//     res.data.map(function (value: any) {
//       customerList.value.push({
//         campany: value.name,
//         examCount: 0,
//         syoriCount: 0,
//         zanCount: 0,
//         method: "",
//       });
//     });
//   })
//   .catch((e) => {
//     alert("getCustomerList ERROR" + e);
//   });

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
</script>
<template>
  <PartnerAdmin coded="customer" />
  <InfoAreaView />
  <v-row justify="center">
    <TestMenu />
  </v-row>

  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-row>
    <v-col class="ma-1">
      <v-data-table
        :headers="testheaders"
        class="listable ma-2 dataTableStyle"
        :height="tableHeight"
        fixed-header
        color="green"
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
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
