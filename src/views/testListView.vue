<script setup lang="ts">
import { ref } from "vue";

import InfoAreaView from "../components/InfoAreaView.vue";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRoute } from "vue-router";
import TestApiService from "@/services/TestApiService";
import pageClickMove from "@/plugins/pagemove";
import pankuzuTest from "@/components/pankuzuTest.vue";
import dayjs from "dayjs";
import { useStoreUser } from "@/store/user";
import { D_ADMIN, D_PARTNER } from "@/plugins/const";
import "dayjs/locale/ja";
dayjs.locale("ja");
const move = pageClickMove();
const route = useRoute();
const tmpid = ref(route.path.replace(/[^0-9]/g, ""));

const user = useStoreUser();

const testheaders = ref([
  { title: "企業名", align: undefined, key: "campany" },
  { title: "実施期間", align: undefined, key: "examCount" },
  { title: "受検者数", align: undefined, key: "examCount" },
  { title: "処理数", align: undefined, key: "syoriCount" },
  { title: "残数", align: undefined, key: "zanCount" },
  { title: "機能", align: undefined, key: "method" },
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
  <InfoAreaView />
  <v-row justify="center">
    <TestMenu />
  </v-row>

  <pankuzuTest
    :partnerhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
  ></pankuzuTest>
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
            <td class="w-25">
              <span v-if="user.userdata.type === D_PARTNER">{{
                item.testname
              }}</span>
              <a
                v-else
                class="text-link"
                @click="
                  move.pageTestListModeParam('testExamList', item.id, tmpid)
                "
                >{{ item.testname }}</a
              >
            </td>
            <td class="text-xs-right" nowrap>
              {{ dayjs(item.startdaytime).format("YYYY/M/DD HH:mm") }}～{{
                dayjs(item.enddaytime).format("YYYY/M/DD HH:mm")
              }}
            </td>
            <td class="text-right">{{ item.testcount }}</td>
            <td class="text-right">{{ item.syori }}</td>
            <td class="text-right">{{ item.zan }}</td>
            <td class="text-center w-25" nowrap>
              <ButtonView
                v-if="user.userdata.type != D_PARTNER"
                text="ID/QRコード"
                class="text-caption mb-2"
                color="success"
                size="small"
                target="_blank"
                @click="move.pageQRBlank('testQr', item.id, tmpid)"
              ></ButtonView>
              <ButtonView
                text="追加更新"
                class="text-caption mb-2 ml-2"
                color="success"
                size="small"
              ></ButtonView>
              <ButtonView
                v-if="user.userdata.type != D_PARTNER"
                text="削除"
                class="text-caption mb-2 ml-2"
                color="red"
                size="small"
              ></ButtonView>
              <ButtonView
                v-if="user.userdata.type === D_ADMIN"
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
