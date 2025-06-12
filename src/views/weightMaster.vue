<script setup lang="ts">
import { ref, onMounted } from "vue";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";
import ButtonView from "@/components/ButtonView.vue";
import WeightApiService from "@/services/WeightApiService";
import AlertView from "@/components/AlertView.vue";
import { useRouter } from "vue-router";
import ProgressView from "@/components/ProgressView.vue";
import { useStoreUser } from "@/store/user";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

const user = useStoreUser();
const item = ref([]);
const router = useRouter();
const loadingFlag = ref(true);
const testheaders = ref([
  { title: "重み付けマスター名", sortable: false },
  { title: "作成日", sortable: false },
  { title: "機能" },
]);

const testList = ref<{ id: number; title: string; createDate: string }[]>([]);
const params = router.currentRoute.value.params;

const onTableSet = () => {
  const tmp = {
    id: params.id,
    partner_id: user.getSession("partner_id"),
  };
  testList.value = [];
  WeightApiService.getWeightMaster(tmp)
    .then((rst) => {
      rst.data.forEach(
        (element: { id: number; name: string; date: string }) => {
          testList.value.push({
            id: element.id,
            title: element.name,
            createDate: element.date,
          });
        }
      );
      loadingFlag.value = false;
    })
    .catch((e) => {
      alert("Weight Set ERROR" + e);
    });
};
const tableHeight = ref(100);
const tableWidth = ref(500);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
  const wWidth = window.innerWidth;
  tableWidth.value = wWidth;
};
const deleteFlag = ref(false);
const onDelete = (weightid: number) => {
  deleteFlag.value = false;
  if (confirm("重み付けの削除を行います。")) {
    let tmp = {
      weightid: weightid,
      id: params.id,
    };
    WeightApiService.editStatusWeightMaster(tmp)
      .then(() => {
        deleteFlag.value = true;
        onTableSet();
      })
      .catch((e) => {
        console.log(e);
        alert("error");
      });
  }
};

onMounted(() => {
  onTableSet();
});
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customer" />
  <v-row justify="center" class="mt-6">
    <TestMenu />
  </v-row>
  <pankuzuMain
    :partnerhref="{
      pageName: 'testList',
      href: 'testLists',
    }"
    :partnerhref2="{
      pageName: 'weightMaster',
      href: 'weightMaster',
    }"
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref2="{ pageName: 'weightMaster' }"
  ></pankuzuMain>
  <ButtonView
    text="新規登録"
    class="ml-3"
    color="lime"
    @onClick="router.push({ name: 'weightMasterSet' })"
  ></ButtonView>
  <AlertView
    text="データの削除を行いました。"
    v-if="deleteFlag"
    type="error"
  ></AlertView>
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
            <td class="text-center">
              <ButtonView
                text="更新"
                class="bg-lime"
                size="small"
                @onClick="
                  router.push({
                    name: 'weightMasterEdit',
                    params: {
                      id: params.id,
                      pattern: 'edit',
                      weightid: item.id,
                    },
                  })
                "
              ></ButtonView>
              <ButtonView
                text="削除"
                class="bg-red ml-2"
                size="small"
                @onClick="onDelete(item.id)"
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
