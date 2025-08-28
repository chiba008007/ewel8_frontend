<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps, defineEmits, ref } from "vue";
import TextFieldView from "./TextFieldView.vue";
import ComponentSwitch from "@/components/SwitchView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import { monthArray, dayArray } from "@/plugins/const";
import { zeroPadding, numberValue, zeroZapress } from "@/plugins/validate";
import { settingStatus } from "@/plugins/const";
import dayjs from "dayjs";
import { inputDataType } from "@/types";
const settingString = (type: boolean) => {
  return type ? settingStatus[1] : settingStatus[0];
};

const props = defineProps<{
  title?: string;
  hideDetails?: boolean | "auto";
  color?: string;
  items?: object | any;
  value?: number | string | boolean;
  valuePDF?: number | string | boolean;
  defaultyear?: number;
  defaultmonth?: number | string;
  defaultday?: number | string;
  editid?: number | string[] | string;
  inputData?: inputDataType;
}>();

const emit = defineEmits<{
  (e: "onUpdate", value: boolean, type: string): void;
  (e: "onClick", value: boolean): void;
  (e: "onChange", value: number): void;
  (e: "onDateTime", value: string): void;
  (e: "onDateEndTime", value: string): void;
  (e: "PDFCountFlag", value: boolean): void;
  (e: "onPdfCount", value: number): void;
}>();

const datePDFStart = ref(dayjs((props.inputData as inputDataType).pdfstartday));
const datePDFEnd = ref(dayjs((props.inputData as inputDataType).pdfendday));

const today = new Date();
const startdate = ref({
  startyear: props.editid
    ? datePDFStart.value.year()
    : today.getFullYear().toString(),
  startmonth: props.editid
    ? datePDFStart.value.month()
    : zeroPadding(today.getMonth() + 1),
  startday: props.editid
    ? datePDFStart.value.date()
    : zeroPadding(today.getDate()),
});
const enddate = ref({
  endyear: props.editid
    ? datePDFEnd.value.year()
    : today.getFullYear().toString(),
  endmonth: props.editid
    ? datePDFEnd.value.month()
    : zeroPadding(today.getMonth() + 1),
  endday: props.editid ? datePDFEnd.value.date() : zeroPadding(today.getDate()),
});
const requestDateTime = () => {
  let year = startdate.value.startyear
    ? startdate.value.startyear
    : today.getFullYear();
  const datetimes =
    year +
    "-" +
    (Number(startdate.value.startmonth) + 1) +
    "-" +
    startdate.value.startday;
  datePDFStart.value = datePDFStart.value
    .month(Number(startdate.value.startmonth))
    .date(Number(startdate.value.startday));
  emit("onDateTime", datetimes);
};
const requestDateTimeEND = () => {
  const datetimes =
    enddate.value.endyear +
    "-" +
    (Number(enddate.value.endmonth) + 1) +
    "-" +
    enddate.value.endday;

  datePDFEnd.value = datePDFEnd.value
    .month(Number(enddate.value.endmonth))
    .date(Number(enddate.value.endday));
  emit("onDateEndTime", datetimes);
};

const pdfCount = ref(props.inputData?.pdflimitcount);
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <p>PDF出力に制限を設ける場合は下記を選択してください。</p>
      <div class="mt-6">
        <p>PDF出力期間を設定する</p>
        <ComponentSwitch
          :label="settingString(props.value ? true : false)"
          :title="props.title"
          :model="props.value"
          @onClick="emit('onClick', props.value ? false : true)"
        ></ComponentSwitch>
      </div>
      <div class="mt-6">
        <p>PDF出力可能期間</p>
        <v-row no-gutters>
          <v-col cols="8">
            <p class="text-caption">【開始日付】</p>
            <div class="d-flex">
              <TextFieldView
                class="w-25"
                :value="editid ? datePDFStart.year() : props.defaultyear"
                :maxlength="4"
                @onKeyup="(e) => ((startdate.startyear = e), requestDateTime())"
              />
              <span class="mt-3 text-caption">年</span>
              <SelectFieldView
                :items="monthArray"
                :text="
                  editid || datePDFStart
                    ? datePDFStart.month() + 1
                    : props.defaultmonth
                "
                class="w-25"
                @onChange="
                  (e) => (
                    (startdate.startmonth = Number(parseInt(e) - 1)),
                    requestDateTime()
                  )
                "
              /><span class="mt-3 text-caption">月</span>
              <SelectFieldView
                :items="dayArray"
                class="w-25"
                :text="
                  editid || datePDFStart
                    ? datePDFStart.date()
                    : props.defaultday
                "
                @onChange="
                  (e) => (
                    (startdate.startday = zeroPadding(e)), requestDateTime()
                  )
                "
              /><span class="mt-3 text-caption">日</span>
            </div>
          </v-col>
          <v-col cols="8">
            <p class="text-caption">【終了日付】</p>
            <div class="d-flex">
              <TextFieldView
                class="w-25"
                :value="editid ? datePDFEnd.year() : props.defaultyear"
                :maxlength="4"
                @onKeyup="(e) => ((enddate.endyear = e), requestDateTimeEND())"
              />
              <span class="mt-3 text-caption">年</span>
              <SelectFieldView
                :items="monthArray"
                :text="
                  editid
                    ? datePDFEnd.month() + 1
                    : zeroZapress(enddate.endmonth)
                "
                class="w-25"
                @onChange="
                  (e) => (
                    (enddate.endmonth = Number(parseInt(e) - 1)),
                    requestDateTimeEND()
                  )
                "
              /><span class="mt-3 text-caption">月</span>
              <SelectFieldView
                :items="dayArray"
                class="w-25"
                :text="editid ? datePDFEnd.date() : zeroZapress(enddate.endday)"
                @onChange="
                  (e) => (
                    (enddate.endday = zeroPadding(e)), requestDateTimeEND()
                  )
                "
              /><span class="mt-3 text-caption">日</span>
            </div>
          </v-col>
        </v-row>
        <p class="text-caption">
          ※選択された場合は、該当期間のみPDFボタンが表示されます。
        </p>
      </div>

      <div class="mt-6">
        <p>PDF出力人数を設定する</p>
        <ComponentSwitch
          :label="settingString(props.valuePDF ? true : false)"
          :title="props.title"
          :model="props.valuePDF"
          @onClick="emit('PDFCountFlag', props.valuePDF ? false : true)"
        ></ComponentSwitch>
        <p>PDF出力制限数</p>
        <TextFieldView
          class="w-50"
          type="number"
          :value="pdfCount"
          :maxlength="4"
          :hideDetails="`auto`"
          :rules="[(v) => numberValue(Number(v), 'PDF出力制限')]"
          @onKeyup="
            (e) => ((pdfCount = parseInt(e)), emit('onPdfCount', pdfCount))
          "
        />
      </div>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <p class="text-h8">PDF出力形式選択</p>
    </v-col>
  </v-row>
</template>
<style type="text/css">
.w500 {
  width: 500px;
  margin-left: 10px;
}
</style>
