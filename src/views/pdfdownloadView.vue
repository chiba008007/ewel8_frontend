<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuTest from "../components/pankuzuTest.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useStoreUser } from "../store/user";

const router = useRouter();
const params = router.currentRoute.value.params;
const user = useStoreUser();

const onBack = () => {
  router.push({
    name: "testExamList",
    params: { id: params.id, testid: params.testid },
  });
};

const onPankuzu = ref(false);

const headers = ref([
  {
    title: "処理完了日",
    sortable: false,
  },
  {
    title: "検査名",
    sortable: false,
  },
  {
    title: "状態",
    sortable: false,
  },
]);

type typed = {
  date: string;
  name: string;
  status: string;
};
const dataList = ref<Array<typed>>([]);
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
            <ButtonView
              :text="user['pdfdownload']"
              class="bg-lime"
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
              <td>{{ item.date }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss"></style>
