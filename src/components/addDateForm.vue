<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, ref } from "vue";
import TextFieldView from "@/components/TextFieldView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import { monthArray, dayArray, timeArray, minuteArray } from "@/plugins/const";
import { zeroPadding, zeroZapress } from "@/plugins/validate";
interface Props {
  title?: string;
  color?: string;
  rules?: string;
  tooltipMessage?: string;
  tooltipflag?: boolean;
  defaultyear?: number;
  defaultmonth?: number | string;
  defaultday?: number | string | any;
  defaultstarttime?: number | string;
  defaultstartminute?: number | string;
  defaultendtime?: number | string;
  defaultendminute?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "bg-primary",
  defaultstarttime: "00",
  defaultstartminute: "00",
  defaultendtime: "23",
  defaultendminute: "59",
});

const emit = defineEmits<{
  (e: "onUpdate", value: boolean, type: string): void;
  (e: "onClick", value: boolean, type: string): void;
  (e: "onBlur", value: string, name: string): void;
  (e: "onDateTime", value: string): void;
  (e: "onDateEndTime", value: string): void;
}>();

const today = new Date();
const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1
);
const startdate = ref({
  startyear: yesterday.getFullYear().toString(),
  startmonth: zeroPadding(yesterday.getMonth() + 1),
  startday: zeroPadding(yesterday.getDate()),
  starttime: "00",
  startminute: "00",
});
const enddate = ref({
  endyear: today.getFullYear().toString(),
  endmonth: zeroPadding(today.getMonth() + 1),
  endday: zeroPadding(today.getDate()),
  endtime: "23",
  endminute: "59",
});
const requestDateTime = () => {
  const datetimes =
    startdate.value.startyear +
    "-" +
    startdate.value.startmonth +
    "-" +
    startdate.value.startday +
    " " +
    startdate.value.starttime +
    ":" +
    startdate.value.startminute;
  emit("onDateTime", datetimes);
};
const requestDateEndTime = () => {
  const datetimes =
    enddate.value.endyear +
    "-" +
    enddate.value.endmonth +
    "-" +
    enddate.value.endday +
    " " +
    enddate.value.endtime +
    ":" +
    enddate.value.endminute;
  emit("onDateEndTime", datetimes);
};
</script>
<template>
  <v-row no-gutters>
    <v-col
      sm="3"
      class="border-sm d-flex align-center pl-2"
      :class="props.color"
    >
      {{ props.title }}
      <v-tooltip :text="props.tooltipMessage" v-if="props.tooltipflag">
        <template v-slot:activator="{ props }">
          <v-icon v-bind="props">mdi-information</v-icon>
        </template>
      </v-tooltip>
    </v-col>
    <v-col sm="9" class="pa-1 border-sm">
      <v-row no-gutters>
        <v-col cols="10">
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
                  : props.defaultday - 1
              "
              @onChange="
                (e) => (
                  (startdate.startday = zeroPadding(e)), requestDateTime()
                )
              "
            /><span class="mt-3 text-caption">日</span>
            <SelectFieldView
              :items="timeArray"
              class="w-25"
              :text="
                startdate.starttime
                  ? zeroZapress(startdate.starttime)
                  : props.defaultstarttime
              "
              @onChange="
                (e) => (
                  (startdate.starttime = zeroPadding(e)), requestDateTime()
                )
              "
            /><span class="mt-3 text-caption">時</span>
            <SelectFieldView
              :items="minuteArray"
              class="w-25"
              :text="
                startdate.startminute
                  ? zeroZapress(startdate.startminute)
                  : props.defaultstartminute
              "
              @onChange="
                (e) => (
                  (startdate.startminute = zeroPadding(e)), requestDateTime()
                )
              "
            /><span class="mt-3 text-caption">分</span>
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="10">
          <p class="text-caption">【終了日付】</p>

          <div class="d-flex">
            <TextFieldView
              class="w-25"
              :value="props.defaultyear"
              :maxlength="4"
              @onKeyup="(e) => ((enddate.endyear = e), requestDateEndTime())"
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
                  (enddate.endmonth = zeroPadding(e)), requestDateEndTime()
                )
              "
            /><span class="mt-3 text-caption">月</span>
            <SelectFieldView
              :items="dayArray"
              :text="
                enddate.endday ? zeroZapress(enddate.endday) : props.defaultday
              "
              class="w-25"
              @onChange="
                (e) => ((enddate.endday = zeroPadding(e)), requestDateEndTime())
              "
            /><span class="mt-3 text-caption">日</span>
            <SelectFieldView
              :items="timeArray"
              class="w-25"
              :text="
                enddate.endtime
                  ? zeroZapress(enddate.endtime)
                  : props.defaultendtime
              "
              @onChange="
                (e) => (
                  (enddate.endtime = zeroPadding(e)), requestDateEndTime()
                )
              "
            /><span class="mt-3 text-caption">時</span>
            <SelectFieldView
              :items="minuteArray"
              class="w-25"
              :text="
                enddate.endminute
                  ? zeroZapress(enddate.endminute)
                  : props.defaultendminute
              "
              @onChange="
                (e) => (
                  (enddate.endminute = zeroPadding(e)), requestDateEndTime()
                )
              "
            /><span class="mt-3 text-caption">分</span>
          </div>
          <span class="text-red text-caption">{{ props.rules }}</span>
        </v-col>
      </v-row>

      <p class="text-caption mt-2">
        ※検査実施期間 終了日時を設定する際の注意点<br />
        検査実施期間は時分も設定可能です。<br />
        設定されている時間を過ぎますとアクセスできなくなります。<br />
        2024年10月10日
        23時59分と設定すると、2024年10月11日0時0分になるとアクセスできなくなります。
      </p>
    </v-col>
  </v-row>
</template>
