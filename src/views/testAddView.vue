<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useStoreUser } from "@/store/user";
import { getTodayDateTime, getTodayDate } from "@/plugins/date";
import {
  movieArray,
  pdfArray,
  displayStatus,
  settingStatus,
  edittingStatus,
} from "@/plugins/const";

import TestMenu from "../components/TestMenu.vue";
import PartnerAdmin from "../components/PartnerAdmin.vue";
import ButtonView from "@/components/ButtonView.vue";
import addPartnerForm from "../components/addPartnerForm.vue";
import addSwitchForm from "../components/addSwitchForm.vue";
import addDateForm from "../components/addDateForm.vue";
import addLoginForm from "../components/addLoginExplainForm.vue";
import CheckboxView from "@/components/CheckboxView.vue";
import addMovieForm from "../components/addMovieForm.vue";
import addPDFForm from "../components/addPDFForm.vue";
import TextFieldView from "@/components/TextFieldView.vue";
import { useRouter, useRoute } from "vue-router";
import TestApiService from "@/services/TestApiService";
import WeightApiService from "@/services/WeightApiService";
import {
  numberValue,
  requiredValue,
  makeNumberRule,
} from "../plugins/validate";
import CardViewPFS from "@/components/CardViewPFS.vue";
import CardViewBAJ3 from "@/components/CardViewBAJ3.vue";
import ElementApiService from "@/services/ElementApiService";
import AlertView from "@/components/AlertView.vue";
import pankuzuMain from "@/components/pankuzuMain.vue";
import pageLicense from "@/plugins/pageLicense";
import dateChecked from "@/plugins/dateChecked";
import testPartsAdd from "@/plugins/testPartsAdd";
import testAdd from "@/plugins/testAdd";
import { inputDataPartsType, inputDataType, testpdfType } from "@/types";
import ProgressView from "@/components/ProgressView.vue";
import { useTestParts } from "@/composables/useTestParts";

const { applyTestParts } = useTestParts();
const router = useRouter();
const route = useRoute();
const user = useStoreUser();

const tmpid = route.params.id;
const editid = route.params?.edit_id ? route.params?.edit_id : 0;
const pl = pageLicense();
const dc = dateChecked();

const today = new Date();
const errorTab1 = ref(2);
const errorTab2 = ref(1);
// const userdata = user.userdata;
// console.log(user.userdata);
const isLoading = ref(true);
const tab = ref(0);
const loadingFlag = ref(true);
const inputWeightMasterString = ref<Record<string, string>>({});
const partner_id = user.getSession("partner_id");
const inputData = ref({
  testname: "",
  testcount: 0,
  nameuseflag: true,
  genderuseflag: true,
  mailremaincount: 0,
  startdaytime: getTodayDateTime("start"),
  enddaytime: getTodayDateTime("end"),
  resultflag: false,
  envcheckflag: false,
  enqflag: false,
  lisencedownloadflag: false,
  examlistdownloadflag: false,
  totaldownloadflag: false,
  recomendflag: true,
  loginflag: false,
  logintext: "",
  movietype: 3,
  moviedisplayurl: "",
  pdfuseflag: false,
  pdfstartday: getTodayDate(),
  pdfendday: getTodayDate(),
  pdfcountflag: false,
  pdflimitcount: 0,
  create_start_year: 0,
  create_start_month: 0,
  create_start_day: 0,
  create_start_time: 0,
  create_start_minute: 0,
  testparts: { PDF: {}, BAJ3: {} },
});

const initialPartStatus: inputDataPartsType = {
  threeflag: false,
  weightFlag: false,
  status: false,
  timelimit: null,
  weight1: null,
  weight2: null,
  weight3: null,
  weight4: null,
  weight5: null,
  weight6: null,
  weight7: null,
  weight8: null,
  weight9: null,
  weight10: null,
  weight11: null,
  weight12: null,
  weight13: null,
  weight14: null,
  weight: null,
};

