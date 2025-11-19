<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, ref } from "vue";
import TextFieldView from "@/components/TextFieldView.vue";
import SelectFieldView from "@/components/SelectFieldView.vue";
import { monthArray, dayArray, timeArray, minuteArray } from "@/plugins/const";
import { zeroPadding, zeroZapress } from "@/plugins/validate";

type ValidationResult = string | boolean;
type RuleElement =
  | string
  | boolean
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)
  | [string, any, (string | undefined)?];

interface Props {
  title?: string;
  color?: string;
  rules?: string | RuleElement[];
  tooltipMessage?: string;
  tooltipflag?: boolean;
  defaultyear?: number;
  defaultmonth?: number | string;
  defaultday?: number | string | any;
  defaultstarttime?: number | string;
  defaultstartminute?: number | string;
  defaultendtime?: number | string;
  defaultendminute?: number | string;
  startdaytime?: string;
  enddaytime?: string;
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
/*
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
  starttime: "0",
  startminute: "0",
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

const getDate = (type: string) => {
  let tmp = props.startdaytime?.split(" ") as string[];
  let date1 = tmp[0].split("-");
  let date2 = tmp[1].split(":");
  startdate.value.startyear = date1[0];
  startdate.value.startmonth = date1[1];
  startdate.value.startday = date1[2];
  startdate.value.starttime = date2[0];
  startdate.value.startminute = date2[1];
  if (type == "year") return parseInt(date1[0]);
  if (type == "month") return parseInt(date1[1]);
  if (type == "day") return parseInt(date1[2]);
  if (type == "hour") return parseInt(date2[0]);
  if (type == "minute") return parseInt(date2[1]);
};

const getEndDate = (type: string) => {
  let tmp = props.enddaytime?.split(" ") as string[];
  let date1 = tmp[0].split("-");
  let date2 = tmp[1].split(":");
  enddate.value.endyear = date1[0];
  enddate.value.endmonth = date1[1];
  enddate.value.endday = date1[2];
  enddate.value.endtime = date2[0];
  enddate.value.endminute = date2[1];
  if (type == "year") return parseInt(date1[0]);
  if (type == "month") return parseInt(date1[1]);
  if (type == "day") return parseInt(date1[2]);
  if (type == "hour") return parseInt(date2[0]);
  if (type == "minute") return parseInt(date2[1]);
};
*/
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
            <TextFieldView class="w-25" :maxlength="4" />
            <span class="mt-3 text-caption">年</span>
            <SelectFieldView :items="monthArray" class="w-25" /><span
              class="mt-3 text-caption"
              >月</span
            >
            <SelectFieldView :items="dayArray" class="w-25" /><span
              class="mt-3 text-caption"
              >日</span
            >
            <SelectFieldView :items="timeArray" class="w-25" /><span
              class="mt-3 text-caption"
              >時</span
            >
            <SelectFieldView :items="minuteArray" class="w-25" /><span
              class="mt-3 text-caption"
              >分</span
            >
          </div>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="10">
          <p class="text-caption">【終了日付】</p>

          <div class="d-flex">
            <TextFieldView class="w-25" :maxlength="4" />
            <span class="mt-3 text-caption">年</span>
            <SelectFieldView :items="monthArray" class="w-25" /><span
              class="mt-3 text-caption"
              >月</span
            >
            <SelectFieldView :items="dayArray" class="w-25" /><span
              class="mt-3 text-caption"
              >日</span
            >
            <SelectFieldView :items="timeArray" class="w-25" /><span
              class="mt-3 text-caption"
              >時</span
            >
            <SelectFieldView :items="minuteArray" class="w-25" /><span
              class="mt-3 text-caption"
              >分</span
            >
          </div>
          <span class="text-red text-caption">{{ props.rules }}</span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
