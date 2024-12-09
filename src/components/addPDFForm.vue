<script setup lang="ts">
//import { defineProps, withDefaults, defineEmits, ref } from "vue";
import { defineProps, defineEmits, ref } from "vue";
import TextFieldView from "./TextFieldView.vue";
import ComponentSwitch from "@/components/SwitchView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import { monthArray, dayArray } from "@/plugins/const";
import { zeroPadding, numberValue, zeroZapress } from "@/plugins/validate";
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

const today = new Date();
const startdate = ref({
  startyear: today.getFullYear().toString(),
  startmonth: zeroPadding(today.getMonth() + 1),
  startday: zeroPadding(today.getDate()),
});
const enddate = ref({
  endyear: today.getFullYear().toString(),
  endmonth: zeroPadding(today.getMonth() + 1),
  endday: zeroPadding(today.getDate()),
});
const requestDateTime = () => {
  let year = startdate.value.startyear
    ? startdate.value.startyear
    : today.getFullYear();
  const datetimes =
    year + "-" + startdate.value.startmonth + "-" + startdate.value.startday;
  emit("onDateTime", datetimes);
};
const requestDateTimeEND = () => {
  const datetimes =
    enddate.value.endyear +
    "-" +
    enddate.value.endmonth +
    "-" +
    enddate.value.endday;
  emit("onDateEndTime", datetimes);
};
const pdfCount = ref(0);
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
          :title="props.title"
          :model="props.value"
          @onUpdate="(e, type) => emit('onUpdate', e, type ?? '')"
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
                :value="props.defaultyear"
                :maxlength="4"
                @onKeyup="(e) => ((startdate.startyear = e), requestDateTime())"
              />
              <span class="mt-3 text-caption">年</span>
              <SelectFieldView
                :items="monthArray"
                :text="
                  startdate.startmonth
                    ? zeroZapress(startdate.startmonth)
                    : props.defaultmonth
                "
                class="w-25"
                @onChange="
                  (e) => (
                    (startdate.startmonth = zeroPadding(e)), requestDateTime()
                  )
                "
              /><span class="mt-3 text-caption">月</span>
              <SelectFieldView
                :items="dayArray"
                class="w-25"
                :text="
                  startdate.startday
                    ? zeroZapress(startdate.startday)
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
                :value="props.defaultyear"
                :maxlength="4"
                @onKeyup="(e) => ((enddate.endyear = e), requestDateTimeEND())"
              />
              <span class="mt-3 text-caption">年</span>
              <SelectFieldView
                :items="monthArray"
                :text="
                  enddate.endmonth
                    ? zeroZapress(enddate.endmonth)
                    : props.defaultmonth
                "
                class="w-25"
                @onChange="
                  (e) => (
                    (enddate.endmonth = zeroPadding(e)), requestDateTimeEND()
                  )
                "
              /><span class="mt-3 text-caption">月</span>
              <SelectFieldView
                :items="dayArray"
                class="w-25"
                :text="
                  enddate.endday
                    ? zeroZapress(enddate.endday)
                    : props.defaultday
                "
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
          :title="props.title"
          :model="props.valuePDF"
          @onUpdate="(e) => emit('PDFCountFlag', e)"
        ></ComponentSwitch>
        <p>PDF出力制限数</p>
        <TextFieldView
          class="w-50"
          type="number"
          :value="pdfCount.toString()"
          :maxlength="4"
          :hideDetails="`auto`"
          :rules="numberValue(pdfCount, 'PDF出力制限')"
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
