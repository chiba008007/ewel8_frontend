<script setup lang="ts">
import { ref } from "vue";
import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import ButtonView from "@/components/ButtonView.vue";
import { useRouter } from "vue-router";
import fileUpload from "@/components/fileUpload.vue";
import DialogWeight from "@/components/DialogWeight.vue";
import UserApiService from "@/services/UserApiService";
import WeightApiService from "@/services/WeightApiService";
import AlertView from "@/components/AlertView.vue";
import Papa from "papaparse";
import ProgressView from "@/components/ProgressView.vue";
import { useStoreUser } from "@/store/user";

import dayjs from "dayjs";
import "dayjs/locale/ja";

const loadingFlag = ref(true);
const user = useStoreUser();
dayjs.locale("ja");
const inputData = ref({
  element1: "0",
  element2: "0",
  element3: "0",
  element4: "0",
  element5: "0",
  element6: "0",
  element7: "0",
  element8: "0",
  element9: "0",
  element10: "0",
  element11: "0",
  element12: "0",
  element13: "0",
  element14: "0",
  name: "",
});

const disabled = ref(true);
const alertFlag = ref(false);
type inputDataType = {
  [key: string]: number;
};
const router = useRouter();
const params = router.currentRoute.value.params;

// 編集用
if (params.pattern === "edit") {
  let tmp = {
    weightid: params.weightid,
    customer_id: params.id,
  };
  WeightApiService.getWeightMasterDetail(tmp)
    .then((rst) => {
      inputData.value.name = rst.data.name;
      for (let i = 1; i <= 12; i++) {
        let wt = "wt" + i;
        let elm = "element" + i;
        (inputData.value as unknown as inputDataType)[elm] = rst.data[wt];
      }
      inputData.value.element13 = rst.data["ave"];
      inputData.value.element14 = rst.data["hensa"];
      disabled.value = false;
      loadingFlag.value = false;
    })
    .catch((e) => {
      console.log(e);
      alert("error");
    });
}

const tmp = {
  user_id: params.id,
};
type elemType = {
  text: string;
  num: number;
};

const elements = ref<elemType[]>([]);
UserApiService.getUserElement(tmp)
  .then((res) => {
    for (let i = 1; i <= 14; i++) {
      let elem = "element" + i;
      elements.value.push({ text: res.data[elem], num: i });
    }
    loadingFlag.value = false;
  })
  .catch((e) => {
    console.log("TestMenu ERROR" + e);
  });

