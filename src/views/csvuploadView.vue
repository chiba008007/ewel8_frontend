<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuTest from "../components/pankuzuTest.vue";
import RadioView from "@/components/RadioView.vue";
import { csvUpload } from "@/plugins/const";
import fileUpload from "@/components/fileUpload.vue";
import ButtonView from "@/components/ButtonView.vue";
import {
  csvFormat,
  updateCsvExam,
  getCsvUploadList,
} from "@/plugins/csvFormat";
import AlertView from "@/components/AlertView.vue";
import { d_Path, csvtypestatus } from "@/plugins/const";
const router = useRouter();
const tab = ref();
const params = router.currentRoute.value.params;
const csvUploadType = ref(1);
let tmp = {
  user_id: params.id,
  test_id: params.testid,
};

let selectedFile: File | null = null;

const onFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile = target.files[0];
  }
};
const message = ref();
const onUpload = () => {
  const formDataTemp = new FormData();
  if (selectedFile) {
    formDataTemp.append("file", selectedFile);
  }
  formDataTemp.append("user_id", String(tmp.user_id));
  formDataTemp.append("test_id", String(tmp.test_id));
  formDataTemp.append("csvUploadType", String(csvUploadType.value));

  updateCsvExam(formDataTemp)
    .then(() => {
      message.value = "データの登録成功しました";
    })
    .catch(() => {
      message.value = "データの登録失敗しました";
    });
};
const onFormt = () => {
  csvFormat(tmp);
};
const onBack = () => {
  router.push({ name: "testLists", params: { id: params.id } });
};

const onPankuzu = ref(false);

const tableHeight = ref(100);
const onResize = () => {
  const wHeight = window.innerHeight;
  tableHeight.value = wHeight - 300;
};
const tableWidth = ref("100%");
type typed = {
  date: string;
  total: number;
  notrows: number;
  filename: string;
  filepath: string;
  type: number;
};
const dataList = ref<Array<typed>>([]);
getCsvUploadList(tmp).then((res) => {
  console.log(res.data);
  res.data.map((value: typed) => {
    dataList.value.push({
      date: value.date,
      total: value.total,
      notrows: value.notrows,
      filename: value.filename,
      filepath: value.filepath,
      type: value.type,
    });
  });
  console.log(dataList.value);
});
const headers = ref([
  {
    title: "取込日",
    sortable: false,
  },
  {
    title: "総件数",
    sortable: false,
  },
  {
    title: "未取込件数",
    sortable: false,
  },
  {
    title: "状態",
    sortable: false,
  },
  {
    title: "ファイル名",
    sortable: false,
  },
]);
</script>
<template>
  <PartnerAdmin coded="customer" />
  <pankuzuTest
    :adminhref="{
      pageName: 'testList',
      href: 'testLists',
      params: { id: params.id },
    }"
    :adminhref2="{
      pageName: 'testExamList',
      href: 'testExamList',
      params: { id: params.id, testid: params.testid },
    }"
    :adminhref3="{ pageName: 'csvupload' }"
    @onEnabled="(e:boolean) => (onPankuzu = e)"
  ></pankuzuTest>
  <div v-if="onPankuzu" class="mx-3">
    <v-tabs v-model="tab">
      <v-tab value="1">取込方法の選択</v-tab>
      <v-tab value="2">履歴</v-tab>
    </v-tabs>

    <v-window v-model="tab" class="mt-2">
      <v-window-item value="1">
        <AlertView type="success" :text="message" v-if="message"></AlertView>
        <h4>取込方法の選択</h4>
        <RadioView
          :items="csvUpload"
          :default="csvUploadType"
          @onChange="(e) => (csvUploadType = e)"
        ></RadioView>
        <fileUpload
          @onClick="onUpload"
          @onChange="(e) => onFile(e)"
        ></fileUpload>

        <div class="border-md pa-3 text-red">
          ※「受検済み・受検中も対象とする」を選んだ際の注意点
          <v-row no-gutters>
            <v-col cols="1">未受検者</v-col>
            <v-col cols="11">
              ID、名前、ふりがな、生年月日、メモ1、メモ2の変更が可能です。
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="1">受検中</v-col>
            <v-col cols="11">
              ID、名前、ふりがな、生年月日、メモ1、メモ2の変更が可能です。IDも変更されます。
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="1">受検済</v-col>
            <v-col cols="11">
              名前、ふりがな、生年月日、メモ1、メモ2の変更が可能です。ID以外は変更されます。
            </v-col>
          </v-row>
          <ButtonView
            text="csvフォーマットダウンロード"
            color="lime"
            @onClick="onFormt()"
          ></ButtonView>
        </div>
        <h4 class="mt-2">取込方法の選択</h4>
        <div class="border-md pa-3 text-red">
          ※ 設定時の注意点
          <ul class="ml-5">
            <li>
              一番左の番号がキーになります。IDは20文字以内の半角英数で設定してください。アルファベットの大文字と小文字を区別しております。
            </li>
            <li>
              該当する番号にID、名前、ふりがな、生年月日、メモ1、メモ2を設定してください。
            </li>
            <li>
              サイズ30KB以下、名前
              ふりがなを入力の際は、姓と名の間にスペースを入力してください。
            </li>
            <li>件数は300名以下です</li>
            <li>
              300名を超える場合は2回に分けるか、弊社に登録依頼をお願いします。
            </li>
          </ul>
        </div>
      </v-window-item>
      <v-window-item value="2">
        <h4>取込み履歴</h4>
        <v-row v-resize="onResize" style="width: auto">
          <v-col class="ma-1" style="overflow: scroll">
            <v-data-table
              :headers="headers"
              :items="dataList"
              class="listable ma-2 dataTableStyle"
              id="testTable"
              :height="tableHeight"
              fixed-header
              color="green"
              items-per-page-text="表示数"
              :items-per-page="50"
              :style="`min-width:` + tableWidth"
            >
              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.date }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.notrows }}</td>
                  <td>{{ csvtypestatus[item.type] }}</td>
                  <td>
                    <v-btn
                      :href="`${d_Path}/uploads/${item.filename}`"
                      download
                      target="_blank"
                    >
                      <v-icon>mdi-download</v-icon>
                      {{ item.filepath }}
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
    <div class="my-3">
      <ButtonView text="戻る" color="primary" @onClick="onBack()"></ButtonView>
    </div>
  </div>
</template>
<style lang="scss"></style>