const inputTestPart = ref<{
  PFS: inputDataPartsType;
  BAJ3: inputDataPartsType;
}>({
  PFS: { ...initialPartStatus },
  BAJ3: { ...initialPartStatus },
});

// 重み付けマスタ取得
const inputWeight = ref();
const lisenceView = ref(pl.getUserLisence(tmpid));
const lisenceViewCalc = ref(pl.getUserLisenceCalc(tmpid));

const pdfLists = ref(pdfArray);
const inputPDf = ref([{ key: 0, text: "", value: false }]);
inputPDf.value = [];
pdfLists.value.forEach(function (val) {
  inputPDf.value[val.key] = {
    key: val.key,
    text: val.text,
    value: false,
  };
});
const registButton = ref<boolean>(true);
const done = ref(0);

onMounted(async () => {
  // 編集用データ取得
  if (editid) {
    let tmp = {
      id: editid,
      user_id: tmpid,
    };
    errorTab1.value = 0;
    errorTab2.value = 0;
    registButton.value = false;
    try {
      TestApiService.getTestEditData(tmp).then((res) => {
        done.value = res.data.done;
        (inputData.value as inputDataType) = testAdd().testEdit(
          inputData.value,
          res
        );
        res.data.testpdf.forEach(function (val: testpdfType) {
          inputPDf.value[val.pdf_id] = {
            key: val.pdf_id,
            text: "",
            value: true,
          };
        });
        // 各パーツ
        applyTestParts(inputTestPart, res.data.testparts);
      });
    } catch (e) {
      alert("editdata error");
    } finally {
      isLoading.value = false;
    }
  } else {
    isLoading.value = false;
  }

  try {
    WeightApiService.getWeightMaster({ id: tmpid, partner_id: partner_id })
      .then((res) => {
        inputWeight.value = res.data;
      })
      .catch((e) => {
        alert("error" + e);
      });
  } catch (e) {
    console.log(e);
  }
});
watch(tab, (newTab) => {
  if (newTab === 0) {
    onBlurButton();
  }
  if (newTab == 1) {
    onBlurButton1();
  }
  if (newTab == 2) {
    if (errorTab1.value == 0 && errorTab2.value == 0) {
      registButton.value = false;
    }
  }
});
const onBlurButton1 = () => {
  // 1つでも利用するstatusの時ボタンを押下可能
  registButton.value = true;
  errorTab2.value = 1;
  for (const elem of Object.values(inputTestPart.value)) {
    if (elem.status) {
      errorTab2.value = 0;
      registButton.value = false;
      break;
    }
  }
};
const onBlurButton = () => {
  registButton.value = true;
  if (inputData.value.testname) {
    errorTab1.value = errorTab1.value > 0 ? errorTab1.value - 1 : 0;
  }
  if (inputData.value.testcount > 0) {
    errorTab1.value = errorTab1.value > 0 ? errorTab1.value - 1 : 0;
  }
  if (inputData.value.testname && inputData.value.testcount > 0) {
    registButton.value = false;
  }
  if (editid) {
    if (Number(done.value) > Number(inputData.value.testcount)) {
      registButton.value = true;
    }
  }
};

// パートナー・顧客企業の取得

const partnerDetail = ref();
const customerDetail = ref();
pl.getPartnerDetail(partner_id, "partner").then((res) => {
  partnerDetail.value = res.partnerDetail;
  // 顧客企業情報の取得
  pl.getPartnerDetail(tmpid.toString(), "customer").then((res) => {
    customerDetail.value = res?.partnerDetail;
    loadingFlag.value = false;
  });
});

const dateErrorMessage = ref("");
const onDateTime = async (e: string) => {
  dateErrorMessage.value = "";
  let res = await dc.onDateTime(e, inputData.value.enddaytime);
  inputData.value.startdaytime = e;
  if (res.dateErrorMessage) dateErrorMessage.value = res.dateErrorMessage;
};
const onDateEndTime = async (e: string) => {
  dateErrorMessage.value = "";
  let res = await dc.onDateEndTime(e, inputData.value.startdaytime);
  inputData.value.enddaytime = e;
  if (res.dateErrorMessage) dateErrorMessage.value = res.dateErrorMessage;
};

