<script setup lang="ts">
import { ref } from "vue";
import { useStoreUser } from "../store/user";
import ComponentButton from "../components/ButtonView.vue";
import ComponentTextField from "../components/TextFieldView.vue";
import CheckboxView from "@/components/CheckboxView.vue";
import CustomerMenu from "../components/CustomerMenu.vue";
import UserApiService from "@/services/UserApiService";
import FileuploadApiService from "@/services/FileuploadApiService";
import { useRouter, useRoute } from "vue-router";
import pagemove from "@/plugins/pagemove";
import fileUpload from "@/components/fileUpload.vue";
import { d_filePath, openStatus } from "@/plugins/const";
import AlertView from "@/components/AlertView.vue";

const alertflag = ref(false);
const router = useRouter();
const route = useRoute();
const pages = pagemove();
const headers = [
  { title: "登録日", sortable: true, key: "name" },
  { title: "ファイル名", sortable: false, key: "speed" },
  { title: "サイズ", sortable: false, key: "length" },
  { title: "ステータス", sortable: false, key: "price" },
  { title: "削除", sortable: false, key: "year" },
];
const user = useStoreUser();
const tmpid = route.params.id;
const editid = route.params.editid;

const pankuzu = ref();
if ((user.userdata as any).type === "partner") {
  pankuzu.value = [{ title: user.home }];
} else {
  pankuzu.value = [
    { title: user.home, href: router.resolve({ name: "List" }).href },
    {
      title: user.customerInfoList,
      href: router.resolve({ name: "customerList", params: { id: tmpid } })
        .href,
    },
    { title: user.upload },
  ];
}

const file = ref<File | null>(null);
const formData = new FormData();

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    file.value = input.files[0];
  }
  formData.append("file", file.value as File);
  formData.append("editid", editid as string);
};
const onClick = () => {
  UserApiService.onFileUpload(formData)
    .then((res: any) => {
      console.log(res.data);
      alert("ok");
    })
    .catch((e) => {
      alert("imageupload ERROR" + e);
    });
};

const desserts = ref([
  {
    key: "" as unknown as number,
    registdate: "" as string,
    filename: "" as string,
    filepath: "" as string,
    size: "" as string,
    openflag: "" as string,
    checked: false as boolean,
    id: 0 as number,
  },
]);
let tmp = {
  partner_id: editid,
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

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
const commaSeparated = (value: number) => {
  return new Intl.NumberFormat().format(value);
};
const pagelink = (link: string, id: number, key: number) => {
  let tmp = {
    id: id,
  };
  FileuploadApiService.openFlag(tmp).then((rlt) => {
    location.href = link;
    desserts.value[key].openflag = openStatus[1];
  });
};
const onCheckbox = (e: boolean, key: number) => {
  desserts.value[key].checked = desserts.value[key].checked ? false : true;
};
const deleteStatus = (id: number, key: number) => {
  let tmp = {
    id: id,
  };
  FileuploadApiService.deleteStatus(tmp).then((rlt) => {
    desserts.value.splice(key, 1);
    alertflag.value = true;
  });
};
</script>
<template>
  <v-row justify="center">
    <CustomerMenu />
  </v-row>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-row class="ml-2">
    <v-col>
      <p class="text-h6">ファイルアップロード</p>
    </v-col>
  </v-row>
  <v-row no-gutters class="ml-2">
    <v-col cols="12">
      <fileUpload
        @onChange="(e) => onChange(e)"
        @onClick="(e) => onClick(e)"
      ></fileUpload>
    </v-col>
  </v-row>
  <v-row no-gutters class="ml-2">
    <v-col cols="12">
      <ComponentButton
        text="チェックしたファイルを削除"
        density="compact"
        color="red"
      ></ComponentButton>
    </v-col>
  </v-row>
  <v-row v-if="alertflag">
    <v-col cols="10" class="ml-2 mr-2">
      <AlertView text="削除を行いました。" type="success"></AlertView>
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
            <!-- <td class="text-center">
              <CheckboxView
                :value="item.checked"
                @onChange="(e) => onCheckbox(e, item.key)"
              ></CheckboxView>
            </td> -->
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
                @onClick="deleteStatus(item.id, item.key)"
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
