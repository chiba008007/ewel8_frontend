<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStoreUser } from "../store/user";
import ComponentButton from "../components/ButtonView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import UserApiService from "@/services/UserApiService";
import FileuploadApiService from "@/services/FileuploadApiService";
import { useRouter, useRoute } from "vue-router";
import fileUpload from "@/components/fileUpload.vue";
import { d_filePath, openStatus } from "@/plugins/const";
import AlertView from "@/components/AlertView.vue";
import pankuzuCustomer from "@/components/pankuzuCustomer.vue";
import { pagelink, deleteStatus } from "@/plugins/pagelink";
import ProgressView from "../components/ProgressView.vue";

const alertDeleteflag = ref(false);
const alertRegistflag = ref(false);
const route = useRoute();

const headers = [
  { title: "登録日", sortable: true, key: "name" },
  { title: "ファイル名", sortable: false, key: "speed" },
  { title: "サイズ", sortable: false, key: "length" },
  { title: "ステータス", sortable: false, key: "price" },
  { title: "削除", sortable: false, key: "year" },
];

const user = useStoreUser();
const partner_id = route.params.id;
const customer_id = route.params.editid;

const loadingFlag = ref(false);
const file = ref<File | null>(null);
const formData = new FormData();

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    file.value = input.files[0];
  }
  formData.append("file", file.value as File);
  formData.append("customer_id", customer_id as string);
  formData.append("partner_id", partner_id as string);
};
const onClick = () => {
  loadingFlag.value = true;
  UserApiService.onFileUpload(formData)
    .then((res: any) => {
      console.log(res.data);
      //alert("ok");
      alertRegistflag.value = true;
      reading();
    })
    .catch((e) => {
      alert("imageupload ERROR" + e);
    });
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
  loadingFlag.value = true;
  let tmp = {
    partner_id: partner_id,
    customer_id: customer_id,
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
    loadingFlag.value = false;
  });
};
const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
const commaSeparated = (value: number) => {
  return new Intl.NumberFormat().format(value);
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <v-row justify="center">
    <CustomerMenu />
  </v-row>
  <pankuzuCustomer
    :pageName="user.upload"
    name="customerList"
  ></pankuzuCustomer>
  <v-row class="ml-2">
    <v-col>
      <p class="text-h6">ファイルアップロード</p>
    </v-col>
  </v-row>
  <v-row no-gutters class="ml-2">
    <v-col cols="12">
      <fileUpload
        @onChange="(e) => onChange(e)"
        @onClick="() => onClick()"
      ></fileUpload>
    </v-col>
  </v-row>
  <v-row v-show="desserts.length > 0">
    <v-col cols="10" class="ml-2 mr-2">
      <AlertView
        v-if="alertDeleteflag"
        text="削除を行いました。"
        type="success"
      ></AlertView>
      <AlertView
        v-else-if="alertRegistflag"
        text="登録を行いました。"
        type="success"
      ></AlertView>
    </v-col>
  </v-row>
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
              <ComponentButton
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
</template>
<style lang="scss">
.links {
  text-decoration: underline;
  &:hover {
    color: red;
    cursor: pointer;
  }
}
</style>