const pdfDateTime = (e: string, type: string) => {
  if (type === "start") {
    inputData.value.pdfstartday = e;
  }
  if (type === "end") {
    inputData.value.pdfendday = e;
  }
};

const onSearch = (e: string) => {
  pdfLists.value = pdfArray;
  if (e) {
    let word = e;
    let reg = new RegExp(word);
    let tmp = [] as any;
    pdfLists.value.forEach(function (val, k) {
      if (reg.test(val.text)) {
        tmp.push(pdfLists.value[k]);
      }
    });
    pdfLists.value = tmp;
  }
};

const alertFlag = ref(false);

/**
 * 検査登録実行
 */
const onClick = () => {
  alertFlag.value = false;
  let tmp = {
    partner_id: partner_id,
    customer_id: tmpid,
    user_id: tmpid,
    testname: inputData.value.testname,
    testcount: inputData.value.testcount,
    nameuseflag: inputData.value.nameuseflag,
    genderuseflag: inputData.value.genderuseflag,
    mailremaincount: inputData.value.mailremaincount,
    startdaytime: inputData.value.startdaytime,
    enddaytime: inputData.value.enddaytime,
    resultflag: inputData.value.resultflag,
    envcheckflag: inputData.value.envcheckflag,
    enqflag: inputData.value.enqflag,
    lisencedownloadflag: inputData.value.lisencedownloadflag,
    examlistdownloadflag: inputData.value.examlistdownloadflag,
    totaldownloadflag: inputData.value.totaldownloadflag,
    recomendflag: inputData.value.recomendflag,
    loginflag: inputData.value.loginflag,
    logintext: inputData.value.logintext,
    movietype: inputData.value.movietype,
    moviedisplayurl: inputData.value.moviedisplayurl,
    pdfuseflag: inputData.value.pdfuseflag,
    pdfstartday: inputData.value.pdfstartday,
    pdfendday: inputData.value.pdfendday,
    pdfcountflag: inputData.value.pdfcountflag,
    pdflimitcount: inputData.value.pdflimitcount,
    pdf: inputPDf.value,
    parts: [inputTestPart.value],
    status: 1,
  };

  try {
    TestApiService.setTest(tmp).then((res) => {
      alertFlag.value = true;
    });
  } catch (e) {
    alert("regist error");
  }
};

const onEditClick = () => {
  alertFlag.value = false;
  //  console.log(inputPDf.value);
  let tmp = {
    partner_id: partner_id,
    customer_id: tmpid,
    user_id: tmpid,
    edit_id: editid,
    testname: inputData.value.testname,
    testcount: inputData.value.testcount,
    nameuseflag: inputData.value.nameuseflag,
    genderuseflag: inputData.value.genderuseflag,
    mailremaincount: inputData.value.mailremaincount,
    startdaytime: inputData.value.startdaytime,
    enddaytime: inputData.value.enddaytime,
    resultflag: inputData.value.resultflag,
    envcheckflag: inputData.value.envcheckflag,
    enqflag: inputData.value.enqflag,
    lisencedownloadflag: inputData.value.lisencedownloadflag,
    examlistdownloadflag: inputData.value.examlistdownloadflag,
    totaldownloadflag: inputData.value.totaldownloadflag,
    recomendflag: inputData.value.recomendflag,
    loginflag: inputData.value.loginflag,
    logintext: inputData.value.logintext,
    movietype: inputData.value.movietype,
    moviedisplayurl: inputData.value.moviedisplayurl,
    pdfuseflag: inputData.value.pdfuseflag,
    pdfstartday: inputData.value.pdfstartday,
    pdfendday: inputData.value.pdfendday,
    pdfcountflag: inputData.value.pdfcountflag,
    pdflimitcount: inputData.value.pdflimitcount,
    pdf: inputPDf.value,
    parts: [inputTestPart.value],
  };
  try {
    TestApiService.editTest(tmp).then((res) => {
      alertFlag.value = true;
    });
  } catch (e) {
    alert("edit error");
  }
};

