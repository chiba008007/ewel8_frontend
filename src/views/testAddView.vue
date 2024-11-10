<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStoreUser } from "../store/user";
import { getTodayDateTime, getTodayDate } from "@/plugins/date";
import { movieArray, pdfArray } from "@/plugins/const";

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
import UserApiService from "@/services/UserApiService";
import { numberValue, requiredValue, checkDate } from "../plugins/validate";

const router = useRouter();
const route = useRoute();
const user = useStoreUser();
const tmpid = ref(route.path.replace(/[^0-9]/g, ""));
const today = new Date();

// const userdata = user.userdata;
// console.log(user.userdata);

const partner_id = ref();
const pankuzu = ref();
if ((user.userdata as any).type === "partner") {
  pankuzu.value = [{ title: user.customerInfoList }];
} else {
  let pid = UserApiService.getPartnerid({
    id: tmpid.value,
    type: "customer",
  });
  pid.then((e: any) => {
    partner_id.value = parseInt(e.data);

    pankuzu.value = [
      { title: user.home, href: router.resolve({ name: "List" }).href },
      {
        title: user.customerInfoList,
        href: router.resolve({
          name: "customerList",
          params: {
            id: partner_id.value,
          },
        }).href,
      },
      {
        title: user.testList,
        href: router.resolve({
          name: "testLists",
          params: {
            id: tmpid.value,
          },
        }).href,
      },
      {
        title: user.testAdd,
      },
    ];
  });
}
const tab = ref(1);
const inputData = ref({
  testname: "",
  testcount: 0,
  nameuseflag: true,
  genderuseflag: true,
  mailremaincount: 0,
  startdaytime: getTodayDateTime("start"),
  enddaytime: getTodayDateTime("end"),
  resultflag: true,
  envcheckflag: false,
  enqflag: false,
  lisencedownloadflag: false,
  examlistdownloadflag: false,
  totaldownloadflag: false,
  recomendflag: true,
  loginflag: false,
  logintext: "",
  movieType: 1,
  moviedisplayurl: "",
  pdfuseflag: false,
  pdfstartday: getTodayDate(),
  pdfendday: getTodayDate(),
  pdfcountflag: false,
  pdfcount: 0,
});

const registButton = ref<boolean>(true);
const onBlurButton = () => {
  registButton.value = true;
  if (!requiredValue(inputData.value.testname, "顧客企業名")) {
    registButton.value = false;
  }
};

const partnerDetail = ref();
let tmp = {
  partnerId: tmpid.value,
  type: "customer",
};

try {
  UserApiService.getPartnerDetail(tmp).then((res) => {
    const entries = (res as any).data.user;
    partnerDetail.value = entries;
  });
} catch (e) {
  console.log(e);
}

