<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuTest from "../components/pankuzuTest.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useStoreUser } from "../store/user";
import PdfDownloadApiService from "@/services/PdfDownloadApiService";
import AlertView from "@/components/AlertView.vue";
import ProgressView from "../components/ProgressView.vue";
import RadioView from "@/components/RadioView.vue";

const router = useRouter();
const params = router.currentRoute.value.params;
const user = useStoreUser();
const customer_id = params.id;
const test_id = params.testid;
const alertFlag = ref(false);
const progressFlag = ref(false);

const onBack = () => {
  router.push({
    name: "testExamList",
    params: { id: params.id, testid: params.testid },
  });
};

const onPankuzu = ref(false);
const statusString: { [key: number]: string } = {
  1: "実行前",
  2: "実行中",
  3: "実行後",
};
const codeString: { label: string; value: number }[] = [
  {
    label: "ファイル化",
    value: 1,
  },
  {
    label: "ZIP化",
    value: 2,
  },
];
const codeStringValue = ref(1);

const headers = ref([
  {
    title: "処理登録日",
    sortable: false,
  },
  {
    title: "処理完了日",
    sortable: false,
  },
  {
    title: "出力型式",
    sortable: false,
  },
  {
    title: "状態",
    sortable: false,
  },
]);
const onChange = (e: number) => {
  codeStringValue.value = e;
};
type typed = {
  start: string;
  end: string;
  type: string;
  code: string;
};
const dataList = ref<Array<typed>>([]);

onMounted(() => {
  reading();
});
const reading = () => {
  PdfDownloadApiService.getTest({
    customer_id: customer_id,
    test_id: test_id,
  }).then(function (res) {
    console.log(res);
    dataList.value = res.data.map(
      (item: { start: string; end: string; type: number; code: number }) => ({
        start: item.start ?? "",
        end: item.type == 3 ? item.end : "",
        type: statusString[item.type] ?? "", // 必要に応じて整形
        code: codeString[item.code - 1].label, // 必要に応じて整形
      })
    );
  });
};
const onClick = () => {
  alertFlag.value = false;
  progressFlag.value = true;
  PdfDownloadApiService.setTest({
    customer_id: customer_id,
    test_id: test_id,
    type: 1, // 実行前
    code: codeStringValue.value, // ダウンロードパターン
  }).then(function () {
    alertFlag.value = true;
    progressFlag.value = false;
    reading();
  });
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
    :adminhref2="{
      pageName: 'testExamList',
      href: 'testExamList',
      params: { id: params.id, testid: params.testid },
    }"
    :adminhref3="{ pageName: 'pdfdownload' }"
    @onEnabled="(e:boolean) => (onPankuzu = e)"
  ></pankuzuTest>

  <div v-if="onPankuzu" class="mx-3">
    <AlertView
      title=""
      text="PDF一括ダウンロード実行予約しました。"
      type="success"
      v-show="alertFlag"
    ></AlertView>
    <ProgressView v-if="progressFlag"></ProgressView>
    <h4 class="mt-2">{{ user["pdfdownload"] }}</h4>
    <v-row>
      <v-col>
        <div class="border-md pa-3">
          <h5>PDF作成には時間がかかります。</h5>
          <ul class="ml-5">
            <li>作成時間は指定人数により多少前後致します。</li>
            <li>
              作成完了後、管理画面に登録されているアドレスに完了のメールを送付致します。
            </li>
            <li>目安として50名程度であれば、1時間後です。</li>
            <li>
              <b
                >メール受取後、管理画面の「ダウンロード」ボタンを押し、ファイルダウンロード画面から、結果PDFをダウンロードしてください。</b
              >
            </li>
            <li>ファイルは14日後に自動的に削除されますのでご注意ください。</li>
          </ul>
          <div class="mt-3">
            <RadioView
              :items="codeString"
              :default="codeStringValue"
              @onChange="(e) => onChange(e)"
            ></RadioView>
            <ButtonView
              :text="user['pdfdownload']"
              class="bg-lime"
              @onClick="onClick()"
            ></ButtonView>
          </div>
        </div>

        <div class="my-3">
          <ButtonView
            text="戻る"
            color="primary"
            @onClick="onBack()"
          ></ButtonView>
        </div>
      </v-col>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="dataList"
          class="listable ma-2 dataTableStyle w-100"
          id="testTable"
          fixed-header
          color="green"
          items-per-page-text="表示数"
          :items-per-page="50"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.start }}</td>
              <td>{{ item.end }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.type }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss"></style>