const csvData = ref();
const onChange = (event: Event) => {
  let file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    Papa.parse(file, {
      complete: (result: object) => {
        csvData.value = result;
      },
      header: false, // ヘッダーがない場合はfalse
    });
  }
};
const onUpload = () => {
  let csvdata = csvData.value.data[1];
  let maxIndex = Math.min(csvdata.length, 15);
  for (let i = 0; i < maxIndex; i++) {
    (inputData.value as unknown as inputDataType)["element" + i] = csvdata[i];
  }
};
const dialoged = ref(false);
const onRegist = () => {
  dialoged.value = true;
  alertFlag.value = false;
};
// データ登録
const onOkClick = () => {
  let data = {
    id: params.id,
    partner_id: user.getSession("partner_id"),
    name: inputData.value.name,
    wt1: inputData.value.element1,
    wt2: inputData.value.element2,
    wt3: inputData.value.element3,
    wt4: inputData.value.element4,
    wt5: inputData.value.element5,
    wt6: inputData.value.element6,
    wt7: inputData.value.element7,
    wt8: inputData.value.element8,
    wt9: inputData.value.element9,
    wt10: inputData.value.element10,
    wt11: inputData.value.element11,
    wt12: inputData.value.element12,
    ave: inputData.value.element13,
    hensa: inputData.value.element14,
  };

  WeightApiService.setWeightMaster(data)
    .then((res) => {
      dialoged.value = false;
      alertFlag.value = true;
    })
    .catch((e) => {
      alert("Weight Set ERROR" + e);
    });
};
// データ更新
const onOkEditClick = () => {
  let data = {
    weightid: params.weightid,
    id: params.id,
    name: inputData.value.name,
    wt1: inputData.value.element1,
    wt2: inputData.value.element2,
    wt3: inputData.value.element3,
    wt4: inputData.value.element4,
    wt5: inputData.value.element5,
    wt6: inputData.value.element6,
    wt7: inputData.value.element7,
    wt8: inputData.value.element8,
    wt9: inputData.value.element9,
    wt10: inputData.value.element10,
    wt11: inputData.value.element11,
    wt12: inputData.value.element12,
    ave: inputData.value.element13,
    hensa: inputData.value.element14,
  };
  alertFlag.value = false;

  WeightApiService.editWeightMaster(data)
    .then(() => {
      alertFlag.value = true;
      dialoged.value = false;
    })
    .catch((e) => {
      alert("edit error");
    });
};
const onKeyup = (elem: elemType, point: number) => {
  let str = "element" + elem.num;
  (inputData.value as unknown as inputDataType)[str] = point;
};
const onButtonRegist = (str: string) => {
  disabled.value = true;
  if (str.length > 0) {
    disabled.value = false;
  }
};
const onCancel = () => {
  dialoged.value = false;
};
const onFormat = () => {
  location.href = "/format/weight.csv";
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <DialogWeight
    message="入力内容に問題がない場合は「はい」、問題がある場合は「いいえ」を画面下のボタンで選択してください。"
    :elements="elements"
    :inputData="inputData"
    :dialogFlag="dialoged"
    @onCancel="onCancel()"
    @onOkClick="params.pattern == 'edit' ? onOkEditClick() : onOkClick()"
  ></DialogWeight>
  <PartnerAdmin coded="customer" />
  <v-row justify="center" class="mt-6">
    <TestMenu />
  </v-row>
  <pankuzuMain
    pageName="weightMaster"
    :partnerhref="{
      pageName: 'testList',
      href: 'testLists',
    }"
    :partnerhref2="{
      pageName: 'weightMaster',
      href: 'weightMaster',
    }"
    :partnerhref3="{
      pageName: 'weightMasterSet',
      href: 'weightMasterSet',
    }"
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref2="{ pageName: 'weightMaster', href: 'weightMaster' }"
    :adminhref3="{ pageName: 'weightMasterSet', href: 'weightMasterSet' }"
  ></pankuzuMain>
  <div class="mx-3">
    <p class="text-caption">
      この画面では、CSVファイルをアップロードして重み付けデータを一括登録することができます。CSVファイルに含まれるデータを自動的に読み込み、各重み付けに反映します。<br />
      また、CSVファイルを使用せずに手動で重み付けを入力することも可能です。必要な重みをそれぞれ指定し、「登録」ボタンを押すことで、登録を実行できます。
    </p>
    <AlertView
      text="重み付け登録を行いました"
      type="success"
      v-if="alertFlag"
    ></AlertView>
    <v-row no-gutters>
      <v-col cols="8">
        <fileUpload
          @onClick="onUpload()"
          @onChange="(e:Event) => onChange(e)"
        ></fileUpload>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="w-50">
        <div class="d-flex w-50">
          <TextFieldView
            :value="inputData.name"
            class="w-50"
            placeholder="登録するマスター名を入力してください"
            @onKeyup="(e:string) => [inputData.name=e,onButtonRegist(e)]"
          ></TextFieldView>
          <ButtonView
            text="登録"
            class="ml-2 bg-lime"
            :disabled="disabled"
            @onClick="onRegist()"
          ></ButtonView>
          <ButtonView
            text="フォーマット"
            class="ml-2 cyan-accent-1"
            @onClick="onFormat()"
          ></ButtonView>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(elem, idx) in elements" :key="elem.text" cols="3">
        {{ elem.text }}
        <TextFieldView
          placeholder="0.0"
          type="number"
          :value="(inputData as unknown as inputDataType)['element' + (idx + 1)]"
          @onKeyup="(e:number|string) => onKeyup(elem, Number(e))"
        ></TextFieldView>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss"></style>