// 顧客企業名の取得
const customerDetail = ref();
tmp = {
  partnerId: tmpid.value,
  type: "guest",
};
try {
  UserApiService.getPartnerDetail(tmp).then((res) => {
    const entries = (res as any).data.user;
    customerDetail.value = entries;
  });
} catch (e) {
  alert("detail error");
  console.log(e);
}
const dateErrorMessage = ref("");
const onDateTime = (e: string) => {
  let tmpDate = e.split(" ")[0].split("-");
  let tmpTime = e.split(" ")[1].split(":");
  let y = tmpDate[0];
  let m = tmpDate[1];
  let d = tmpDate[2];
  let h = tmpTime[0];
  let mn = tmpTime[1];
  dateErrorMessage.value = "";
  let ymd = y + "-" + m + "-" + d + " " + h + ":" + mn;
  if (!checkDate(y, m, d)) {
    dateErrorMessage.value = "正しい日付を入力してください。";
  } else if (inputData.value.enddaytime < ymd) {
    dateErrorMessage.value = "終了日付に誤りがあります。";
  }

  inputData.value.startdaytime = ymd;
};
const onDateEndTime = (e: string) => {
  let tmpDate = e.split(" ")[0].split("-");
  let tmpTime = e.split(" ")[1].split(":");
  let y = tmpDate[0];
  let m = tmpDate[1];
  let d = tmpDate[2];
  let h = tmpTime[0];
  let mn = tmpTime[1];
  dateErrorMessage.value = "";
  let ymd = y + "-" + m + "-" + d + " " + h + ":" + mn;
  if (!checkDate(y, m, d)) {
    dateErrorMessage.value = "正しい日付を入力してください。";
  } else if (inputData.value.startdaytime > ymd) {
    dateErrorMessage.value = "開始日付に誤りがあります。";
  }

  inputData.value.enddaytime = ymd;
};
const pdfDateTime = (e: string, type: string) => {
  if (type === "start") {
    inputData.value.pdfstartday = e;
  }
  if (type === "e") {
    inputData.value.pdfendday = e;
  }
};
const pdfLists = ref(pdfArray);
const onSearch = (e: string) => {
  let tmp = [] as any;
  pdfLists.value = pdfArray;
  try {
    if (e) {
      let word = e;
      let reg = new RegExp(word);
      pdfLists.value.forEach(function (val, k) {
        if (reg.test(val.text)) {
          tmp.push(pdfLists.value[k]);
        }
      });
      pdfLists.value = tmp;
    }
  } catch (exc) {
    console.log(exc);
  }
};
const onClick = () => {
  alert(1234);
  console.log(inputData.value);
};
</script>
<template>
  <PartnerAdmin coded="customer" />
  <v-row justify="center">
    <TestMenu />
  </v-row>
  <v-breadcrumbs :items="pankuzu"></v-breadcrumbs>
  <v-tabs v-model="tab" class="ma-1">
    <v-tab value="0">検査新規登録</v-tab>
    <v-tab value="1">出力PDF選択</v-tab>
    <v-tab value="2">検査種別</v-tab>
    <v-tab value="3">販売可能ライセンス</v-tab>
  </v-tabs>
  <div class="ma-2">
    <ButtonView
      text="更新"
      color="lime"
      class="mt-3 mb-3"
      @onClick="onClick()"
    />
    <h3>{{ user.testAdd }}</h3>
  </div>
  <v-window v-model="tab">
    <v-window-item value="0">
      <section class="pa-2">
        検査内容を入力してください。
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
          :rules="requiredValue(inputData.testname, '検査名')"
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
          :rules="numberValue(inputData.testcount, '受検者数')"
          @onBlur="(e:any) => ((inputData.testcount = e), onBlurButton())"
        ></addPartnerForm>
        <addSwitchForm
          title="氏名の入力"
          :label="`表示する`"
          density="compact"
          color="bg-lime"
          :model="inputData.nameuseflag"
          :tooltipflag="true"
          tooltipMessage="氏名の表示可否を選択します。"
          @onClick="
            () => (inputData.nameuseflag = inputData.nameuseflag ? false : true)
          "
        ></addSwitchForm>
        <addSwitchForm
          title="性別の入力"
          :label="`表示する`"
          density="compact"
          color="bg-lime"
          :model="inputData.genderuseflag"
          :tooltipflag="true"
          tooltipMessage="性別の表示可否を選択します。"
          @onClick="
            () =>
              (inputData.genderuseflag = inputData.genderuseflag ? false : true)
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
          :rules="
            numberValue(inputData.mailremaincount, 'メール配信受検者残数')
          "
          @onBlur="(e:any) => ((inputData.mailremaincount = e), onBlurButton())"
        ></addPartnerForm>
        <addDateForm
          title="検査実施期間"
          color="bg-lime"
          :defaultyear="today.getFullYear()"
          :defaultmonth="today.getMonth() + 1"
          :defaultday="today.getDate()"
          :rules="dateErrorMessage"
          @onDateTime="(e:string) => onDateTime(e)"
          @onDateEndTime="(e:string) => onDateEndTime(e)"
        ></addDateForm>
        <addSwitchForm
          title="検査結果画面"
          :label="`表示する`"
          density="compact"
          color="bg-lime"
          :model="inputData.resultflag"
          :tooltipflag="true"
          tooltipMessage="検査結果の表示可否を選択します。"
          @onClick="
            () => (inputData.resultflag = inputData.resultflag ? false : true)
          "
        ></addSwitchForm>
        <addSwitchForm
          title="事前環境チェックの有無"
          :label="`表示する`"
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
          :label="`表示する`"
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
          :label="`表示する`"
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
          :label="`設定する`"
          density="compact"
          color="bg-lime"
          :model="inputData.examlistdownloadflag"
          :tooltipflag="true"
          tooltipMessage="受検者ダウンロード設定可否を行います。"
          @onClick="
            () =>
              (inputData.examlistdownloadflag = inputData.examlistdownloadflag
                ? false
                : true)
          "
        ></addSwitchForm>
        <addSwitchForm
          title="一括ダウンロード設定"
          :label="`設定する`"
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
          :label="`表示する`"
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
          title="ログイン説明文"
          color="bg-lime"
          variant="outlined"
          :loginModel="inputData.loginflag"
          :hideDetails="`auto`"
          :disabled="inputData.loginflag ? false : true"
          :height="15"
          @onClick="
            (e) => (inputData.loginflag = inputData.loginflag ? false : true)
          "
          @onBlur="(e) => (inputData.logintext = e)"
        ></addLoginForm>
        <addMovieForm
          title="動画サムネイルの表示"
          color="bg-lime"
          :items="movieArray"
          :value="inputData.movieType"
          @onChange="(e:number) => (inputData.movieType = e)"
          @onURL="(e:string)=>inputData.moviedisplayurl=e"
        ></addMovieForm>
      </section>
    </v-window-item>
    <v-window-item value="1">
      <section class="pa-2">
        <addPDFForm
          title="PDF出力制限"
          color="bg-lime"
          :defaultyear="today.getFullYear()"
          :defaultmonth="today.getMonth() + 1"
          :defaultday="today.getDate()"
          :items="movieArray"
          :value="inputData.pdfuseflag"
          :valuePDF="inputData.pdfcountflag"
          @onUpdate="(e:boolean) => (inputData.pdfuseflag = inputData.pdfuseflag?!e:e)"
          @onDateTime="(e:string) => pdfDateTime(e,'start')"
          @onDateEndTime="(e:string) => pdfDateTime(e,'end')"
          @PDFCountFlag="(e:boolean)=>(inputData.pdfcountflag = inputData.pdfcountflag?!e:e)"
          @onPdfCount="(e:number) => (inputData.pdfcount = e)"
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
          :value="pdf.key"
          hide-details="false"
          class="ma-0 pa-0"
        >
        </CheckboxView>
      </section>
    </v-window-item>
    <v-window-item value="2"> bbb </v-window-item>
    <v-window-item value="3"> ccc </v-window-item>
  </v-window>
</template>
<style lang="scss"></style>
