<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuTest from "../components/pankuzuTest.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useStoreUser } from "../store/user";
import { pagelink, deleteStatus } from "@/plugins/pagelink";
import AlertView from "@/components/AlertView.vue";
import FileuploadApiService from "@/services/FileuploadApiService";
import { d_filePath, openStatus } from "@/plugins/const";

const router = useRouter();
const params = router.currentRoute.value.params;
const user = useStoreUser();
const alertDeleteflag = ref(false);

const onBack = () => {
  router.push({
    name: "testLists",
    params: { id: params.id },
  });
};

const onPankuzu = ref(false);

const headers = [
  { title: "登録日", sortable: true, key: "name" },
  { title: "ファイル名", sortable: false, key: "speed" },
  { title: "サイズ", sortable: false, key: "length" },
  { title: "ステータス", sortable: false, key: "price" },
  { title: "削除", sortable: false, key: "year" },
];

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};

type DataType = {
  key: number;
  registdate: string;
  filename: string;
  filepath: string;
  size: string;
  openflag: string;
  checked: boolean;
  id: number;
};

const desserts = ref<DataType[]>([]);

onMounted(() => {
  reading();
});
const reading = () => {
  let tmp = {
    partner_id: params.id,
  };
  FileuploadApiService.getList(tmp).then((res) => {
    desserts.value = [];
    let i = 0;
    res?.data.map((val: any) => {
      desserts.value.push({
        key: i,
        registdate: val.date,
        filename: val.filename,
        filepath: d_filePath + "/" + val.filepath,
        size: commaSeparated(val.size),
        openflag: openStatus[val.openflag],
        checked: false,
        id: val.id,
      });
      i++;
    });
  });
};
const commaSeparated = (value: number) => {
  return new Intl.NumberFormat().format(value);
};
</script>
<template>
  <PartnerAdmin coded="customer" />
  <pankuzuTest
    :adminhref="{
      pageName: 'testList',
      href: 'testLists',
      params: { id: params.id },
    }"
    :adminhref2="{ pageName: 'testListsDownload' }"
    @onEnabled="(e:boolean) => (onPankuzu = e)"
  ></pankuzuTest>
  <div v-if="onPankuzu" class="mx-3">
    <h4 class="mt-2">{{ user["testListsDownload"] }}</h4>
    <p>ダウンロードしたいファイル名を選択してください。</p>
    <AlertView
      v-if="alertDeleteflag"
      text="削除を行いました。"
      type="success"
    ></AlertView>
    <v-row v-resize="onResize">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          class="listable ma-2"
          :height="tableHeight"
          fixed-header
        >
          <template v-slot:item="{ item }">
            <tr>
              <td class="text-left">{{ item.registdate }}</td>
              <td class="text-xs-right">
                <a
                  @click="pagelink(item.filepath, item.id, item.key)"
                  class="links"
                  >{{ item.filename }}</a
                >
              </td>
              <td class="text-right">{{ item.size }}</td>
              <td class="text-center">{{ item.openflag }}</td>
              <td class="text-center">
                <ButtonView
                  text="削除"
                  color="success"
                  density="compact"
                  @onClick="
                    deleteStatus(item.id, item.key).then((key) => {
                      desserts.splice(key, 1);
                      alertDeleteflag = true;
                    })
                  "
                />
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <div class="my-3">
      <ButtonView text="戻る" color="primary" @onClick="onBack()"></ButtonView>
    </div>
  </div>
</template>
<style lang="scss"></style>