const pdfCheck = (e: any, k: number) => {
  inputPDf.value[k].value = e;
};

const elements = ref();
ElementApiService.getElementData().then((res) => {
  elements.value = res;
});

const displayString = (type: boolean) => {
  return type ? displayStatus[1] : displayStatus[0];
};
const settingString = (type: boolean) => {
  return type ? settingStatus[1] : settingStatus[0];
};
const edittingString = (type: boolean) => {
  return type ? edittingStatus[1] : edittingStatus[0];
};
const pagemove = () => {
  router.push({ name: "testLists", params: { id: tmpid } });
};

const setInputWeight = (e: string | number | null, type: string) => {
  const result = inputWeight.value.find(
    (item: { id: number; name: string; created_at: string; date: string }) =>
      item.id === Number(e)
  );

  //inputWeightMasterString.value = result && result.name ? result.name : "";
  if (result && result?.id) {
    WeightApiService.getWeightMasterDetail({
      weightid: result.id,
      customer_id: tmpid,
    }).then((res) => {
      if (type === "PFS") {
        inputTestPart.value.PFS.weight = [];
        for (let i = 1; i <= 14; i++) {
          let data = res.data[`wt${i}`];
          if (i == 13) data = res.data.ave;
          if (i == 14) data = res.data.hensa;
          (inputTestPart.value.PFS.weight as any)[i] = data;
          (inputTestPart.value.PFS as any)["weight" + i] = data;
        }
      }
      if (type === "BA-J3") {
        inputTestPart.value.BAJ3.weight = [];
        for (let i = 1; i <= 14; i++) {
          let data = res.data[`wt${i}`];
          if (i == 13) data = res.data.ave;
          if (i == 14) data = res.data.hensa;
          (inputTestPart.value.BAJ3.weight as any)[i] = data;
          (inputTestPart.value.BAJ3 as any)["weight" + i] = data;
        }
      }
      inputWeightMasterString.value[type] = result.name;
    });
  }
};
</script>
<template>
  <ProgressView v-if="loadingFlag"></ProgressView>
  <PartnerAdmin coded="customer" />
  <v-row justify="center" class="mt-5">
    <TestMenu />
  </v-row>
  <pankuzuMain
    type="testList"
    :partnerhref="{ pageName: 'testList', href: 'testLists' }"
    :partnerhref2="{ pageName: 'testAdd' }"
    :adminhref="{ pageName: 'testList', href: 'testLists' }"
    :adminhref2="{ pageName: 'testAdd' }"
  ></pankuzuMain>
  <p class="text-lowercase ml-2 text-caption">
    検査内容を入力してください。 <br />
    赤丸内の数が残り必須入力数になります。<br />
    入力し終えたら「次へ」ボタンを押下してください。「販売可能ライセンス」まで遷移すると表示される「検査登録実行」ボタンを押下し検査登録を行ってください。<br />
  </p>
  <v-tabs v-model="tab" class="ma-1">
    <v-tab :value="0">
      <v-badge color="error" :content="errorTab1" floating>
        検査新規登録
      </v-badge>
    </v-tab>
    <v-tab :value="1">
      <v-badge color="error" :content="errorTab2" floating> 検査種別 </v-badge>
    </v-tab>
    <v-tab :value="2">出力PDF選択</v-tab>
  </v-tabs>
  <div class="ma-2">
    <AlertView
      title=""
      text="検査登録成功しました。"
      type="success"
      v-show="alertFlag"
    ></AlertView>
    <ButtonView
      text="検査一覧"
      color="red"
      class="mt-3 mb-3 mr-2"
      variant="outlined"
      @onClick="pagemove()"
    />
    <ButtonView
      v-if="tab > 0"
      text="戻る"
      color="purple"
      class="mt-3 mb-3 mr-2"
      @onClick="tab = Number(tab) - 1"
    />
    <ButtonView
      v-if="tab <= 1"
      text="次へ"
      color="lime"
      class="mt-3 mb-3"
      :disabled="registButton"
      @onClick="tab = Number(tab) + 1"
    />
    <ButtonView
      v-else-if="editid && route.name != 'testCopy'"
      text="検査更新実行"
      color="green"
      class="mt-3 mb-3 ml-1"
      :disabled="registButton"
      @onClick="onEditClick()"
    />
    <ButtonView
      v-else
      text="検査登録実行"
      color="green"
      class="mt-3 mb-3 ml-1"
      :disabled="registButton"
      @onClick="onClick()"
    />
    <h3>{{ user.testAdd }}</h3>
  </div>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <v-window v-model="tab">
      <v-window-item :value="0">
        <p class="ml-2 text-caption">販売可能ライセンス</p>
        <v-row dense class="ml-2">
          <v-col
            cols="1"
            v-for="lisence in lisenceViewCalc"
            :key="lisence.id"
            class="text-cener"
          >
            <div class="border-sm">
              <div class="border-b-sm text-center bg-lime text-caption">
                {{ lisence.jp }}
              </div>
              <p class="text-right text-caption">{{ lisence.num }}</p>
            </div>
          </v-col>
        </v-row>

        <section class="pa-2">
          <addPartnerForm
            v-show="partnerDetail?.name"
            title="パートナー企業名"
            :displayTextValue="partnerDetail?.name"
            color="bg-lime"
          ></addPartnerForm>
          <addPartnerForm
            v-show="customerDetail?.name"
            title="顧客企業名"
            :displayTextValue="customerDetail?.name"
            color="bg-lime"
          ></addPartnerForm>
          <addPartnerForm
            color="bg-lime"
            title="検査名"
            text="検査名を入力してください"
            class="w-100"
            :hideDetails="`auto`"
            :value="inputData.testname"
            :requriredIcon="true"
            :rules="[(e) => requiredValue(e, '検査名')]"
            @onBlur="(e:any) => ((inputData.testname = e), onBlurButton())"
          ></addPartnerForm>
          <addPartnerForm
            color="bg-lime"
            title="受検者数"
            text="受検者数を入力してください"
            explaintext="半角数字で入力してください。以下で選択される検査受検者数に反映されます。"
            class="w-50"
            :hideDetails="`auto`"
            :value="inputData.testcount"
            :requriredIcon="true"
            :rules="[
              (v) =>
                numberValue(Number(v), '受検者数', 10000, Number(editid), done),
            ]"
            @onBlur="(e:any) => ((inputData.testcount = e), onBlurButton())"
          ></addPartnerForm>
          <addSwitchForm
            title="氏名の入力"
            :label="displayString(inputData.nameuseflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.nameuseflag"
            :tooltipflag="true"
            tooltipMessage="氏名の表示可否を選択します。"
            @onClick="
              () =>
                (inputData.nameuseflag = inputData.nameuseflag ? false : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="性別の入力"
            :label="displayString(inputData.genderuseflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.genderuseflag"
            :tooltipflag="true"
            tooltipMessage="性別の表示可否を選択します。"
            @onClick="
              () =>
                (inputData.genderuseflag = inputData.genderuseflag
                  ? false
                  : true)
            "
          ></addSwitchForm>
          <addPartnerForm
            color="bg-lime"
            title="メール配信受検者残数"
            text="メール配信受検者残数を入力してください"
            explaintext="未指定の場合は0または、空欄にしてください。"
            class="w-50"
            :tooltipflag="true"
            tooltipMessage="残数（未受検者）が指定の人数以下になった際に担当者にメールが配信されます。"
            :hideDetails="`auto`"
            :value="inputData.mailremaincount"
            :rules="[
              makeNumberRule('メール配信受検者残数', { allowEmpty: true }),
            ]"
            @onBlur="(e:any) => ((inputData.mailremaincount = e), onBlurButton())"
          ></addPartnerForm>
          <addDateForm
            title="検査実施期間"
            color="bg-lime"
            :defaultyear="today.getFullYear()"
            :startdaytime="inputData.startdaytime"
            :enddaytime="inputData.enddaytime"
            :rules="dateErrorMessage"
            @onDateTime="(e:string) => onDateTime(e)"
            @onDateEndTime="(e:string) => onDateEndTime(e)"
          ></addDateForm>
          <addSwitchForm
            title="検査結果画面"
            :label="displayString(inputData.resultflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.resultflag"
            :tooltipflag="true"
            :tooltipMessage="`検査結果の表示可否を選択します。`"
            @onClick="
              () => (inputData.resultflag = inputData.resultflag ? false : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="事前環境チェックの有無"
            :label="displayString(inputData.envcheckflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.envcheckflag"
            :tooltipflag="true"
            tooltipMessage="検査利用のためブラウザのバージョンチェックを行います。"
            @onClick="
              () =>
                (inputData.envcheckflag = inputData.envcheckflag ? false : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="強みアンケート利用"
            :label="displayString(inputData.enqflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.enqflag"
            :tooltipflag="true"
            tooltipMessage="アンケートの利用可否選択を行います。"
            @onClick="
              () => (inputData.enqflag = inputData.enqflag ? false : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="受検証明書ダウンロード設定"
            :label="displayString(inputData.lisencedownloadflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.lisencedownloadflag"
            :tooltipflag="true"
            tooltipMessage="受検証明書ダウンロード可否選択を行います。"
            @onClick="
              () =>
                (inputData.lisencedownloadflag = inputData.lisencedownloadflag
                  ? false
                  : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="受検者ダウンロード設定"
            :label="displayString(inputData.examlistdownloadflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.examlistdownloadflag"
            :tooltipflag="true"
            :tooltipMessage="`受検メニュー画面での検査結果ダウンロードボタンの表示設定可否を行います。`"
            @onClick="
              () =>
                (inputData.examlistdownloadflag = inputData.examlistdownloadflag
                  ? false
                  : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="一括ダウンロード設定"
            :label="settingString(inputData.totaldownloadflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.totaldownloadflag"
            :tooltipflag="true"
            tooltipMessage="受検者全員の検査結果を一括でダウンロードします。"
            @onClick="
              () =>
                (inputData.totaldownloadflag = inputData.totaldownloadflag
                  ? false
                  : true)
            "
          ></addSwitchForm>
          <addSwitchForm
            title="推奨ブラウザ説明文"
            :label="displayString(inputData.recomendflag)"
            density="compact"
            color="bg-lime"
            :model="inputData.recomendflag"
            :tooltipflag="true"
            tooltipMessage="推奨ブラウザ説明文、表示可否を行います。"
            @onClick="
              () =>
                (inputData.recomendflag = inputData.recomendflag ? false : true)
            "
          ></addSwitchForm>
          <addLoginForm
            v-model="inputData.loginflag"
            title="ログイン説明文"
            :label="edittingString(inputData.loginflag)"
            color="bg-lime"
            variant="outlined"
            :value="inputData.logintext"
            hideDetails="auto"
            :disabled="!inputData.loginflag"
            :height="15"
            @onBlur="(e) => (inputData.logintext = e)"
          />
          <addMovieForm
            title="動画サムネイルの表示"
            color="bg-lime"
            :items="movieArray"
            :value="inputData.movietype"
            :url="inputData.moviedisplayurl"
            @onChange="(e:number) => (inputData.movietype = e)"
            @onURL="(e:string)=>inputData.moviedisplayurl=e"
          ></addMovieForm>
        </section>
      </v-window-item>
      <v-window-item :value="1">
        <section class="pa-2">
          <v-row>
            <v-col cols="12">
              <div v-for="val in lisenceView" :key="val.id">
                <CardViewPFS
                  :pagename="route.name"
                  :editid="editid"
                  v-show="(inputData.testparts as any)[val.code]?.id && editid || editid === 0 ? true:false"
                  class="mt-3"
                  v-if="val.code == 'PFS'"
                  :title="val.jp"
                  :testcount="inputData.testcount"
                  :model="inputTestPart.PFS.threeflag"
                  :weightModel="inputTestPart.PFS.weightFlag"
                  :dataDetail="inputTestPart.PFS"
                  :inputWeight="inputWeight"
                  :inputWeightMasterString="inputWeightMasterString[val.code]"
                  :element="elements"
                  @onThree="(e) => (inputTestPart.PFS.threeflag = e)"
                  @onWeightFlag="(e) => (inputTestPart.PFS.weightFlag = e)"
                  @onWeight="(e) => (inputTestPart.PFS.weight = e)"
                  @onStatus="
                    (e) => ((inputTestPart.PFS.status = e), onBlurButton1())
                  "
                  @setInputWeight="(e) => setInputWeight(e, val.code)"
                ></CardViewPFS>
                <CardViewBAJ3
                  :pagename="route.name"
                  :editid="editid"
                  class="mt-3"
                  v-if="val.code == 'BA-J3'"
                  :title="val.jp"
                  :testcount="inputData.testcount"
                  :model="inputTestPart.BAJ3.threeflag"
                  :weightModel="inputTestPart.BAJ3.weightFlag"
                  :dataDetail="inputTestPart.BAJ3"
                  :inputWeight="inputWeight"
                  :inputWeightMasterString="inputWeightMasterString[val.code]"
                  :element="elements"
                  @onThree="(e) => (inputTestPart.BAJ3.threeflag = e)"
                  @onWeightFlag="(e) => (inputTestPart.BAJ3.weightFlag = e)"
                  @onWeight="(e) => (inputTestPart.BAJ3.weight = e)"
                  @onStatus="
                    (e) => ((inputTestPart.BAJ3.status = e), onBlurButton1())
                  "
                  @setInputWeight="(e) => setInputWeight(e, val.code)"
                ></CardViewBAJ3>
              </div>
            </v-col>
          </v-row>
        </section>
      </v-window-item>
      <v-window-item :value="2">
        <section class="pa-2">
          <addPDFForm
            title="PDF出力制限"
            color="bg-lime"
            :defaultyear="today.getFullYear()"
            :defaultmonth="today.getMonth() + 1"
            :defaultday="today.getDate()"
            :inputData="inputData"
            :editid="editid"
            :items="movieArray"
            :value="inputData.pdfuseflag"
            :valuePDF="inputData.pdfcountflag ? true : false"
            @onClick="(e:boolean) => (inputData.pdfuseflag = e)"
            @onDateTime="(e:string) => pdfDateTime(e,'start')"
            @onDateEndTime="(e:string) => pdfDateTime(e,'end')"
            @PDFCountFlag="(e:boolean)=>(inputData.pdfcountflag = e)"
            @onPdfCount="(e:number) => (inputData.pdflimitcount = e)"
          ></addPDFForm>
          <TextFieldView
            class="w-50"
            placeholder="選択したいPDF名を入力してください。"
            @onKeyup="(e) => onSearch(e)"
          ></TextFieldView>
          <CheckboxView
            v-for="pdf in pdfLists"
            :key="pdf.key"
            :label="pdf.text"
            :value="inputPDf[pdf.key].value"
            :hide-details="false"
            class="ma-0 pa-0"
            @onChange="(e) => pdfCheck(e, pdf.key)"
          >
          </CheckboxView>
        </section>
      </v-window-item>
    </v-window>
  </div>
</template>
<style lang="scss"></style>
