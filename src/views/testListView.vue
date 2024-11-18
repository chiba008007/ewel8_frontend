<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStoreUser } from "../store/user";

import InfoAreaView from "../components/InfoAreaView.vue";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRouter, useRoute } from "vue-router";
import UserApiService from "@/services/UserApiService";
import TestApiService from "@/services/TestApiService";

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

const tmp = {
  user_id: tmpid.value,
};
const testList = ref();
TestApiService.getTestList(tmp)
  .then(function (res) {
    testList.value = res.data;
  })
  .catch(function (e) {
    console.log(e);
  });

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
        :items="testList"
        class="listable ma-2 dataTableStyle"
        :height="tableHeight"
        fixed-header
        color="green"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td class="w-25">{{ item.testname }}</td>
            <td class="text-right">{{ item.testcount }}</td>
            <td class="text-xs-right">-</td>
            <td class="text-xs-right">-</td>
            <td class="text-center w-25" nowrap>
              <ButtonView
                text="ID/QRコード"
                class="text-caption mb-2"
                color="success"
                size="small"
                :href="`/testQr/` + tmpid + `/` + item.id"
                target="_blank"
              ></ButtonView>
              <ButtonView
                text="追加更新"
                class="text-caption mb-2 ml-2"
                color="success"
                size="small"
              ></ButtonView>
              <ButtonView
                text="削除"
                class="text-caption mb-2 ml-2"
                color="red"
                size="small"
              ></ButtonView>
              <ButtonView
                text="複製"
                class="text-caption mb-2 ml-2"
                color="success"
                size="small"
              ></ButtonView>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>
<style lang="scss"></style>
